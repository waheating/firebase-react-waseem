// Import the necessary Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; 
import { getStorage } from "firebase/storage";     


const firebaseConfig = {
  apiKey: "AIzaSyCA5WqVR3P9oF5g73XSZpbqvPT-CsfRNkI",
  authDomain: "waheating-65a9a.firebaseapp.com",
  projectId: "waheating-65a9a",
  storageBucket: "waheating-65a9a.firebasestorage.app",     
  messagingSenderId: "829861588222",
  appId: "1:829861588222:web:d521a83f7abbd8765c09af",
  measurementId: "G-4XKLG9E01B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app); 

// Export instances
export { db, storage };
