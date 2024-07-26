// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // Add Auth
import { collection, getFirestore } from "firebase/firestore"; // Add Firestore
import { getDatabase } from "firebase/database"; // Add Realtime Database
import { getStorage } from "firebase/storage"; // Add Storage
import { query, where, getDocs } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0ST4WFnzRnO_EbKOCrUwz_IWZVdX14Q4",
  authDomain: "weslykoothupile-a008f.firebaseapp.com",
  databaseURL: "https://weslykoothupile-a008f-default-rtdb.firebaseio.com",
  projectId: "weslykoothupile-a008f",
  storageBucket: "weslykoothupile-a008f.appspot.com",
  messagingSenderId: "852322937415",
  appId: "1:852322937415:web:9e2c35354cd83909f15f62",
  measurementId: "G-HBL1E7QMF2"
};

// Initialize Firebase
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);

// Initialize Firebase services
const auth = getAuth(firebaseApp); // Initialize Auth
const firestore = getFirestore(firebaseApp); // Initialize Firestore
const database = getDatabase(firebaseApp); // Initialize Realtime Database
const storage = getStorage(firebaseApp); // Initialize Storage

// Getting from firebase
async function getDetails(firestore, email) {
    const usersCollection = collection(firestore, 'users');
    const q = query(usersCollection, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        return userData; // Return user data
    } else {
        return null; // User not found
    }
}


export { auth, firestore, database, storage, firebaseApp };