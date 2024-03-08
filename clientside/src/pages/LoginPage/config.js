import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyA0mgrs9sDTtVDyEM0I9C5OttLRP3hdRSE",
  authDomain: "innodev-6b881.firebaseapp.com",
  projectId: "innodev-6b881",
  storageBucket: "innodev-6b881.appspot.com",
  messagingSenderId: "506516626991",
  appId: "1:506516626991:web:16ba3db748fc2a498bf0da",
  measurementId: "G-XXE2JW3YNS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider();
export {auth, provider}
