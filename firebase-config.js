// Replace with YOUR OWN free Firebase project keys.
// firebase.google.com -> Console -> Add Project -> Build -> Firestore Database
// -> Create database (test mode) -> Project settings -> Add app -> Web
// It shows an object exactly like this one. Copy the values here.

var firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

var firebaseDb;
if (firebaseConfig.apiKey !== "YOUR_API_KEY") {
  // Also add these two lines in index.html <head>, ABOVE this script tag:
  // <script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js"></script>
  // <script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore-compat.js"></script>
  firebase.initializeApp(firebaseConfig);
  firebaseDb = firebase.firestore();
}
