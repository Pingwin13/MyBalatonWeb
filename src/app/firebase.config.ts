import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAeeFu3wJvgCBu_ZQcdipBTYoWVIPdNG7E",
  authDomain: "mybalatonangular.firebaseapp.com",
  projectId: "mybalatonangular",
  storageBucket: "mybalatonangular.firebasestorage.app",
  messagingSenderId: "555567258934",
  appId: "1:555567258934:web:cb87358996f690cc1b2797"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
