import React, { Component } from 'react'
// import firebase from "firebase";
import app from "firebase/app";


var config = {
  apiKey: "AIzaSyDUXg9Ox2xT704tQZYD3c8Su4BCyQznEys",
  authDomain: "schoolproject-to-1543434533340.firebaseapp.com",
  databaseURL: "https://schoolproject-to-1543434533340.firebaseio.com",
  projectId: "schoolproject-to-1543434533340",
  storageBucket: "schoolproject-to-1543434533340.appspot.com",
  messagingSenderId: "211605081887"
};

// export default config
// var app = firebase.initializeApp(config);

export default class Firebase  {

constructor () {
  //  firebase.initializeApp(config);
const appFirebase = app.initializeApp(config)

this.storage = appFirebase.name

}

}