importScripts("https://www.gstatic.com/firebasejs/11.16.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/11.16.1/firebase-messaging-compat.js");
import { getMessaging, getToken } from "firebase/messaging";

firebase.initializeApp({
 apiKey: 'AIzaSyBeD6xgKo8raugyOmOQqj8GxXacDMSVdiE',
 authDomain: 'civilin-aa26d.firebaseapp.com',
 databaseURL: 'https://civilin-aa26d-default-rtdb.firebaseio.com',
 projectId: 'civilin-aa26d',
 storageBucket: 'civilin-aa26d.appspot.com',
 messagingSenderId: '152879681858',
 appId: '1:152879681858:web:5b48309d2cffeb630578db',
 measurementId: 'G-SXFPD4W1BZ',
});
// const messaging = firebase.messaging();

// Get registration token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.
const messaging = getMessaging();
getToken(messaging, { vapidKey: 'BAI_PV9Gi3e91GreAlSqfF5C3y0pkpFYYM3daaKMsv1MQY639tSz7E1cWkbhZ1G2T8Mvt0d5o9cfZNxLFrhyzQM' }).then((currentToken) => {
  if (currentToken) {
    sessionStorage.setItem('token', JSON.stringify(currentToken));
  } else {
    // Show permission request UI
    console.log('No registration token available. Request permission to generate one.');
    // ...
  }
}).catch((err) => {
  console.log('An error occurred while retrieving token. ', err);
  // ...
});