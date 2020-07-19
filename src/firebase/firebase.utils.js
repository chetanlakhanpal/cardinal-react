import firebase from 'firebase';

export const databaseURL = 'https://hacker-news.firebaseio.com'

const firebaseConfig = {
    apiKey: "AIzaSyAuQZVCqNuOr7BFM5z6gZlZ1A-YqMA7hZE",
    authDomain: "cardinal-proj.firebaseapp.com",
    projectId: "cardinal-proj",
    storageBucket: "cardinal-proj.appspot.com",
    messagingSenderId: "477113871291",
    appId: "1:477113871291:web:a068bbcd89794f1f18329e",
    databaseURL
  };
firebase.initializeApp(firebaseConfig)

export const database = firebase.database

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({prompt: 'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider);