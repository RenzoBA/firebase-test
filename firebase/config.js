import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "fir-test-e4c19.firebaseapp.com",
  databaseURL: "https://fir-test-e4c19-default-rtdb.firebaseio.com",
  projectId: "fir-test-e4c19",
  storageBucket: "fir-test-e4c19.appspot.com",
  messagingSenderId: "337116310028",
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: "G-SCPYBBP14R",
};

const app = initializeApp(firebaseConfig);

export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const messaging = getMessaging(app);
