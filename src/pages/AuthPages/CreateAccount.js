import { ProfilesRef, userInformationRef, userInformationRefSS, update, get, child, set, auth, storage, createUserWithEmailAndPassword, fetchSignInMethodsForEmail, usersArtistsRef, userPromotersRef } from "../../Utilities/firebase";
import { getDownloadURL, uploadBytesResumable } from "../../Utilities/firebase";
import { currentUserId } from "../../Utilities/firebase";
import { ref } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

const forbiddenWords = ['fuck', 'rape', 'slut', 'shit', 'phat', 'dirty', 'boobs', 'porn', 'breasts', 'cock', 'suck', 'whore', 'cum', 'cunt', 'dick', 'pussy', 'fag', 'fart', 'nigga', 'nigger', 'xxx', 'pornhub', 'xvideos', 'redtube', 'ass', 'tits', 'boob'];

const proprietaryNames = ['download', 'brand', 'company', 'yenzek', 'login', 'join',
  'signup',
  'onboarding',
  'account',
  'mojichat',
  'talkcircle',
  'talkcircles',
  'privacypolicy',
  'tos',
  'sign-in',
  'rules',
  'general',
  'about',
  'contact-us',
  'company',
  'help',
  'terms-of-service',
  'privacy-policy',
  'community-guidelines',
  'faqs',
  'terms',
  'policy',
  'blog',
  'privacy',
  'accounts',
  'brand',
  'social',
  'social-reviews',
  'social-score',
  'shows',
  'show',
  'legal',
  'prayersend',
  'puremusic',
  'competition',
  'vote',
  'event',

];




export const validateName = (name) => {
  return name.length > 1 && name.length <= 20;
};



export const validateNameSafety = (name) => {
  const lowercaseTitle = name.toLowerCase();
  for (const word of forbiddenWords) {
    if (lowercaseTitle.includes(word)) {
      return false; // Title contains a forbidden word
    }
  }
  return true; // Title is clean
};


export const validateNameFormat = (name) => {
  const re = /^[a-zA-Z\s]*$/;
  return re.test(name);
};


export const validateEmail = (email) => {
  // Regular expression for a more robust email validation
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  return re.test(email);
};

export const checkIfEmailRegistered = async (email) => {
  try {
    const signInMethods = await fetchSignInMethodsForEmail(auth, email);
    // If signInMethods array is empty, the email is not registered
    if (signInMethods.length === 0) {
      return false;
    } else {
      // Email is registered
      return true;
    }
  } catch (error) {
    console.error('Error checking email registration:', error);
    // Handle error
    throw error;
  }
};


export const validatePassword = (password) => {
  return password.length >= 8;
};


export const validateUsernameLength = (username) => {
  return username.length >= 2 && username.length <= 20;
};

export const validateUsernameFormat = (username) => {
  // Regular expression for username validation
  const re = /^(?=.*[a-zA-Z0-9])[a-zA-Z0-9._-]{1,20}$/;
  return re.test(username);

};


export const validateUsernameSafety = (username) => {
  const lowercaseTitle = username.toLowerCase();
  for (const word of forbiddenWords) {
    if (lowercaseTitle.includes(word)) {
      return false; // Title contains a forbidden word
    }
  }
  return true; // Title is clean
};


export const validateUsernameExcludesCompanyWebsites = (username) => {
  const lowercaseTitle = username.toLowerCase();
  for (const word of proprietaryNames) {
    if (lowercaseTitle.includes(word)) {
      return false; // Title contains a forbidden word
    }
  }
  return true; // Title is clean
};


