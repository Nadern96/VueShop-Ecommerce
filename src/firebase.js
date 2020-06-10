import firebase from "firebase";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyD0x5E2Vjrh13GjdIE_xxO5k_u8adv9NJs",
  authDomain: "vue-shop-6d3ad.firebaseapp.com",
  databaseURL: "https://vue-shop-6d3ad.firebaseio.com",
  projectId: "vue-shop-6d3ad",
  storageBucket: "vue-shop-6d3ad.appspot.com",
  messagingSenderId: "935769114524",
  appId: "1:935769114524:web:a9165f383f6fe4932d6a59",
  measurementId: "G-5N86BSBDSV"
};
// Initialize Firebase
export const fb = firebase.initializeApp(firebaseConfig);
firebase.analytics();
