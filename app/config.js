import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBSl67r96m7E-MoZIGoAJLzljKzvfXTw3Y",
  authDomain: "campedia-6915a.firebaseapp.com",
  projectId: "campedia-6915a",
  storageBucket: "campedia-6915a.appspot.com",
  messagingSenderId: "158058421242",
  appId: "1:158058421242:web:5d261653bc9542432a6243",
  measurementId: "G-T950F929C3"
};

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}

export {firebase};