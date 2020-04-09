import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

const settings = {timestampsInSnapshots: true};

const firebaseConfig = {
    /*apiKey: "*******",
    authDomain: "*******",
    databaseURL: "*******",
    projectId: "*******",
    storageBucket: "*******",
    messagingSenderId: "*******",
    appId: "*******",
    measurementId: "*******"*/
  };
firebase.initializeApp(firebaseConfig);

firebase.firestore().settings(settings);

export default firebase;