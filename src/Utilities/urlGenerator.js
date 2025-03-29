
import { v4 as uuidv4 } from 'uuid';
import CryptoJS from 'crypto-js';

function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_';
  let result = '';
  const charactersLength = characters.length;
  const cryptoObj = window.crypto || window.msCrypto; // For cross-browser compatibility

  if (!cryptoObj || !cryptoObj.getRandomValues) {
      throw new Error('Your browser does not support cryptographic randomness.');
  }

  const randomBytes = new Uint8Array(length);
  cryptoObj.getRandomValues(randomBytes);

  for (let i = 0; i < length; i++) {
      const index = randomBytes[i] % charactersLength;
      result += characters.charAt(index);
  }

  return result;
}

  
  function generateUniqueURL() {
    // Generate an 11-character random string for the URL
    const randomString = generateRandomString(11);
    return randomString;
  }

  export default generateUniqueURL;


  export function generateUniqueTalkCircleVideoURLSessions() {
    // Generate an 11-character random string for the URL
    const randomString = uuidv4();
    return randomString;
  }

  export function generateUUID() {
    return uuidv4();
  }


  export const hashSHA256 = (data) => {
    return CryptoJS.SHA256(data).toString();
  };
