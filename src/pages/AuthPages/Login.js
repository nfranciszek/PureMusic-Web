import { auth, signInWithEmailAndPassword } from "../../Utilities/firebase";
import { getAuth } from "firebase/auth";
import { userInformationRef, get, child } from "../../Utilities/firebase";


export const validateEmail = (email) => {
  // Regular expression for email validation
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 8;
};


export const authenticateUser = async (email, password) => {
  try {

    const loginEmail = email
    const loginPassword = password
    const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
    // Handle successful authentication
    const user = userCredential.user;

    return user;
  } catch (error) {
    // Handle authentication errors
    console.error(error.code, error.message);
    throw error; // Rethrow the error to be caught by the caller
  }
};

export const checkUserExists = async () => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;
    const uid = user ? user.uid : null;

   // console.log("otest uid =", uid);

    const userSnapshot = await get(child(userInformationRef, uid)); 

    if (userSnapshot.exists()) { 
     // console.log("otest uid exist?", userSnapshot.exists());
      return true;
    } else {
     // console.log("otest uid exist?", userSnapshot.exists());
      return false;
    }

  } catch (error) {
    console.error("Error checking user existence:", error);
    throw error; // Rethrow the error to be caught by the caller
  }
};