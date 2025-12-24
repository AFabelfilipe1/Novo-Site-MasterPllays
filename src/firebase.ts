// src/firebase.js - CONFIGURAÇÃO DEFINITIVA
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// ⚠️ SUBSTITUA COM AS CONFIGURAÇÕES REAIS DO SEU APP WEB
// ⚠️ Obtenha essas configurações do Firebase Console → Seu app web
const firebaseConfig = {
  apiKey: "AIzaSyBZqfKbDO4EP8ua3Sv1gOhNgY31gZPmHwU", // Mantenha esta se for a correta
  authDomain: "masterpllays.firebaseapp.com", // COM DOIS L
  projectId: "masterpllays", // COM DOIS L
  storageBucket: "masterpllays.firebasestorage.app", // COM DOIS L
  messagingSenderId: "554976769966",
  appId: "1:554976769966:web:4fc12441ac7ea490757a3f",
  measurementId: "G-6MGFHZ7N76"
};

console.log('🚀 Inicializando Firebase para projeto:', firebaseConfig.projectId);

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Configurações do provedor Google
googleProvider.setCustomParameters({
  prompt: 'select_account'
});
googleProvider.setCustomParameters({
  prompt: 'select_account'
});