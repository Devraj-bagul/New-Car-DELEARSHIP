// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KE,
  authDomain: "car-marketplace-5f511.firebaseapp.com",
  projectId: "car-marketplace-5f511",
  storageBucket: "car-marketplace-5f511.firebasestorage.app",
  messagingSenderId: "240524744725",
  appId: "1:240524744725:web:8b769d6bfc597be93a561c",
  measurementId: "G-8ERZXG4363"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage=getStorage(app);