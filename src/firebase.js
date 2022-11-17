// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCsfWTo-yeIpAn14G5ggYzFgw54JRGBm1w",
  authDomain: "hellobuildtest-6b24d.firebaseapp.com",
  projectId: "hellobuildtest-6b24d",
  storageBucket: "hellobuildtest-6b24d.appspot.com",
  messagingSenderId: "408364133011",
  appId: "1:408364133011:web:57cdb7f9720d3e0903bb66",
  measurementId: "G-9491TSZ395",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
