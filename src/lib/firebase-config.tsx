// src/lib/firebase-config.tsx

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCnql6f1yT-maLgnn2dklcbR9A30totyUI",
  authDomain: "herald-77efd.firebaseapp.com",
  projectId: "herald-77efd",
  storageBucket: "herald-77efd.firebasestorage.app",
  messagingSenderId: "540078817255",
  appId: "1:540078817255:web:77f39e72ecdcccb4674742",
  measurementId: "G-DPYK9ZNZT9",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
