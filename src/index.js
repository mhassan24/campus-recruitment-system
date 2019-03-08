import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyCPC3RJMbWZj2QegO95G5AqUAKYi5kEMGU",
    authDomain: "bootcamp-994bf.firebaseapp.com",
    databaseURL: "https://bootcamp-994bf.firebaseio.com",
    projectId: "bootcamp-994bf",
    storageBucket: "bootcamp-994bf.appspot.com",
    messagingSenderId: "935487728622"
};
firebase.initializeApp(config);

const firestore = firebase.firestore();
const settings = {timestampsInSnapshots: true };
firestore.settings(settings);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
