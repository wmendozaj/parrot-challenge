import CryptoJS from 'crypto-js';
import labels from './labels';

const SECRET_KEY = process.env.REACT_APP_SECRET_KEY || 'p4rr0t-ch4113ng3-w3ndy-m3nd0z4';

/**
 * Encrypts a value using AES encryption.
 * @param value - The string to encrypt.
 * @returns The encrypted string.
 * @throws Will throw an error if the secret key is not defined.
 */
export const encryptAES = (value: string): string => {
  if (!SECRET_KEY) {
    throw new Error(labels.errors.encryptionFailed);
  }

  return CryptoJS.AES.encrypt(value, SECRET_KEY).toString();
};

/**
 * Decrypts an AES-encrypted string.
 * @param ciphertext - The encrypted string to decrypt.
 * @returns The decrypted string.
 * @throws Will throw an error if the secret key is not defined or if decryption fails.
 */
export const decryptAES = (ciphertext: string): string => {
  if (!SECRET_KEY) {
    throw new Error(labels.errors.decryptionFailed);
  }

  const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
  const decryptedText = bytes.toString(CryptoJS.enc.Utf8);

  if (!decryptedText) {
    throw new Error(labels.errors.decryptionInvalid);
  }

  return decryptedText;
};
