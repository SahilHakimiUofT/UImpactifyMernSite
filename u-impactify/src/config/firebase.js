import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyAcB2WkfACgfuKdM1v04HKsBp4FqX0DYyg",
    authDomain: "uimpactify.firebaseapp.com",
    databaseURL: "https://uimpactify.firebaseio.com",
    projectId: "uimpactify",
    storageBucket: "uimpactify.appspot.com",
    messagingSenderId: "688202207022",
    appId: "1:688202207022:web:361a50f155c645a81eb4bf"
  };

const fire = firebase.initializeApp(firebaseConfig);
export default fire;