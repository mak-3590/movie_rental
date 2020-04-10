import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

const settings = {timestampsInSnapshots: true};

const firebaseConfig = {
  	apiKey: "AIzaSyCtdUtjNLeidR8NxOXWqvls37ZvjQuCEcE",
    authDomain: "movie-rental-19774.firebaseapp.com",
    databaseURL: "https://movie-rental-19774.firebaseio.com",
    projectId: "movie-rental-19774",
    storageBucket: "movie-rental-19774.appspot.com",
    messagingSenderId: "528232991031",
    appId: "1:528232991031:web:d0926a38e14d386c7072b2",
    measurementId: "G-87F962J4L9"
  };
firebase.initializeApp(firebaseConfig);

firebase.firestore().settings(settings);

export default firebase;
