// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyADljtJJVmWrxoQru7Z0K31BBcoAhC_t2M",
  authDomain: "hacked23-24.firebaseapp.com",
  projectId: "hacked23-24",
  storageBucket: "hacked23-24.appspot.com",
  messagingSenderId: "762917826898",
  appId: "1:762917826898:web:2e61a3302af9834f530a8b",
  measurementId: "G-BCYK66FZ62"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const provider = new GoogleAuthProvider();
const auth = getAuth();

async function loginWithGoogle() {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Logged in user:", user);
      // Puoi anche accedere a altre informazioni come token ecc.
      // const token = result.credential.accessToken;
    } catch (error) {
      console.error("Error logging in:", error);
    }
  }
  
  export { loginWithGoogle };