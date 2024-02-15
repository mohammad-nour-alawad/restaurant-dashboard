import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAj5A8RaAjpR7C-6VG7WDAoSSMvMhikcAY",
  authDomain: "restaurant-dashboard-52b07.firebaseapp.com",
  projectId: "restaurant-dashboard-52b07",
  storageBucket: "restaurant-dashboard-52b07.appspot.com",
  messagingSenderId: "43262561145",
  appId: "1:43262561145:web:19132570c9cdc3e6653da8"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;