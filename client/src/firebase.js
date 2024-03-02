// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDOcQgkM6JhzeIVMa5AslsqN5935Ir2KAA",
  authDomain: "mern-estate-1a3c0.firebaseapp.com",
  projectId: "mern-estate-1a3c0",
  storageBucket: "mern-estate-1a3c0.appspot.com",
  messagingSenderId: "522312053780",
  appId: "1:522312053780:web:a7c88623f1695cca9ba301"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);