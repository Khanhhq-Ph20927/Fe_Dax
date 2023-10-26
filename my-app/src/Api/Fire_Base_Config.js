import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyArX0hRYQrgU0hEr24Nlj2coEIXTrpUFWc",
    authDomain: "my-app-7201f.firebaseapp.com",
    projectId: "my-app-7201f",
    storageBucket: "my-app-7201f.appspot.com",
    messagingSenderId: "81003650809",
    appId: "1:81003650809:web:ed8ae044af240baa0f8c28"
};

const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
