import firebase from 'firebase/app'
import 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyAW9X2P4X49DXYn28cDZEWx0EUkAAuYCGg",
  authDomain: "bar-base.firebaseapp.com",
  projectId: "bar-base",
  storageBucket: "bar-base.appspot.com",
  messagingSenderId: "432446531329",
  appId: "1:432446531329:web:cb77fde3fbfba62ae1dd00"
};

const db = firebase.initializeApp( firebaseConfig ).firestore();

export {db}