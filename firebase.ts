import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAuwT7PJIrpKjVg2zjy8LpRzx2jKEPwqmE",
  authDomain: "nft-generator-156ed.firebaseapp.com",
  projectId: "nft-generator-156ed",
  storageBucket: "nft-generator-156ed.appspot.com",
  messagingSenderId: "352867970644",
  appId: "1:352867970644:web:8f2acf5f7bdbc0b93047c1",
};
const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();
const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, storage, auth };
