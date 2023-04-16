import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase} from "firebase/database";
import { GoogleAuthProvider } from "firebase/auth";
import { FacebookAuthProvider } from "firebase/auth";
import { GithubAuthProvider } from "firebase/auth";





const firebaseConfig = {
  apiKey: "AIzaSyDffVD-l7osLTOR444QbuUM3G1ioczMdqw",
  authDomain: "uretken-mezun.firebaseapp.com",
  projectId: "uretken-mezun",
  storageBucket: "uretken-mezun.appspot.com",
  messagingSenderId: "952814724553",
  appId: "1:952814724553:web:aa9d899a380de49db7b418"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const faceProvider = new FacebookAuthProvider();
export const Gbprovider = new GithubAuthProvider();