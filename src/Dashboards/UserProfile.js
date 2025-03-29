import { userInformationRef, userAdminRef, userPromotersRef, usersArtistsRef, update, get, child, set, auth, storage, ref, } from "../Utilities/firebase";


export const fetchUserData = async (uid) => {
    try {
      const snapshot = await get(child(userInformationRef, `${uid}`)); // Fetch user data from Firebase
      
      if (snapshot.exists()) {
        return snapshot.val(); // Return the user data
      } else {
        console.log('No data available');
        return null; // Return null if no data is found
      }
    } catch (err) {
      console.error('Error fetching user data:', err);
      throw new Error('Error fetching user data'); // Throw an error if something goes wrong
    }
  };


  export const fetchUserStatus = async (uid) => {
    try {
      const snapshot = await get(child(userPromotersRef, `${uid}`)); // Fetch the user data by UID
  
      if (snapshot.exists()) {
        // If the user data exists, check the 'status' field
        const userData = snapshot.val();
        const status = userData.status; // Assuming the status is stored in the 'status' field
  
        return status; // Return the status (can be "pending", "active", "suspended", "terminated")
      } else {
        // If the user data doesn't exist, return 'non-existent'
        return 'non-existent';
      }
    } catch (error) {
      console.error("Error fetching user status:", error);
      return 'error'; // Return 'error' if something goes wrong
    }
  };