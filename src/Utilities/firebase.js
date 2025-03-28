import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, RecaptchaVerifier, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPhoneNumber, onAuthStateChanged, fetchSignInMethodsForEmail } from 'firebase/auth';
import { getDatabase, child, get, ref, equalTo, orderByChild, query, update, remove, set, onValue, push, off} from 'firebase/database';
import { getStorage, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
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

const auth = getAuth(pureMusicApp);
const database = getDatabase(pureMusicApp);
const storage = getStorage(pureMusicApp);

const functions = getFunctions(pureMusicApp);


const userInformationRef = ref(database, "Users Information");
const userInformationRefSS = ref(database, "Users Information SS");
const ProfilesRef = ref(database, "UserProfiles");

const usersArtistsRef = ref(database, "ArtistsUsers");
const userPromotersRef = ref(database, "PromotersUsers");
const userAdminRef = ref(database, "Administrators");

let currentUserId = null; 


// Detect Auth State
onAuthStateChanged(auth, user => {
    if (user != null) {
        // Set user UID when authenticated user is available
        currentUserId = user.uid;
   //     console.log('logged in');
    } else {
        currentUserId = null; // Reset user UID when user is not authenticated
   //     console.log('No user here');
    }
});


export { 
    pureMusicApp,
    functions,

    auth, 
    signInWithEmailAndPassword, createUserWithEmailAndPassword, fetchSignInMethodsForEmail, 
    signInWithPhoneNumber, RecaptchaVerifier,
    database, child, get, set, ref, equalTo, orderByChild, query, update, remove, onValue, push, off,
    storage, getDownloadURL, uploadBytesResumable,
    currentUserId, 

    userInformationRef,
    userInformationRefSS,
    ProfilesRef,
    usersArtistsRef,
    userPromotersRef,
    userAdminRef,

};
