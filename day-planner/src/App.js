import firebase from 'firebase';
import React from 'react';
import DateList from './DateList';
import fire  from './Fire';
import './App.css';

const App = () => {
  return (
    <div className="App">
      {/* <HelloWorldList /> */}
      <DateList />
    </div>
  );
}

var signInWithPopup = function(){
  var provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/plus.login');
  provider.addScope('profile');
  provider.addScope('email');
  firebase.auth().languageCode = 'pt';
  provider.setCustomParameters({
    'login_hint': 'user@example.com'
  });
  firebase.auth().signInWithPopup(provider).then(function(result) {
    if (result.credential) {
      var token = result.credential.accessToken;
      console.info('google token', token);
    }
    var user = result.user;
    console.info('google user', user);
  }).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    var email = error.email;
    var credential = error.credential;
  });
}

var signInWithEmail = function(){
  console.info(121);
  let email = 'file@gmail.com';
  let password = '123456';
  firebase.auth().createUserWithEmailAndPassword(email, password).then(function(){
    console.info(email, password);
  }).catch(function (err) {
    console.info(err);
  });
 
 // Sign in existing user
 firebase.auth().signInWithEmailAndPassword(email, password)
  .catch(function(err) {
  });
 
}

var signOutUser = function(){
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
  }).catch(function(error) {
    // An error happened.
  });
}
var initApp = function(){
  
  firebase.auth().onAuthStateChanged(function(user) {
    window.user = user; // user is undefined if no user signed in
    console.info(user);
   });

  document.getElementById('googleSignIn').addEventListener('click', signInWithPopup);
  document.getElementById('emailSignIn').addEventListener('click', signInWithEmail);
  document.getElementById('signOut').addEventListener('click', signOutUser);
}

export default App;
