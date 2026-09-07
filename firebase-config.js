// Namma Tour — real Firebase project keys (namma-tour-d5f7e).

var firebaseConfig = {
  apiKey: "AIzaSyCg41T0ScvDfcDhBmW2wZNYX3tB2P-uu10",
  authDomain: "namma-tour-d5f7e.firebaseapp.com",
  projectId: "namma-tour-d5f7e",
  storageBucket: "namma-tour-d5f7e.firebasestorage.app",
  messagingSenderId: "995874416365",
  appId: "1:995874416365:web:18587cb8ca4dee9c348ee4"
};

var firebaseDb;
if (firebaseConfig.apiKey !== "YOUR_API_KEY") {
  // Also add these two lines in index.html <head>, ABOVE this script tag:
  // <script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js"></script>
  // <script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore-compat.js"></script>
  firebase.initializeApp(firebaseConfig);
  firebaseDb = firebase.firestore();
}
