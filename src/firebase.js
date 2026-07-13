import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // <-- Add this import

const firebaseConfig = {
  apiKey: "AIzaSyBc9Hs-Oef3hSuuRY1KWiP51E8oVy4yKik",
  authDomain: "tripsheet-9ea74.firebaseapp.com",
  projectId: "tripsheet-9ea74",
  storageBucket: "tripsheet-9ea74.firebasestorage.app",
  messagingSenderId: "610091199059",
  appId: "1:610091199059:web:99bc24ed74e78d899834a6",
  measurementId: "G-TVYK9KF102"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app); // <-- Add this export
