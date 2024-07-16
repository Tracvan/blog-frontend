// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCrt6PG4zbI1dZ4bQKSKqC5WpoNKqY69hQ",
    authDomain: "frontend-blog-d857b.firebaseapp.com",
    projectId: "frontend-blog-d857b",
    storageBucket: "frontend-blog-d857b.appspot.com",
    messagingSenderId: "494915936546",
    appId: "1:494915936546:web:abc3189e0dabe17b83457b",
    measurementId: "G-2K5R8MWD37"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);