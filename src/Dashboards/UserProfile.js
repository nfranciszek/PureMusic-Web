import { userInformationRef, userAdminRef, userPromotersRef, usersArtistsRef, update, get, child, set, auth, storage, ref, } from "../Utilities/firebase";


export const fetchUserData = async (uid) => {
  try {
    const snapshot = await get(child(userInformationRef, `${uid}`)); // Fetch user data from Firebase

    if (snapshot.exists()) {
      return snapshot.val(); // Return the user data
    } else {
    //  console.log('No data available');
      return null; // Return null if no data is found
    }
  } catch (err) {
    console.error('Error fetching user data:', err);
    throw new Error('Error fetching user data'); // Throw an error if something goes wrong
  }
};


export const fetchUserStatus = async (uid, userType) => {
  try {
    if (!uid || !userType) {
      console.error("❌ fetchUserStatus: Missing uid or userType");
      return "invalid-input"; 
    }

    let userRef;
    
    if (userType.includes("Artist")) {
      userRef = usersArtistsRef;
    } else if (userType.includes("Promoter")) {
      userRef = userPromotersRef;
    } else {
      console.warn(`⚠️ fetchUserStatus: Invalid userType "${userType}"`);
      return "invalid-userType";
    }

    const snapshot = await get(child(userRef, uid));

    if (!snapshot.exists()) {
      console.warn(`⚠️ fetchUserStatus: No data found for UID "${uid}"`);
      return "non-existent";
    }

    const userData = snapshot.val();
    return userData?.status || "unknown"; // Return status, or "unknown" if missing

  } catch (error) {
    console.error("❌ Error fetching user status:", error);
    return "error"; // Consistent error handling
  }
};