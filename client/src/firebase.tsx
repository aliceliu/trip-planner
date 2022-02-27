import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "tripplanner-342406.firebaseapp.com",
  projectId: "tripplanner-342406",
  storageBucket: "tripplanner-342406.appspot.com",
  messagingSenderId: "507705184673",
  appId: "1:507705184673:web:03f5c9030abde04c19fbe0",
  measurementId: "G-66Y8281RS1"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const db = getFirestore();
export type User = firebase.User;
