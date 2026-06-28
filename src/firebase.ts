import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, orderBy, Timestamp } from "firebase/firestore";

// Firebase Config from firebase-applet-config.json
const firebaseConfig = {
  projectId: "earnest-logic-92t1j",
  appId: "1:740698613913:web:22b04d71a8096d7274b008",
  apiKey: "AIzaSyAdHAVt6SEYbEPqi8AlRdoiinfFx3VYNaI",
  authDomain: "earnest-logic-92t1j.firebaseapp.com",
  storageBucket: "earnest-logic-92t1j.firebasestorage.app",
  messagingSenderId: "740698613913"
};

const app = initializeApp(firebaseConfig);

// Initialize Firestore with the custom database ID provided in the config
export const db = getFirestore(app, "ai-studio-virajventures-dd990b68-cd28-4118-88c5-7e6901c85f29");

export { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, orderBy, Timestamp };
