// firebase.js (or whatever you named your Firebase configuration file)

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDREUQu13iB9jDIXPhXHf_pAWQ4B-RiWbo",
  authDomain: "shikshak-2c92a.firebaseapp.com",
  projectId: "shikshak-2c92a",
  storageBucket: "shikshak-2c92a.appspot.com",
  messagingSenderId: "829102586445",
  appId: "1:829102586445:web:5d1af34169bff6f8f37a04",
  measurementId: "G-8PX896J5GR"

};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
