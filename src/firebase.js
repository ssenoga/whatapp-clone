import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCuN9RrLQybBbkGp-1bLC0Ffk6zSxdFbrw",
  authDomain: "whatsapp-clone-ad9ee.firebaseapp.com",
  databaseURL: "https://whatsapp-clone-ad9ee.firebaseio.com",
  projectId: "whatsapp-clone-ad9ee",
  storageBucket: "whatsapp-clone-ad9ee.appspot.com",
  messagingSenderId: "842668819135",
  appId: "1:842668819135:web:1edcc6bd459e4e1d297c0a",
  measurementId: "G-5FTVG37CVD"
});

const db = firebaseApp.db();

export default db;
