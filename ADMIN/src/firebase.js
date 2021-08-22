import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCvEZx2L68IJO_EiezAKxAoTkcFF1J2S5w",
  authDomain: "netflix-2c436.firebaseapp.com",
  projectId: "netflix-2c436",
  storageBucket: "netflix-2c436.appspot.com",
  messagingSenderId: "28147818116",
  appId: "1:28147818116:web:41d7f4b631a22208fb2cd1"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();
export default storage;