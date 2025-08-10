import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCOPOPxsVrGTGcsSLWMTcS-UILbR_pifD0",
  authDomain: "myezz-6e2ca.firebaseapp.com",
  projectId: "myezz-6e2ca",
  storageBucket: "myezz-6e2ca.appspot.com",
  messagingSenderId: "222935713620",
  appId: "1:222935713620:web:d1b900f87cde4829b6eac1",
  measurementId: "G-P50Z42X8K3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
