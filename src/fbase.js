// Import the functions you need from the SDKs you need
// https://stackoverflow.com/questions/68929593/vue-2-export-default-imported-as-firebase-was-not-found-in-firebase-app
// Before: version 8 (Old)
// import firebase from 'firebase/app';
// import 'firebase/auth';
// import 'firebase/firestore';
// // v9 compat packages are API compatible with v8 code
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// process.env를 통해 빌드시의 env파일을 참조함.
// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_API_KEY,
//   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_APP_ID,
// };
const firebaseConfig = {
  apiKey: "AIzaSyDR0DtozADow2gfzJVYjXGzNQdm6pzROAw",
  authDomain: "nwitter-d888a.firebaseapp.com",
  projectId: "nwitter-d888a",
  storageBucket: "nwitter-d888a.appspot.com",
  messagingSenderId: "140069265518",
  appId: "1:140069265518:web:03ccc25268f950209a467f",
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export default firebase.initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);

export const firebaseInstance = firebase;
export const authService = firebase.auth();
export const dbService = firebase.firestore();
export const storageService = firebase.storage();
// 파이어베이스 콘솔페이지 - 스토리지 - 규칙 - 규칙수정에서
// allow read, write: if request.auth != null; 해당 문구 추가할 것
// https://www.inflearn.com/chats/416458
// https://firebase.google.com/docs/rules/basics?hl=ko

export default authService;
