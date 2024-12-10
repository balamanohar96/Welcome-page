// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAcrpyN2Ysbe0RYwvbSwCZEEF7QbcY-HZk",
  authDomain: "welcome-page-d8aa1.firebaseapp.com",
  projectId: "welcome-page-d8aa1",
  storageBucket: "welcome-page-d8aa1.firebasestorage.app",
  messagingSenderId: "630396708867",
  appId: "1:630396708867:web:7fa16039a4d2ea1c824636",
  measurementId: "G-DG430E7QE1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);