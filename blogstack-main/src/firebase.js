// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJO80xcZhAHNgnHoAEtc0xz79dy2rkmoU",
  authDomain: "blogstack-b3be4.firebaseapp.com",
  projectId: "blogstack-b3be4",
  storageBucket: "blogstack-b3be4.appspot.com",
  messagingSenderId: "493914291256",
  appId: "1:493914291256:web:12d6ea1b00ed17159d7acd"
};

// Initialize Firebase
 initializeApp(firebaseConfig);
 export const db  = getFirestore()