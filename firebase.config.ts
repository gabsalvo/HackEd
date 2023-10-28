// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  deleteUser,
} from 'firebase/auth';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  runTransaction,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyADljtJJVmWrxoQru7Z0K31BBcoAhC_t2M',
  authDomain: 'hacked23-24.firebaseapp.com',
  projectId: 'hacked23-24',
  storageBucket: 'hacked23-24.appspot.com',
  messagingSenderId: '762917826898',
  appId: '1:762917826898:web:2e61a3302af9834f530a8b',
  measurementId: 'G-BCYK66FZ62',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const provider = new GoogleAuthProvider();
const auth = getAuth();
const messaging = getMessaging(app);
const db = getFirestore();

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function loginWithGoogle(callback: () => void) {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log('Logged in user:', user);

    const userRef = doc(db, 'users', user.uid);

    await delay(2500);

    const userSnapshot = await getDoc(userRef);

    if (userSnapshot.get('registrationCompleted') !== true) {
      console.log(userSnapshot.get('registrationCompleted'));
      console.log('Showing the popup...');

      // Incrementa il contatore degli studenti
      const studentCountRef = doc(db, 'metadata', 'student_count');
      await runTransaction(db, async (transaction) => {
        const studentCountSnapshot = await transaction.get(studentCountRef);
        if (!studentCountSnapshot.exists()) {
          throw 'Document does not exist!';
        }

        const newCount = studentCountSnapshot.data()['count'] + 1;
        transaction.update(studentCountRef, { count: newCount });
      });
      callback(); // Mostra il popup per selezionare l'username
    }
  } catch (error) {
    console.error('Error logging in:', error);
  }
}

async function loginWithGoogleDev() {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log('Logged in user:', user);

    const userRef = doc(db, 'users', user.uid);

    await delay(2500);

    const userSnapshot = await getDoc(userRef);

    if (userSnapshot.get('registrationCompleted') !== true) {
      console.log(userSnapshot.get('registrationCompleted'));
      // Incrementa il contatore degli studenti
      const studentCountRef = doc(db, 'metadata', 'student_count');
      await runTransaction(db, async (transaction) => {
        const studentCountSnapshot = await transaction.get(studentCountRef);
        if (!studentCountSnapshot.exists()) {
          throw 'Document does not exist!';
        }

        const newCount = studentCountSnapshot.data()['count'] + 1;
        transaction.update(studentCountRef, { count: newCount });
      });
    }
  } catch (error) {
    console.error('Error logging in:', error);
  }
}

async function logoutFromGoogle() {
  try {
    await signOut(auth);
    console.log('Logged out successfully');
  } catch (error) {
    console.error('Error logging out:', error);
  }
}

async function getNotificationPermission() {
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      getToken(messaging, {
        vapidKey:
          'BKOIvinydaKL00iJbhKrJNOQVuqq6lYM5jC8-1oyiI4OVLdBsB7X82XG_dSkvZmDD0tp-k2owyuE4_TUjaRmKo8',
      }) // Nota: sostituisci con la tua VAPID key
        .then(async (currentToken) => {
          if (currentToken) {
            console.log('User token:', currentToken);

            const user = auth.currentUser;
            if (user) {
              const userRef = doc(db, 'users', user.uid);
              await setDoc(
                userRef,
                { notificationToken: currentToken },
                { merge: true }
              );
            } else {
              console.warn(
                'Utente non autenticato. Non è possibile salvare il token.'
              );
            }
          } else {
            console.log(
              'No registration token available. Request permission to generate one.'
            );
          }
        })
        .catch((err) => {
          console.log('An error occurred while retrieving token. ', err);
        });
    }
  } catch (error) {
    console.error('Errore durante la richiesta del permesso:', error);
  }
}

async function sendNotification() {
  try {
    const user = auth.currentUser;
    if (user) {
      const response = await fetch(
        'https://us-central1-hacked23-24.cloudfunctions.net/sendNotification',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ uid: user.uid }),
        }
      );
      const data = await response.json();
      console.log(data);
    } else {
      console.warn('Utente non autenticato.');
    }
  } catch (error) {
    console.error("Errore durante l'invio della notifica:", error);
  }
}

async function sendNotificationDelayed() {
  try {
    const user = auth.currentUser;
    const delay = 3000; // 10 secondi

    if (user) {
      const response = await fetch(
        'https://us-central1-hacked23-24.cloudfunctions.net/sendNotificationDelayed',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ uid: user.uid, delay: delay }),
        }
      );
      const data = await response.json();
      console.log(data);
      console.log('bg data');
    } else {
      console.warn('Utente non autenticato.');
    }
  } catch (error) {
    console.error("Errore durante l'invio della notifica:", error);
  }
}

async function removeUser() {
  const auth = getAuth();

  if (auth.currentUser) {
    try {
      await deleteUser(auth.currentUser);
      console.log('Utente eliminato con successo da Firebase Auth.');
    } catch (error) {
      console.error(
        "Errore durante l'eliminazione dell'utente da Firebase Auth:",
        error
      );
    }
  } else {
    console.log('Nessun utente autenticato per essere eliminato.');
  }
}

onMessage(messaging, (payload) => {
  console.log('Notifica da onMessage:', payload);

  if (payload.notification) {
    const notificationTitle =
      payload.notification.title || 'Titolo predefinito'; // default in caso sia undefined
    const notificationOptions = {
      body: payload.notification.body || 'Corpo predefinito', // default in caso sia undefined
      // Qui puoi aggiungere altre opzioni come icone, suoni, ecc.
    };

    // Mostra la notifica
    if (Notification.permission === 'granted') {
      new Notification(notificationTitle, notificationOptions);
    } else {
      console.warn('Permesso per le notifiche non concesso.');
    }
  } else {
    console.warn('Notifica senza contenuto.');
  }
});

export { loginWithGoogle };
export { loginWithGoogleDev };
export { logoutFromGoogle };
export { getNotificationPermission };
export { sendNotification };
export { sendNotificationDelayed };
export { removeUser };
export { auth };
export { db };
