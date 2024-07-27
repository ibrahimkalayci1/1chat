// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDj3LXnk1RvTDSbBuaqXlpvdKa45AZ5EoE",
  authDomain: "haftaici-c20bd.firebaseapp.com",
  projectId: "haftaici-c20bd",
  storageBucket: "haftaici-c20bd.appspot.com",
  messagingSenderId: "38073721190",
  appId: "1:38073721190:web:359f9f6c4d53d08556a8a7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//firebase auth referansını al
export const auth = getAuth(app);

//google sağlayıcısını kur
export const provider = new GoogleAuthProvider()
// firestore veritabanının referansını al
export const db = getFirestore(app)