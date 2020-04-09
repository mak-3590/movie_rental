import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

const settings = {timestampsInSnapshots: true};

const config = {
  apiKey: "AIzaSyBirh0IvCCuDTvyMFYNeBUS_8cBHXstYAE",
    authDomain: "online-test-4a111.firebaseapp.com",
    databaseURL: "https://online-test-4a111.firebaseio.com",
    projectId: "online-test-4a111",
    storageBucket: "online-test-4a111.appspot.com",
    messagingSenderId: "32451708334",
    appId: "1:32451708334:web:4499135ce9d959b77bb43f"
};
firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase;