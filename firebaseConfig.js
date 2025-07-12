// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCYxCImPhVlaYoZd51_NT3e_4fnP9cgltw",
  authDomain: "mediscan-b73c9.firebaseapp.com",
  projectId: "mediscan-b73c9",
  storageBucket: "mediscan-b73c9.appspot.com", // ✅ Corrected
  messagingSenderId: "745535464215",
  appId: "1:745535464215:web:00122f1bf313bea6b5cd52"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// ✅ Initialize Auth with AsyncStorage persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Initialize Firestore
const db = getFirestore(app);

// Export for use in the rest of the app
export { auth, db };
