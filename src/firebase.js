// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBOUzch7dV_OZqIiYYHLzIg_fuY02cJFq4",
  authDomain: "exe201-6ce86.firebaseapp.com",
  projectId: "exe201-6ce86",
  storageBucket: "exe201-6ce86.appspot.com",
  messagingSenderId: "849880213290",
  appId: "1:849880213290:web:fb0c8eea9e05d720da2053",
  measurementId: "G-YT33YC6267"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
