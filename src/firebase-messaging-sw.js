importScripts(
  "https://www.gstatic.com/firebasejs/9.1.3/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.1.3/firebase-messaging-compat.js"
);
firebase.initializeApp({
  apiKey: "AIzaSyADljtJJVmWrxoQru7Z0K31BBcoAhC_t2M",
  authDomain: "hacked23-24.firebaseapp.com",
  projectId: "hacked23-24",
  storageBucket: "hacked23-24.appspot.com",
  messagingSenderId: "762917826898",
  appId: "1:762917826898:web:2e61a3302af9834f530a8b",
  measurementId: "G-BCYK66FZ62",
  vapidKey:
    "BKOIvinydaKL00iJbhKrJNOQVuqq6lYM5jC8-1oyiI4OVLdBsB7X82XG_dSkvZmDD0tp-k2owyuE4_TUjaRmKo8",
});
const messaging = firebase.messaging();
messaging.onBackgroundMessage((payload) => {
  console.log("Ricevuto messaggio in background:", payload);

  // Personalizza la notifica visualizzata
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    // Aggiungi altre opzioni come icone, suoni, ecc. se necessario
  };

  // Mostra la notifica all'utente
  self.registration.showNotification(notificationTitle, notificationOptions);
});

const CACHE_NAME = "offline-cache";
const OFFLINE_URL = "./app/offline-page/offline-page.component.html";

self.addEventListener('install', function(event) {
  event.waitUntil(
      caches.open('my-cache-name').then(function(cache) {
          return cache.add(OFFLINE_URL);
      })
  );
});

self.addEventListener("fetch", function (event) {
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(function () {
        return caches.match(OFFLINE_URL);
      })
    );
  } else {
    event.respondWith(
      fetch(event.request).catch(function () {
        return caches.match(event.request);
      })
    );
  }
});

self.addEventListener('push', function(event) {
  if (event.data) {
    const payload = event.data.json();
    console.log('Dati ricevuti:', payload);  // Aggiunto per il debugging
    const title = payload.data.title || 'Notifica del service';
    const options = {
      body: payload.data.body || 'Body del service',
      image: payload.data.image || '',
      icon: payload.data.icon || '',
      badge: payload.data.badge || '',
      actions: JSON.parse(payload.data.actions || '[]'),
    };
    event.waitUntil(
      self.registration.showNotification(title, options)
    );
  }
});

