import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAm1wqSPYSw5Z9lig8uGHRPcL5iC-sjpZo",
  authDomain: "qr-pass-generator.firebaseapp.com",
  projectId: "qr-pass-generator",
  storageBucket: "qr-pass-generator.firebasestorage.app",
  messagingSenderId: "657017060591",
  appId: "1:657017060591:web:439d80b282012e82072f1a",
  measurementId: "G-HDPYS46XZM"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc, getDocs };
