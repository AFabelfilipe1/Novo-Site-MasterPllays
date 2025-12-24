// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZqfKbDO4EP8ua3Sv1gOhNgY31gZPmHwU",
  authDomain: "masterpllays.firebaseapp.com",
  projectId: "masterpllays",
  storageBucket: "masterpllays.firebasestorage.app",
  messagingSenderId: "554976769966",
  appId: "1:554976769966:web:4fc12441ac7ea490757a3f",
  measurementId: "G-6MGFHZ7N76"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()