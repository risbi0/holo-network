import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBTeoqXfB3ysX76pH93bIDVYkvmACJNVgs",
  authDomain: "holo-network.firebaseapp.com",
  projectId: "holo-network",
  storageBucket: "holo-network.appspot.com",
  messagingSenderId: "218649491103",
  appId: "1:218649491103:web:4d127298279b62b5d794aa",
  measurementId: "G-BKMQCLML2N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
