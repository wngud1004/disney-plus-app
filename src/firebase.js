// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDVxGeHJjOWVdaf7gMkqQcUoKmNTD3j5Pg",
  authDomain: "disney-plus-app-a9fa0.firebaseapp.com",
  projectId: "disney-plus-app-a9fa0",
  storageBucket: "disney-plus-app-a9fa0.firebasestorage.app",
  messagingSenderId: "210851188991",
  appId: "1:210851188991:web:5ae16a2f4703fadd4abcca",
  measurementId: "G-JMYY35VGLH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, analytics, auth, db };