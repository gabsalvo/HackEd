import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

export const sendNotification = functions.https.onRequest(async (req, res) => {
  // Controlla il metodo della richiesta
  if (req.method !== "POST") {
    res.status(400).send("Richiesta non supportata!");
    return;
  }

  const uid = req.body.uid;

  if (!uid) {
    res.status(400).send("UID mancante!");
    return;
  }

  // Ottieni il token di notifica dell'utente dal database
  const userDoc = await admin.firestore().doc(`users/${uid}`).get();
  const userToken = userDoc.data()?.notificationToken;

  if (!userToken) {
    res.status(500).send("Token di notifica non trovato per l'utente!");
    return;
  }

  // Configura la notifica
  const payload = {
    notification: {
      title: "Notifica di prova",
      body: "Questa è una notifica di prova!",
    },
    token: userToken,
  };

  try {
    // Invia la notifica
    await admin.messaging().send(payload);
    res.status(200).send("Notifica inviata con successo!");
  } catch (error) {
    console.error("Errore durante l'invio della notifica:", error);
    res.status(500).send("Errore durante l'invio della notifica.");
  }
});
