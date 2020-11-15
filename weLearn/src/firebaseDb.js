import * as firebase from 'firebase';



const firebaseConfig = {
    apiKey: "AIzaSyCENfQctdw0vjhxObFYLCNhGn5fNWLNrfY",
    authDomain: "wespeak-d9c67.firebaseapp.com",
    databaseURL: "https://wespeak-d9c67.firebaseio.com",
    projectId: "wespeak-d9c67",
    storageBucket: "wespeak-d9c67.appspot.com",
    messagingSenderId: "933474208478",
    appId: "1:933474208478:web:9c8ea16b59c6aad945504f"
}

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const db = firebaseApp.firestore();