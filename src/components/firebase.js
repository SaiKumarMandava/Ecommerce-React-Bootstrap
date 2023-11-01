// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAECcUtkyXzl3cdeIyIXqIKfR-WN7IjzHk",
  authDomain: "airvoges-7afcd.firebaseapp.com",
  projectId: "airvoges-7afcd",
  storageBucket: "airvoges-7afcd.appspot.com",
  messagingSenderId: "1039838081726",
  appId: "1:1039838081726:web:46b1fddbb09f6da31de4ef",
  measurementId: "G-DT1ZFTW8FY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth= getAuth(app)