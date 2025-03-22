import {initializeApp} from "firebase/app"
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDmQh8jQhuRa7pvQCI2LNJxOZ5-HT4mvfM",
    authDomain: "ecommerce-coder-46603.firebaseapp.com",
    projectId: "ecommerce-coder-46603",
    storageBucket: "ecommerce-coder-46603.firebasestorage.app",
    messagingSenderId: "1097716554762",
    appId: "1:1097716554762:web:10abc92aeba023b26a93f3"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);