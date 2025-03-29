
import { userPromotersRef, usersArtistsRef, userAdminRef, userInformationRef, get, child, update, remove, push} from "../Utilities/firebase";


export const updatePayoutDetails = async (uid, payoutType, payoutDetails, userType) => {
    let userReference;

    if (userType.includes("Artist")) {
        userReference = child(usersArtistsRef, uid);
    } else if (userType.includes("Promoter")) {
        userReference = child(userPromotersRef, uid);
    } else {
        console.error("Invalid userType:", userType);
        return;
    }

    // Determine which field to update
    let updateData = {};
    if (payoutType === "Venmo") {
        updateData = { venmo: payoutDetails };
    } else if (payoutType === "Zelle (Email)" || payoutType === "Zelle (Phone)") {
        updateData = { zelle: payoutDetails };
    } else {
        console.error("Invalid payoutType:", payoutType);
        return;
    }

    try {
        await update(userReference, updateData);

    } catch (error) {
        console.error("Error updating payout details:", error);
    }
};





// Function to check if Venmo or Zelle payout exists
export const checkPayoutExists = async (uid, userType) => {
    let snapshot;

    if (userType.includes("Artist")) {
        snapshot = await get(child(usersArtistsRef, uid));
    } else if (userType.includes("Promoter")) {
        snapshot = await get(child(userPromotersRef, uid));
    } else {
        return false; // Return false if userType doesn't match
    }

    if (snapshot.exists()) {
        const data = snapshot.val();
        return !!(data.venmo || data.zelle); // Returns true if either exists
    }

    return false; // No payout method found
};

// Function to get Venmo and Zelle payout details
export const getPayoutDetails = async (uid, userType) => {
    // Check if the userType contains "Artist"
    if (userType.includes("Artist")) {
        const snapshot = await get(child(usersArtistsRef, uid));
        if (snapshot.exists()) {
            const data = snapshot.val();
            return {
                venmo: data.venmo || null,
                zelle: data.zelle || null
            };
        }
    }
    // Check if the userType contains "Promoter"
    else if (userType.includes("Promoter")) {
        const snapshot = await get(child(userPromotersRef, uid));
        if (snapshot.exists()) {
            const data = snapshot.val();
            return {
                venmo: data.venmo || null,
                zelle: data.zelle || null
            };
        }
    }

    // Return null values if no matching userType or data is found
    return { venmo: null, zelle: null };
};



export const removePayoutVenmo = async (uid, userType) => {
    if (userType.includes("Artists")) {
        await remove(child(usersArtistsRef, `${uid}/venmo`)); // Correct path to Venmo
    } else if (userType.includes("Promoter")) {
        await remove(child(userPromotersRef, `${uid}/venmo`)); // Correct path to Venmo
    }

};

export const removePayoutZelle = async (uid, userType) => {

    if (userType.includes("Artists")) {
        await remove(child(usersArtistsRef, `${uid}/zelle`)); // Correct path to Zelle
    } else if (userType.includes("Promoter")) {
        await remove(child(userPromotersRef, `${uid}/zelle`)); // Correct path to Zelle
    }
};


/// --- NEW EXTRACTING STATS


// Function to get live user stats for a lead ambassador
export const getStats = async (uid, userType) => {
    try {
        let userRef = null;

        if (userType.includes("Artist")) {
            userRef = child(usersArtistsRef, `${uid}/stats`);
        } else if (userType.includes("Promoter")) {
            userRef = child(userPromotersRef, `${uid}/stats`);
        } else {
            console.error("Invalid userType:", userType);
            return null;
        }

        const snapshot = await get(userRef);

        if (snapshot.exists()) {
            const data = snapshot.val();
            return {
                TipA: Number(data.TipA) || 0, // Convert to number, default to 0
                TipB: Number(data.TipB) || 0,
                TipC: Number(data.TipC) || 0,
                TipD: Number(data.TipD) || 0,
                TipE: Number(data.TipE) || 0,
                TipF: Number(data.TipF) || 0
            };
        }

        return { TipA: 0, TipB: 0, TipC: 0, TipD: 0, TipE: 0, TipF: 0 }; // Default stats

    } catch (error) {
        console.error("Error fetching stats:", error);
        return null; // Return null on failure
    }
};



///  ----- NEW 



export const getCurrentMonthAndYear = async () => {
    const currentDate = new Date();

    const currentMonthIndex = currentDate.getMonth(); // getMonth() returns month from 0 (Jan) to 11 (Dec)
    const currentYear = currentDate.getFullYear();
    const currentDay = currentDate.getDate(); // Get the current day of the month

    // List of full month names
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const currentMonth = currentMonthIndex + 1; // Adding 1 for the numerical representation (1-12)
    const currentMonthName = months[currentMonthIndex]; // Get full name from the array

    // Determine next month if today is after the 15th
    let nextMonthIndex = currentMonthIndex + 1; // Default to the next month
    let nextMonthName = months[nextMonthIndex]; // Get next month name by default

    // If it's December, next month should be January (next year)
    if (currentMonthIndex === 11) {
        nextMonthIndex = 0;
        nextMonthName = months[nextMonthIndex];
    }

    // Determine payoutMonth based on the current day
    let payoutMonth = currentMonthName; // Default to currentMonthName

    if (currentDay > 15) {
        payoutMonth = nextMonthName; // If day is after 15th, set payoutMonth to nextMonth
    }

    // Call your ambassador data update function
    //  updateAmbassadorData(uid, currentMonth, currentYear);

    return { currentMonth, payoutMonth, currentYear };
};



