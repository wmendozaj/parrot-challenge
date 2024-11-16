import Cookies from 'js-cookie';
import { encryptAES, decryptAES } from './cryptoUtils';

/**
 * Sets a cookie with an encrypted value.
 * @param name - The name of the cookie.
 * @param value - The value to store in the cookie.
 * @param days - The number of days until the cookie expires.
 */
export const setCookie = (name: string, value: string, days: number): void => {
  if (!name || !value || days <= 0) {
    throw new Error('Invalid parameters for setting a cookie.');
  }

  const encryptedValue = encryptAES(value);
  Cookies.set(name, encryptedValue, { expires: days });
};

/**
 * Retrieves and decrypts the value of a cookie.
 * @param name - The name of the cookie to retrieve.
 * @returns The decrypted value of the cookie, or null if not found.
 */
export const getCookie = (name: string): string | null => {
  if (!name) {
    throw new Error('Cookie name must be provided.');
  }

  const encryptedValue = Cookies.get(name);
  return encryptedValue ? decryptAES(encryptedValue) : null;
};

/**
 * Removes a cookie by its name.
 * @param name - The name of the cookie to remove.
 */
export const removeCookie = (name: string): void => {
  if (!name) {
    throw new Error('Cookie name must be provided.');
  }

  Cookies.remove(name);
};
