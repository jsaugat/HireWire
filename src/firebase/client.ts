// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAXJ1XP1e0Dx5fTagUNUdACAOZNdP3f9HY",
  authDomain: "hirewire-63203.firebaseapp.com",
  projectId: "hirewire-63203",
  storageBucket: "hirewire-63203.firebasestorage.app",
  messagingSenderId: "939837200465",
  appId: "1:939837200465:web:e72e3cca73458af97f4070",
  measurementId: "G-E3SP47M6X8"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);