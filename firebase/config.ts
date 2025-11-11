// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCewnUmA3ciE5G34aaV_flPUR-pDg0vrvA",
  authDomain: "belajar-reactnativefirebase.firebaseapp.com",
  projectId: "belajar-reactnativefirebase",
  storageBucket: "belajar-reactnativefirebase.firebasestorage.app",
  messagingSenderId: "380269267187",
  appId: "1:380269267187:web:4dfed3e75cded2c9cc4f86"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP)