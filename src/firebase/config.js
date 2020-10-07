import * as firebase from "firebase";
import "@firebase/auth";
import "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAn6fRx-ImB2cnk97DzaHPAbMyyMjXtHYY",
  authDomain: "reactnativefirebase-a0db1.firebaseapp.com",
  databaseURL: "https://reactnativefirebase-a0db1.firebaseio.com",
  projectId: "reactnativefirebase-a0db1",
  storageBucket: "reactnativefirebase-a0db1.appspot.com",
  messagingSenderId: "240279095460",
  appId: "1:240279095460:web:ac846a53d0c2653ff73e31",
  measurementId: "G-GM9FVFV1JQ",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
