// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { getRandomUsername } from 'randomUsername';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

async function loginWithGoogle() {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log('Logged in user:', user);

    // Ottieni un nome utente casuale dall'API
    const randomUsername = await getRandomUsername();

    // Salva l'email dell'utente e il nome utente casuale nel database
    const userRef = doc(db, 'users', user.uid);
    await setDoc(userRef, {
      email: user.email,
      username: randomUsername
    }, { merge: true });

  } catch (error) {
    console.error('Error logging in:', error);
  }
}

async function getNotificationPermission() {
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      getToken(messaging, { vapidKey: 'BKOIvinydaKL00iJbhKrJNOQVuqq6lYM5jC8-1oyiI4OVLdBsB7X82XG_dSkvZmDD0tp-k2owyuE4_TUjaRmKo8' }) // Nota: sostituisci con la tua VAPID key
        .then(async (currentToken) => {
          if (currentToken) {
            console.log('User token:', currentToken);

            const user = auth.currentUser;
            if (user) {
              const userRef = doc(db, 'users', user.uid);
              await setDoc(userRef, { notificationToken: currentToken }, { merge: true });
            } else {
              console.warn("Utente non autenticato. Non è possibile salvare il token.");
            }
          } else {
            console.log('No registration token available. Request permission to generate one.');
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
      const response = await fetch('http://127.0.0.1:5001/hacked23-24/us-central1/sendNotification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ uid: user.uid })
      });
      const data = await response.json();
      console.log(data);
    } else {
      console.warn("Utente non autenticato.");
    }
  } catch (error) {
    console.error('Errore durante l\'invio della notifica:', error);
  }
}


onMessage(messaging, (payload) => {
  console.log('Notifica da onMessage:', payload);

  if (payload.notification) {
    const notificationTitle = payload.notification.title || 'Titolo predefinito'; // default in caso sia undefined
    const notificationOptions = {
      body: payload.notification.body || 'Corpo predefinito', // default in caso sia undefined
      // Qui puoi aggiungere altre opzioni come icone, suoni, ecc.
    };

    // Mostra la notifica
    if (Notification.permission === "granted") {
      new Notification(notificationTitle, notificationOptions);
    } else {
      console.warn("Permesso per le notifiche non concesso.");
    }
  } else {
    console.warn("Notifica senza contenuto.");
  }
});

export { loginWithGoogle };
export { getNotificationPermission };
export { sendNotification };
export { auth };
