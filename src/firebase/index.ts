// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from 'firebase/app'
import 'firebase/firestore'
// If you enabled Analytics in your project, add the Firebase SDK for Analytics
// import "firebase/analytics";

import KEY from './key'

const firebaseConfig = {
  apiKey: KEY.apiKey,
  authDomain: KEY.authDomain,
  databaseURL: KEY.databaseURL,
  projectId: KEY.projectId,
  storageBucket: KEY.storageBucket,
  messagingSenderId: KEY.messagingSenderId,
  appId: KEY.appId,
  measurementId: KEY.measurementId
}

firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()

export { db }
