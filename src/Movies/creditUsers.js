import { ProfilesRef, userInformationRef, usersArtistsRef, userPromotersRef, child, get, update } from "../Utilities/firebase";
import { getCurrentDateTime } from "../Utilities/currentDateTimeUtils";

// Function to update ambassador/promoter data

const findUserUID = async (profileURL) => {
    try {
        const snapshot = await get(ProfilesRef);
        if (snapshot.exists()) {
            for (const childSnapshot of Object.values(snapshot.val())) {
                if (childSnapshot.url.toLowerCase() === profileURL.toLowerCase()) {
                    return childSnapshot.uid; // Return UID
                }
            }
        }
        return null; // Return null if no match is found
    } catch (error) {
        console.error("Error fetching user UID:", error);
        return null;
    }
};

export const creditUserForConversion = async (profileURL, tipAmount) => {
    try {
        const uid = await findUserUID(profileURL);
        if (!uid) {
            console.error("User not found with profile URL:", profileURL);
            return;
        }
       

        // 2. Check if user is an Artist or Promoter
        let userIsArtist = false;
        let userIsPromoter = false;

        const artistSnapshot = await get(child(usersArtistsRef, `${uid}`));
        if (artistSnapshot.exists()) {
            userIsArtist = true;
        }

        const promoterSnapshot = await get(child(userPromotersRef, `${uid}`));
        if (promoterSnapshot.exists()) {
            userIsPromoter = true;
        }

        // 3. Convert tip amount into conversion values
        const tipAmountNum = Number(tipAmount); // Ensure it's a number

        const tipConversions = {
            TipA: tipAmountNum === 10 ? 1 : 0,
            TipB: tipAmountNum === 15 ? 1 : 0,
            TipC: tipAmountNum === 25 ? 1 : 0,
            TipD: tipAmountNum === 30 ? 1 : 0,
            TipE: tipAmountNum === 50 ? 1 : 0,
            TipF: tipAmountNum === 100 ? 1 : 0
        };

        const dateAdded = getCurrentDateTime();
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1; // Months are 0-based

        // 4. Fetch existing stats
        let currentStats = {};
        if (userIsArtist || userIsPromoter) {
            const statsSnapshot = await get(child(userPromotersRef, `${uid}/stats`));
            if (statsSnapshot.exists()) {
                currentStats = statsSnapshot.val();
            }
        }

        // 5. Update user stats if they are an Artist or Promoter
        if (userIsArtist || userIsPromoter) {
            await update(child(userPromotersRef, `${uid}/stats`), {
                TipA: (currentStats.TipA || 0) + tipConversions.TipA,
                TipB: (currentStats.TipB || 0) + tipConversions.TipB,
                TipC: (currentStats.TipC || 0) + tipConversions.TipC,
                TipD: (currentStats.TipD || 0) + tipConversions.TipD,
                TipE: (currentStats.TipE || 0) + tipConversions.TipE,
                TipF: (currentStats.TipF || 0) + tipConversions.TipF,
                currentYear,
                currentMonth,
                lastUpdated: dateAdded
            });
        }

        console.log(`Successfully credited user ${profileURL} (${uid}) for ${tipAmount}.`);

    } catch (error) {
        console.error("Error updating ambassador/promoter data:", error);
    }
};
