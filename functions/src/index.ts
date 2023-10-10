import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as cors from "cors";

admin.initializeApp();

const corsHandler = cors({origin: true});

export const sendNotification = functions.https.onRequest(async (req, res) => {
  corsHandler(req, res, async () => {
  // Controlla il metodo della richiesta
    if (req.method !== "POST") {
      res.status(400).json({message: "Richiesta non supportata!"});
      return;
    }

    const uid = req.body.uid;

    if (!uid) {
      res.status(400).json({message: "UID mancante!"});
      return;
    }

    // Ottieni il token di notifica dell'utente dal database
    const userDoc = await admin.firestore().doc(`users/${uid}`).get();
    const userToken = userDoc.data()?.notificationToken;

    if (!userToken) {
      // eslint-disable-next-line max-len
      res.status(500).json({message: "Token di notifica non trovato per l'utente!"});
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
      res.status(200).json({message: "Notifica inviata con successo!"});
    } catch (error) {
      console.error("Errore durante l'invio della notifica:", error);
      res.status(500).json({message: "Errore durante l'invio della notifica."});
    }
  });
});
