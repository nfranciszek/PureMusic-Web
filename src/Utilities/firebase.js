import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, child, get, equalTo, orderByChild, query, update, remove, set, onValue, push, off} from 'firebase/database';
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { getFunctions, httpsCallable } from "firebase/functions";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const pureMusicConfig = {
  apiKey: "AIzaSyBsoIYMhqqgmtkkPTmj0og-FIz87n9bVNs",
  authDomain: "puremusic-d8ee8.firebaseapp.com",
  projectId: "puremusic-d8ee8",
  storageBucket: "puremusic-d8ee8.firebasestorage.app",
  messagingSenderId: "905152658645",
  appId: "1:905152658645:web:f48648437e82431bca765c",
  measurementId: "G-YJL6HNZWMX"
};

// Initialize Firebase
const pureMusicApp = initializeApp(pureMusicConfig);
const analytics = getAnalytics(pureMusicApp);

const storage = getStorage(pureMusicApp);

const functions = getFunctions(pureMusicApp);

export { 
    pureMusicApp,
    storage,
    ref,
    getDownloadURL,
    functions,


};
