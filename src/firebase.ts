// src/firebase.js - CONFIGURAÇÃO LIMPA
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBZqfKbDO4EP8ua3Sv1gOhNgY31gZPmHwU",
  authDomain: "masterpllays.firebaseapp.com",
  projectId: "masterpllays",
  storageBucket: "masterpllays.firebasestorage.app",
  messagingSenderId: "554976769966",
  appId: "1:554976769966:web:4fc12441ac7ea490757a3f",
  measurementId: "G-6MGFHZ7N76"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();