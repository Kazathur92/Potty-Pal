import { BrowserRouter as Router } from "react-router-dom"
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import Firebase from "./components/firebase/Firebase";
import Firebase, { FirebaseContext } from "./components/firebase/FirebaseContext"
// import TEST from "./components/test/test";




ReactDOM.render(<Router><App /></Router>, document.getElementById('root'));
// ReactDOM.render(<Router><FirebaseContext.Provider value={new Firebase()}><App/></FirebaseContext.Provider></Router>, document.getElementById('root'));






// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
