// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "food--fly.firebaseapp.com",
  projectId: "food--fly",
  storageBucket: "food--fly.firebasestorage.app",
  messagingSenderId: "586238845677",
  appId: "1:586238845677:web:9102e5b40c969efb69e2e4",
  measurementId: "G-M04KCN9GF3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export {app,auth}