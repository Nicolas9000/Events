// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBNxlAekHOoUpjfVa8jl_V32_Ym5FWTYp0",
  authDomain: "myevents-b9f87.firebaseapp.com",
  projectId: "myevents-b9f87",
  storageBucket: "myevents-b9f87.appspot.com",
  messagingSenderId: "734148598966",
  appId: "1:734148598966:web:b667409d528fa052c49a17",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
