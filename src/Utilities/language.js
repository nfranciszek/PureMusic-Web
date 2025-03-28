function getUserLanguageName() {
    const languageNames = {
    "en": "English",
    "es": "Spanish",
    "fr": "French",
    "da": "Danish",
    "de": "German",
    "pl": "Polish",
    "nl": "Dutch",
    "no": "Norwegian",
    "ru": "Russian",
    "uk": "Ukrainian",
    "pt": "Portuguese",
    "it": "Italian",
    "sk": "Slovak",
    "cs": "Czech",
    "zh-CN": "Chinese",
    "zh-TW": "Chinese",
    "ja": "Japanese",
    "ko": "Korean",
    "sv": "Swedish",
    "ar": "Arabic",
    "fi": "Finnish",
    "he": "Hebrew",
    // Add more language codes and names as needed
    };

    const userLanguage = navigator.language;
    let userLanguageName;

    for (const languageCode in languageNames) {
        if (userLanguage.startsWith(languageCode)) {
            userLanguageName = languageNames[languageCode];
            break;
        }
    }

    if (!userLanguageName) {
        userLanguageName = "English"; // Default to English if language code not found
    }

    // console.log("User language:", userLanguageName);

    return userLanguageName;
}

export const userLanguageName = getUserLanguageName(); 


function getUserLanguageCode() {
    // Get the user's language from the browser
    const userLanguage = navigator.language;
    // Extract the two-character language code
    return userLanguage.split('-')[0];
}

// Export the user's language code
export const userLanguageCode = getUserLanguageCode();