import firebase from "firebase"
const firebaseConfig = {
  apiKey: "AIzaSyCJZoeSeMecxgKUkznRRV1U9Zsuw9Mzpto",
  authDomain: "vue-firebase-3fe47.firebaseapp.com",
  databaseURL: "https://vue-firebase-3fe47.firebaseio.com",
  projectId: "vue-firebase-3fe47",
  storageBucket: "vue-firebase-3fe47.appspot.com",
  messagingSenderId: "366329933612",
  appId: "1:366329933612:web:edef1a373ef45529cb0689",
  measurementId: "G-TPQ66CTP7K"
}
firebase.initializeApp(firebaseConfig)
export const db = firebase.firestore()
