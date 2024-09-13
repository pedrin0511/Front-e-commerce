// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Sua configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDTAGNAIuaQ5xkfgWk4SH2gf1_hwPXedYI",
  authDomain: "loja-ia.firebaseapp.com",
  projectId: "loja-ia",
  storageBucket: "loja-ia.appspot.com",
  messagingSenderId: "999162368059",
  appId: "1:999162368059:web:xxxxxxxxxxxxxx",
  measurementId: "G-XXXXXXXXXX"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Exporta as instâncias dos serviços do Firebase
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
