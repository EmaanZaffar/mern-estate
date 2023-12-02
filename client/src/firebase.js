// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-b8e3f.firebaseapp.com",
  projectId: "mern-estate-b8e3f",
  storageBucket: "mern-estate-b8e3f.appspot.com",
  messagingSenderId: "557055809844",
  appId: "1:557055809844:web:2a858b4e3fcb3435d5ed61"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);