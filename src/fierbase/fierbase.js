// firebase.js (or whatever you named your Firebase configuration file)

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyA54xx6hOxIGs9kgQ2Ycwf-s1b71ZWTdC8",

  authDomain: "ben10-8cc74.firebaseapp.com",

  databaseURL: "https://ben10-8cc74-default-rtdb.firebaseio.com",

  projectId: "ben10-8cc74",

  storageBucket: "ben10-8cc74.appspot.com",

  messagingSenderId: "65797307844",

  appId: "1:65797307844:web:40d6fb12ec64626825b891",

  measurementId: "G-T79DZBMWRS"

};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
