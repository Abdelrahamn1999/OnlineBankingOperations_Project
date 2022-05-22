// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import { getFirestore} from 'firebase/firestore/lite';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA-me69QFhwy5WfHjK_YnAl26eETwx_vYI",
  authDomain: "cs303database-b6e24.firebaseapp.com",
  projectId: "cs303database-b6e24",
  storageBucket: "cs303database-b6e24.appspot.com",
  messagingSenderId: "425672955997",
  appId: "1:425672955997:web:06a412388d191e9d81d5b4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);