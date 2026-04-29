import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCM0hQuTsJZDEW3FmoEC5FsqUNTOMH57ws",
  authDomain: "competition01-507c6.firebaseapp.com",
  projectId: "competition01-507c6",
  storageBucket: "competition01-507c6.firebasestorage.app",
  messagingSenderId: "907579028768",
  appId: "1:907579028768:web:e4a1b831d5806817891345",
  measurementId: "G-W67QGMJB92"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
