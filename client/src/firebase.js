// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "my-cocoa-project1.firebaseapp.com",
  projectId: "my-cocoa-project1",
  storageBucket: "my-cocoa-project1.appspot.com",
  messagingSenderId: "903286857412",
  appId: "1:903286857412:web:65a3eb8c4550ba2322f391"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);