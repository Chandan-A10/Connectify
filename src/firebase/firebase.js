// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { collection, getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBSDPQL7b_swVfdUXo4u2pbG90s7MLy8H0",
  authDomain: "connectify-5c1a4.firebaseapp.com",
  projectId: "connectify-5c1a4",
  storageBucket: "connectify-5c1a4.appspot.com",
  messagingSenderId: "419970537971",
  appId: "1:419970537971:web:0e4e6d39e465bd2766da86"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db=getFirestore(app)

export const auth = getAuth(app)
export const storage=getStorage(app)
export const UserCollection=collection(db,'Users')
export const PostsCollection=collection(db,'posts')
export const NotificationCollection=collection(db,'Notifications')