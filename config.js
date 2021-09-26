import firebase from "firebase";
require("@firebase/firestore");

var firebaseConfig = {
  apiKey: "AIzaSyBinP5K6BlTFsEoI3vXPx_zPsDpIHNe-qQ",
  authDomain: "storyhub-68ca0.firebaseapp.com",
  projectId: "storyhub-68ca0",
  storageBucket: "storyhub-68ca0.appspot.com",
  messagingSenderId: "20216394258",
  appId: "1:20216394258:web:f87d15a58bd7727286decb",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();