export const validateUsername = async (username) => {
  // check database 
  const snapshot = await get(ProfilesRef);
  let usernameExists = false; // Flag variable to track username existence

    if (!snapshot.exists()) {
      // Handle empty database case
      console.log("Database is empty. No usernames to check.");
      return false; // Username doesn't exist because the database is empty
    }
  

  if (snapshot.exists()) {
    snapshot.forEach((childSnapshot) => {
      // Get the username from the database and convert it to lowercase
      const dbUsername = childSnapshot.child('url').val().toLowerCase();
      // Convert the input username to lowercase for comparison
      const inputUsername = username.toLowerCase();

      // Check if the database username matches the input username
      if (dbUsername === inputUsername) {
        // console.log("THERE IS A MATCH");
        usernameExists = true; // Set flag to true if username is found
      }
    });
  } 

  // Return based on the flag value
  if (usernameExists) {
    return true; // Username exists
  } else {
    // console.log("USERNAME NOT FOUND IN DATABASE");
    return false; // Username doesn't exist
  }


};

export const validateImage = (file) => {
  if (!file) {
    return false; // No file uploaded
  }
  const allowedExtensions = ["jpg", "jpeg", "png", "heic"];  // Allowed file extensions
  const extension = file.name.split(".").pop().toLowerCase(); // Get file extension
  return allowedExtensions.includes(extension); // Check if the extension is allowed
};





const uploadProfilePhoto = async (uid, profilePhotoFile) => {
  try {
    // Define storage reference
    const filename = `${Date.now()}_${uuidv4()}`;
    let storageRef = ref(storage, `profileImageWeb/${uid}/${filename}`);


    // Upload file
    await uploadBytesResumable(storageRef, profilePhotoFile);

    // Get download URL
    const downloadURL = await getDownloadURL(storageRef);

    // console.log('Profile photo uploaded successfully');
    return downloadURL;
  } catch (error) {
    console.error('Error uploading profile photo:', error);
    throw error;
  }
};



export const createAccountSignUp = async (name, email, password, profilePhoto, username, languageName, languageCode, country, birthday, rank) => {
  try {
    // Step 1: Create User Account
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const uid = userCredential.user.uid;

    // Step 2: Upload Profile Photo
    const profilePhotoURLPromise = uploadProfilePhoto(uid, profilePhoto);

    // Await profilePhotoURLPromise before proceeding with the subsequent steps
    const profilePhotoURL = await profilePhotoURLPromise;

    // Step 3A: Update User Information
    const userInfoPromise = set(child(userInformationRef, `${uid}`), {
      uid: uid,
      bio: "",
      subscription: "Freemium",
      name: name,
      profilePhoto: profilePhotoURL,
      username: username,
      Language: languageName,
      language: languageCode,
      country: country,
      birthday: birthday,
      rank: rank,
    });





    // Step 3B: Update User Information SS
    const userInfoSSPromise = set(child(userInformationRefSS, `${uid}`), {
      uid: uid,
      email: email,
      phoneNumber: "",
    });

    // Step 4: Update Profile URL
    const profileURLPromise = set(child(ProfilesRef, `${uid}`), {
      uid: uid,
      url: username,
    });

    let userRankSSPromise = null;

    console.log("rank equals ", rank);

    if (rank.includes("Artist")) {
      userRankSSPromise = set(child(usersArtistsRef, `${uid}`), {
        uid: uid,
        rank: rank,
        status: "pending",
      });
    } else if (rank.includes("Promoter")) {
      userRankSSPromise = set(child(userPromotersRef, `${uid}`), {
        uid: uid,
        rank: rank,
        status: "pending",
      });
    }




    // Await Steps 3A, 3B, and 4 concurrently
    await Promise.all([userInfoPromise, userInfoSSPromise, profileURLPromise, userRankSSPromise].filter(Boolean));


    await setStatsForUser(uid, rank);


    // console.log('User signed up successfully:', uid);
    return uid;
  } catch (error) {
    console.error('Sign up error:', error.code, error.message);
    throw error;
  }
};

