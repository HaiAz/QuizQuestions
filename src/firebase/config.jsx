// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
import { getDatabase } from "firebase/database";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
export const database = getDatabase(app);
