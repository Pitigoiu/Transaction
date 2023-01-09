import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCMv99OA8kdgaHQDeXgG8gJpe3C4kTszwo",
  authDomain: "projectmoney-60d49.firebaseapp.com",
  projectId: "projectmoney-60d49",
  storageBucket: "projectmoney-60d49.appspot.com",
  messagingSenderId: "594484595292",
  appId: "1:594484595292:web:a28159eb1f10c90e9f7499"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//init service
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()
//timestamp
const timestamp=firebase.firestore.Timestamp//return a function that creates a timestam property

export {projectFirestore,projectAuth,timestamp} 