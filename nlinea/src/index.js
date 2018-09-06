import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './components/css/index.css';


import firebase from 'firebase';
import 'font-awesome/css/font-awesome.css';
import App from './components/scripts/App';

import registerServiceWorker from './components/scripts/registerServiceWorker';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDgdj9ehxE1rrFKfOuMsy-BtCQmnuENim4",
    authDomain: "loginnlinea.firebaseapp.com",
    databaseURL: "https://loginnlinea.firebaseio.com",
    projectId: "loginnlinea",
    storageBucket: "",
    messagingSenderId: "512138544891"
};
firebase.initializeApp(config);



ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>

    , document.getElementById('root'));
registerServiceWorker();
