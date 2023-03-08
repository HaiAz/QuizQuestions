// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: "quizquestion-394b2.firebaseapp.com",
    databaseURL: "https://quizquestion-394b2-default-rtdb.firebaseio.com",
    projectId: "quizquestion-394b2",
    storageBucket: "quizquestion-394b2.appspot.com",
    messagingSenderId: "867989853388",
    appId: "1:867989853388:web:252fc519e4881b04a49e69",
    measurementId: "G-S6SN52MXD8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);
const db = getFirestore(app);
const auth = getAuth(app);
export { analytics, database, auth, db };
export default app;
