import apiClient from './apiClient';
import { setCookie, getCookie, removeCookie } from '../utils/cookiesUtils';
import labels from '../utils/labels';

export const TOKEN_LIFETIME_SECONDS = 1500; // 25 minutes
export const TOKEN_MAX_LIFETIME_SECONDS = 1800; // 30 minutes

/**
 * Create and store tokens after user authentication.
 * @param username - The username of the user.
 * @param password - The user's password.
 * @returns Access token as a string.
 */
export const createToken = async (username: string, password: string): Promise<string> => {
  const response = await apiClient.post('/api/auth/token', { username, password });
  const { access, refresh } = response.data;

  // Store tokens in cookies
  setCookie('access_token', access, 1);
  setCookie('refresh_token', refresh, 1);

  // Set token expiry time in localStorage
  const expiryTime = Date.now() + TOKEN_LIFETIME_SECONDS * 1000;
  localStorage.setItem('token_expiry', expiryTime.toString());

  return access;
};

/**
 * Refresh the access token using the refresh token.
 * Validates token lifetime and handles session cleanup if limits are exceeded.
 * @returns New access token as a string.
 */
export const refreshToken = async (): Promise<string> => {
  try {
    const refresh_token = getCookie('refresh_token');
    if (!refresh_token) {
      throw new Error(labels.errors.refreshTokenMissing);
    }

    const expiry = getTokenExpiry();
    const maxLifetimeReached =
      expiry && Date.now() > expiry + TOKEN_MAX_LIFETIME_SECONDS * 1000;

    if (maxLifetimeReached) {
      throw new Error(labels.errors.tokenMaxLifetimeReached);
    }

    const response = await apiClient.post('/api/auth/token/refresh', { refresh: refresh_token });
    const { access } = response.data;

    // Update cookies and expiry time
    setCookie('access_token', access, 1);

    const expiryTime = Date.now() + TOKEN_LIFETIME_SECONDS * 1000;
    localStorage.setItem('token_expiry', expiryTime.toString());

    return access;
  } catch (error) {
    console.error(labels.errors.tokenRefreshFailed, error);

    // Clear session state
    removeCookie('access_token');
    removeCookie('refresh_token');
    localStorage.removeItem('token_expiry');

    throw new Error(labels.errors.tokenRefreshFailed);
  }
};

/**
 * Check if the user is authenticated.
 * Validates token presence, expiry, and lifetime.
 * @returns `true` if authenticated, otherwise `false`.
 */
export const isAuthenticated = (): boolean => {
  const token = getCookie('access_token');
  const expiry = getTokenExpiry();
  const maxLifetimeReached =
    expiry && Date.now() > expiry + TOKEN_MAX_LIFETIME_SECONDS * 1000;

  return Boolean(token && expiry && Date.now() < expiry && !maxLifetimeReached);
};

/**
 * Retrieve token expiry time from localStorage.
 * @returns Expiry time in milliseconds, or `null` if not set.
 */
export const getTokenExpiry = (): number | null => {
  const expiry = localStorage.getItem('token_expiry');
  return expiry ? parseInt(expiry, 10) : null;
};

/**
 * Logout the user by clearing cookies and session data.
 * Redirects the user to the login page.
 */
export const logout = (): void => {
  removeCookie('access_token');
  removeCookie('refresh_token');
  removeCookie('store_id');

  localStorage.removeItem('token_expiry');

  window.location.href = '/login';
};
