// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBywU4K1m5beWadMR5FfG2hXk0_phxEZCs",
  authDomain: "hdrss-web.firebaseapp.com",
  projectId: "hdrss-web",
  storageBucket: "hdrss-web.appspot.com",
  messagingSenderId: "1000539781845",
  appId: "1:1000539781845:web:be4f0a62ff0801d7e8405c",
  measurementId: "G-HX679MBPB5",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
