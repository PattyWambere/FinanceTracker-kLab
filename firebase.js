import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

// Single place to configure Firebase across the app
const firebaseConfig = {
  apiKey: "AIzaSyANGyWZodHh4aP52crNumLN292DdEDcric",
  authDomain: "finance-tracker-app-bfe72.firebaseapp.com",
  projectId: "finance-tracker-app-bfe72",
  storageBucket: "finance-tracker-app-bfe72.firebasestorage.app",
  messagingSenderId: "94088828096",
  appId: "1:94088828096:web:49aa527e5406ca87374925",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