const setStatsForUser = async (uid, rank) => {

  const currentDateStamp = new Date();
  const currentMonthIndex = currentDateStamp.getMonth(); // getMonth() returns month from 0 (Jan) to 11 (Dec)
const currentMonth = currentMonthIndex + 1;
const currentYear = currentDateStamp.getFullYear();

  if (rank.includes("Artist")) {
    try {
      await update(child(usersArtistsRef, `${uid}/stats`), { 
      
        //  totalPastPeopleInvited: 0,
          tipA: 0,
          tipB: 0,
          tipC: 0,
          tipD: 0,
          tipE: 0,
          tipF: 0,
          bonuses: 0,
          currentMonth: currentMonth,
          currentYear: currentYear,
  
      });
  } catch (error) {
      console.error("Error updating ambassador stats:", error);
  }
  } else if (rank.includes("Promoter")) {
   
try {
    await update(child(userPromotersRef, `${uid}/stats`), { 
    
      //  totalPastPeopleInvited: 0,
      tipA: 0,
      tipB: 0,
      tipC: 0,
      tipD: 0,
      tipE: 0,
      tipF: 0,
      bonuses: 0,
      currentMonth: currentMonth,
      currentYear: currentYear,

    });
} catch (error) {
    console.error("Error updating ambassador stats:", error);
}
  }

}




/*
const checkIfSignedUpByAmbassador = async (AmbassadorUID, userUID) => {
  if (AmbassadorUID) {
    try {
      // Update the user with the ambassador's ID
      await update(child(userInformationRef, userUID), { invitedBy: AmbassadorUID });

      // Get the current number of signups for this ambassador
      const ambassadorSnapshot = await get(child(AmbassadorsRef, AmbassadorUID));
      let currentSignUps = 0;

      if (ambassadorSnapshot.exists()) {
        currentSignUps = ambassadorSnapshot.val().numberOfSignUps || 0;
      }

      // Increment the signup count
      await update(child(AmbassadorsRef, AmbassadorUID), {
        numberOfSignUps: currentSignUps + 1
      });



      // Add Physical Credit 

      // Account Creation: User - creates a YenZek Account 
      update(child(AmbassadorsRef, `${AmbassadorUID}/stats/Signups/${userUID}`),
        {
          uid: userUID,
        })

        .then(() => {
        })
        .catch((error) => {
          console.error('&& Error saving user :', error);
        });

        /*

         // STORIES: User - shares a story on YenZek

         update(child(AmbassadorsRef, `${AmbassadorUID}/stats/Stories/${userUID}`),
        {
          uid: userUID,
        })

        .then(() => {
        })
        .catch((error) => {
          console.error('&& Error saving user :', error);
        });

       // TALKCIRCLES: User - meets at least one person on TC

         update(child(AmbassadorsRef, `${AmbassadorUID}/stats/TCMeets/${userUID}`),
        {
          uid: userUID,
        })

        .then(() => {
        })
        .catch((error) => {
          console.error('&& Error saving user :', error);
        });


       // YENZEK PLUS: User - becomes a YenZek Plus Member
         update(child(AmbassadorsRef, `${AmbassadorUID}/stats/PlusMembers/${userUID}`),
        {
          uid: userUID,
        })

        .then(() => {
        })
        .catch((error) => {
          console.error('&& Error saving user :', error);
        });


      // YENZEK VIP: User - becomes a YENZEK VIP Member
         update(child(AmbassadorsRef, `${AmbassadorUID}/stats/VIPMembers/${userUID}`),
        {
          uid: userUID,
        })

        .then(() => {
        })
        .catch((error) => {
          console.error('&& Error saving user :', error);
        });


   



    } catch (error) {
      console.error('&& Error updating signup count:', error);
    }
  }
};





export const addAsBrandAmbassador = () => {
  if (currentUserId) {
    get(child(userInformationRefSS, `${currentUserId}`))
    .then((snapshot) => {
        if (snapshot.exists()) {

            const { email } = snapshot.val();

    set(child(AmbassadorsRef, `${currentUserId}`), {

      uid: currentUserId,
      email: email,

    });

  }



  })

}

}

*/



export const validateAge = (birthday) => {
  const { month, day, year } = birthday;

  const enteredDate = new Date(year, month - 1, day); // JavaScript Date months are 0-based
  const currentDate = new Date();

  let age = currentDate.getFullYear() - enteredDate.getFullYear();
  const monthDiff = currentDate.getMonth() - enteredDate.getMonth();
  const dayDiff = currentDate.getDate() - enteredDate.getDate();

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }

  return age >= 16;
};
