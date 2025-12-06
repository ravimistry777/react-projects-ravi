import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCxz4KqPYDadn7IkeILMoP4HB4LvHfHrOA",
  authDomain: "myntra-firebase-ravi.firebaseapp.com",
  projectId: "myntra-firebase-ravi",
  storageBucket: "myntra-firebase-ravi.firebasestorage.app",
  messagingSenderId: "1020060071540",
  appId: "1:1020060071540:web:882a49f42c6c414f308321"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);