// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDqltA797F5dnduQ3p-Kvbm6U5PN6gJaeE",
  authDomain: "sparta-react-basic-452fb.firebaseapp.com",
  projectId: "sparta-react-basic-452fb",
  storageBucket: "sparta-react-basic-452fb.appspot.com",
  messagingSenderId: "220756082624",
  appId: "1:220756082624:web:3d0ae132f9c7bda0591225",
  measurementId: "G-Q1PY347808",
};

initializeApp(firebaseConfig);
// Initialize Firebase

export const db = getFirestore();
