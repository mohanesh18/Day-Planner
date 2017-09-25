import firebase from 'firebase';

var config = {
  apiKey: "AIzaSyD-TlC8f3DjNXvzXnz3XUrH8aoa2vFCCR8",
  authDomain: "day-planner-4055f.firebaseapp.com",
  databaseURL: "https://day-planner-4055f.firebaseio.com",
  projectId: "day-planner-4055f",
  storageBucket: "day-planner-4055f.appspot.com",
  messagingSenderId: "1076007580612"
};
var fire = firebase.initializeApp(config);

export default fire;
