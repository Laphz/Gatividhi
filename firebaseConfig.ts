// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCiWVJlKegccmUy3U-wa9OQMhKzj7uKhAM",
  authDomain: "gatividhi-5884e.firebaseapp.com",
  projectId: "gatividhi-5884e",
  storageBucket: "gatividhi-5884e.firebasestorage.app",
  messagingSenderId: "628523622956",
  appId: "1:628523622956:web:46d74fc19cf665f7076789",
  measurementId: "G-YJHEF89FJE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
