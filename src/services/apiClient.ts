import axios from 'axios';

import { getCookie, setCookie } from '../utils/cookiesUtils';
import { refreshToken, logout } from './authService';
import labels from '../utils/labels';

// Create an Axios instance with default configuration
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || 'https://api-staging.parrot.rest',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Include credentials in cross-origin requests
});

/**
 * Attaches the access token to outgoing requests, if available.
 *
 * @param {AxiosRequestConfig} config - The Axios request configuration object.
 * @returns {AxiosRequestConfig} The updated configuration with the Authorization header.
 */
apiClient.interceptors.request.use((config) => {
  const token = getCookie('access_token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

/**
 * Handles errors in API responses, specifically managing 401 (Unauthorized) errors.
 * Attempts to refresh the token and retry the original request.
 *
 * @param {AxiosResponse} response - The API response object.
 * @param {AxiosError} error - The error object thrown by Axios.
 * @returns {Promise<AxiosResponse>} Resolves the original response or retries the request after refreshing the token.
 */
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 errors and attempt token refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newToken = await refreshToken(); // Refresh the token
        if (newToken) {
          setCookie('access_token', newToken, 1); // Update the token in cookies
          originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
          return apiClient(originalRequest); // Retry the original request
        }
      } catch (refreshError) {
        console.error(labels.errors.tokenRefreshFailed, refreshError);
        logout(); 
        return Promise.reject(refreshError);
      }
    }

    // Reject other errors
    return Promise.reject(error);
  }
);

export default apiClient;
