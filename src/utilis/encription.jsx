import CryptoJS from 'crypto-js';

export const encrypt = (key,token) => {
    const secretKey = '@User123';
    const encryptedToken = CryptoJS.AES.encrypt(token, secretKey).toString();
    localStorage.setItem(key, encryptedToken);
};