import React from 'react';
import ReactDOM from 'react-dom';
import * as firebase from 'firebase';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';



const firebaseConfig = {
    apiKey: "AIzaSyAfduqgu-UTXP0Uh_TXd_nCpMZJKspe67M",
    authDomain: "testapp-4a5d2.firebaseapp.com",
    databaseURL: "https://testapp-4a5d2.firebaseio.com",
    projectId: "testapp-4a5d2",
    storageBucket: "testapp-4a5d2.appspot.com",
    messagingSenderId: "671899547780",
    appId: "1:671899547780:web:250bcbab8c81ddd7b52ad1",
    measurementId: "G-XMKMGR4D9L"
};

firebase.initializeApp(firebaseConfig);




ReactDOM.render(
    <App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
