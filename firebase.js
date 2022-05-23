// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import { getFirestore} from 'firebase/firestore/lite';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAIwADosxO_bWBLICpIRleRgaZJaH7ge0M",
  authDomain: "cs303project-52872.firebaseapp.com",
  projectId: "cs303project-52872",
  storageBucket: "cs303project-52872.appspot.com",
  messagingSenderId: "415996572420",
  appId: "1:415996572420:web:709dbb35cb51da6c759651"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);