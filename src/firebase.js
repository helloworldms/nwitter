import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_D,
  projectId: "nwitter-79b5a",
  storageBucket: "nwitter-79b5a.appspot.com",
  messagingSenderId: "73565000207",
  appId: "1:73565000207:web:37c5173834a4013195497a",
  measurementId: "G-21W671LJRJ",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const firebaseInstance = firebase;
export const authService = firebase.auth();
export const dbService = firebase.firestore();
export const storageService = firebase.storage();
export default firebaseApp;
