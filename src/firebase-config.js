// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth, GoogleAuthProvider} from  'firebase/auth'
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCH-rmLfLpPHFcaP98oOuXPVsW1axGc7eY",
  authDomain: "chevere-8ae0f.firebaseapp.com",
  projectId: "chevere-8ae0f",
  storageBucket: "chevere-8ae0f.appspot.com",
  messagingSenderId: "993909318647",
  appId: "1:993909318647:web:6f0ecec1f37c5c5462c4f2",
  measurementId: "G-HDBGFK9E3L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const storage = getStorage(app);