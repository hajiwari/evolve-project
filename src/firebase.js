// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAyEPgmvIg_RuE_MYvsxwkKn7FfW2X_mhw",
  authDomain: "evolve-elsevier.firebaseapp.com",
  projectId: "evolve-elsevier",
  storageBucket: "evolve-elsevier.firebasestorage.app",
  messagingSenderId: "1014829266511",
  appId: "1:1014829266511:web:8f743c839badd5befb1c3a",
  measurementId: "G-KGYYFZD58G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, analytics, db, auth };
