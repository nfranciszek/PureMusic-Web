


export const updatePayoutDetails = async (uid, payoutType, payoutDetails) => {
    //  const snapshot = await get(child(AmbassadorsRef, uid));

    // if (snapshot.exists()) {
    // Update the user with the new venmo and zelle details
    if (payoutType === "Venmo") {
     //   await update(child(AmbassadorsRef, uid), { venmo: payoutDetails, uid: uid });
    }

    if (payoutType === "Zelle (Email)") {
      //  await update(child(AmbassadorsRef, uid), { zelle: payoutDetails, uid: uid });
    }

    if (payoutType === "Zelle (Phone)") {
      //  await update(child(AmbassadorsRef, uid), { zelle: payoutDetails, uid: uid });
    }

    //  }
};

// Function to check if Venmo or Zelle payout exists
export const checkPayoutExists = async (uid) => {
   // const snapshot = await get(child(AmbassadorsRef, uid));

    if (snapshot.exists()) {
        const data = snapshot.val();
        return !!(data.venmo || data.zelle); // Returns true if either exists
    }

    return false; // No payout method found
};


// Function to get Venmo and Zelle payout details
export const getPayoutDetails = async (uid) => {
    // const snapshot = await get(child(AmbassadorsRef, uid));

    if (snapshot.exists()) {
        const data = snapshot.val();
        return {
            venmo: data.venmo || null,
            zelle: data.zelle || null
        };
    }

    return { venmo: null, zelle: null }; // Return null values if not found
};


export const removePayoutVenmo = async (uid) => {
   // await remove(child(AmbassadorsRef, `${uid}/venmo`)); // Correct path to Venmo
};

export const removePayoutZelle = async (uid) => {
   // await remove(child(AmbassadorsRef, `${uid}/zelle`)); // Correct path to Zelle
};




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
