import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc, getDocs, collection, updateDoc } from 'firebase/firestore'; // Import updateDoc
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBe6ARlpXQwTMxDJifL21ABQ8szM8NbXA0",
  authDomain: "scholarship-d0924.firebaseapp.com",
  projectId: "scholarship-d0924",
  storageBucket: "scholarship-d0924.appspot.com",
  messagingSenderId: "849495504939",
  appId: "1:849495504939:web:d4c1971d4d13716d6ed26e",
  measurementId: "G-GTSPSCL5HY"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage, doc, setDoc, getDoc, getDocs, collection, ref, uploadBytes, getDownloadURL, updateDoc }; // Export updateDoc
