// src/services/tokenService.js

import CryptoJS from 'crypto-js';

const _handleDecryptTokenService = (encryptedToken) => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedToken, process.env.REACT_APP_PRIVATE_KEY);
    const decryptedToken = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedToken;
  } catch (error) {
    console.error("Failed to decrypt token", error);
    return null;
  }
};

export default _handleDecryptTokenService;
