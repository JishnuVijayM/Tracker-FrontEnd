import CryptoJS from 'crypto-js';

export const decrypt = (key) => {
    const secretKey ='@User123';
    const encryptedToken = localStorage.getItem(key);
    if (encryptedToken) {
        try {
            const bytes = CryptoJS.AES.decrypt(encryptedToken, secretKey);
            const decryptedToken = bytes.toString(CryptoJS.enc.Utf8);
            if (decryptedToken) {
                return decryptedToken;
            } else {
                throw new Error('Decryption failed');
            }
        } catch (error) {
            console.error('Error decrypting token:', error);
            return null;
        }
    }
    return null;
};