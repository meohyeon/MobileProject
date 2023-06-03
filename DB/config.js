// firebase 연동 
import firebase from "firebase"

const firebaseConfig = {
  apiKey: "AIzaSyAg1PS2cBygkBkC9RgI-jSnfskJC5zQNRA",
  authDomain: "mobile-d2eb2.firebaseapp.com",
  projectId: "mobile-d2eb2",
  storageBucket: "mobile-d2eb2.appspot.com",
  messagingSenderId: "884380091642",
  appId: "1:884380091642:web:fd86e7b4a81a4d82d4b543",
  measurementId: "G-MDKE7CPC02"
};

//맨처음 연결 시도할떄 
/* const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(app) */

//첫 연결이 성공한 이후 
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();
export {db}