// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "x-next-422906.firebaseapp.com",
  projectId: "x-next-422906",
  storageBucket: "x-next-422906.appspot.com",
  messagingSenderId: "293948297603",
  appId: "1:293948297603:web:3dbb28fdc5195c661aa6b6",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