export const checkTimeForArchive = async (uid, userType) => {
    const currentDateStamp = new Date();
    const currentMonthIndex = currentDateStamp.getMonth(); // 0-11
    const currentMonth = currentMonthIndex + 1; // Convert to 1-12
    const currentYear = currentDateStamp.getFullYear();

    console.log("Current month is:", currentMonth);

    let userRef = null;

    if (userType.includes("Artist")) {
        userRef = child(usersArtistsRef, `${uid}/stats/currentMonth`);
    } else if (userType.includes("Promoter")) {
        userRef = child(userPromotersRef, `${uid}/stats/currentMonth`);
    } else {
        console.error("Invalid userType:", userType);
        return;
    }

    try {
        const snapshot = await get(userRef);

        if (!snapshot.exists() || snapshot.val() !== currentMonth) {
            // Uncomment the next line if `storeStatForMonth` is defined elsewhere
            await storeStatForMonth(uid, currentMonth, currentYear, userType);
            console.log("TIME TO ARCHIVE STATS");
        }
    } catch (error) {
        console.error("Error fetching current month:", error);
    }
};



const storeStatForMonth = async (uid, currentMonth, currentYear, userType) => {
    try {
        let userRef = null;
        let references = null;

        if (userType.includes("Artist")) {
            userRef = child(usersArtistsRef, `${uid}/stats`);
            references = usersArtistsRef;
        } else if (userType.includes("Promoter")) {
            userRef = child(userPromotersRef, `${uid}/stats`);
            references = userPromotersRef;
        } else {
            console.error("Invalid userType:", userType);
            return;
        }

        const statsSnapshot = await get(userRef);
        if (!statsSnapshot.exists()) {
            console.error("No stats found for the user:", uid);
            return;
        }

        let currentStats = statsSnapshot.val();

      
        const previousMonthIndex = (currentMonth - 1); 

        // Define the stats to archive
        const archivedStats = {
            "TipA": currentStats["TipA"] || 0,
            "TipB": currentStats["TipB"] || 0,
            "TipC": currentStats["TipC"] || 0,
            "TipD": currentStats["TipD"] || 0,
            "TipE": currentStats["TipE"] || 0,
            "TipF": currentStats["TipF"] || 0
        };

        // Archive stats
        await update(child(references, `/${uid}/ArchivedStats/${currentYear}/${previousMonthIndex}`), archivedStats);
     

        // Reset the current stats for the new month
        await update(userRef, {
            TipA: 0,
            TipB: 0,
            TipC: 0,
            TipD: 0,
            TipE: 0,
            TipF: 0,
            currentMonth: currentMonth,  // ✅ **Fix: Missing comma**
            currentYear: currentYear
        });

        console.log(`Reset stats for the new month for user ${uid}`);
    } catch (error) {
        console.error("Error archiving stats and resetting for the new month:", error);
    }
};



//// ADMINISTRATION BELOW 

export const fetchUserDataArtistsList = async () => {
    try {
        const snapshot = await get(usersArtistsRef);
        
        if (!snapshot.exists()) {
          throw new Error('No users found');
        }
        
        const users = snapshot.val();
        const categorizedUsers = {
          pending: [],
          approved: [],
          rejected: [],
          paused: [],
          suspended: [],
          terminated: []
        };
    
        // Loop through the users and fetch their details
        for (const uid in users) {
          const user = users[uid];
          const userDetailsSnapshot = await get(child(userInformationRef, uid));
          
          if (userDetailsSnapshot.exists()) {
            const userDetails = userDetailsSnapshot.val();
            const userData = {
              uid,
              name: userDetails.name,
              profilePhoto: userDetails.profilePhoto,
              username: userDetails.username,
              status: user.status // Status is fetched from usersArtistsRef
            };
            
            // Categorize user based on their status
            if (userData.status in categorizedUsers) {
              categorizedUsers[userData.status].push(userData);
            }
          }
        }
    
        return categorizedUsers; // Return the categorized users
      } catch (error) {
        console.error('Error fetching user data:', error);
        return {}; // Return an empty object in case of error
      }
  };



export const fetchUserDataPromotersList = async () => {

        try {
          const snapshot = await get(userPromotersRef);
          
          if (!snapshot.exists()) {
            throw new Error('No users found');
          }
          
          const users = snapshot.val();
          const categorizedUsers = {
            pending: [],
            approved: [],
            rejected: [],
            paused: [],
            suspended: [],
            terminated: []
          };
      
          // Loop through the users and fetch their details
          for (const uid in users) {
            const user = users[uid];
            const userDetailsSnapshot = await get(child(userInformationRef, uid));
            
            if (userDetailsSnapshot.exists()) {
              const userDetails = userDetailsSnapshot.val();
              const userData = {
                uid,
                name: userDetails.name,
                profilePhoto: userDetails.profilePhoto,
                username: userDetails.username,
                status: user.status // Status is fetched from usersArtistsRef
              };
              
              // Categorize user based on their status
              if (userData.status in categorizedUsers) {
                categorizedUsers[userData.status].push(userData);
              }
            }
          }
      
          return categorizedUsers; // Return the categorized users
        } catch (error) {
          console.error('Error fetching user data:', error);
          return {}; // Return an empty object in case of error
        }
      
  };



  export const updateUserStatus = async (uid, status, userType) => {
    let userReference;
  
    // Determine the correct user reference based on user type
    if (userType === 'Artist') {
      userReference = child(usersArtistsRef, uid);
    } else if (userType === 'Promoter') {
      userReference = child(userPromotersRef, uid);
    } else {
      console.error('Invalid user type:', userType);
      return;
    }
  
    // Create the update data
    const updateData = { status: status };
  
    // Perform the update
    try {
      await update(userReference, updateData);
      console.log(`User status updated to ${status}`);
    } catch (error) {
      console.error('Error updating user status:', error);
    }
  };
