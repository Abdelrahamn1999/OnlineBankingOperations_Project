// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import { getFirestore} from 'firebase/firestore/lite';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBOd5IqnBKvJY3OhaTT2eg2GzWV_29IjW8",
  authDomain: "cs303database.firebaseapp.com",
  projectId: "cs303database",
  storageBucket: "cs303database.appspot.com",
  messagingSenderId: "19500782400",
  appId: "1:19500782400:web:3b1dc6b422c76dfa0ce0a5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);