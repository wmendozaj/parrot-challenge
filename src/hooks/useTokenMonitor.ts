import { useEffect, useRef, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

import { loginSuccess, logoutSuccess } from '../redux/authSlice';
import {
  isAuthenticated,
  getTokenExpiry,
  refreshToken,
  TOKEN_MAX_LIFETIME_SECONDS,
} from '../services/authService';

const TOKEN_CHECK_INTERVAL = 10000; // 10 seconds

/**
 * Custom Hook: Monitors token validity and refreshes it when necessary.
 */
export const useTokenMonitor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const tokenMonitorRunning = useRef(false);

  /**
   * Logout handler: Clears session and navigates to login page.
   */
  const handleLogout = useCallback(() => {
    dispatch(logoutSuccess());
    navigate('/login', { replace: true });
    tokenMonitorRunning.current = false;
  }, [dispatch, navigate]);

  /**
   * Auth Check handler: Checks if the user is authenticated.
   */
  const handleAuthCheck = useCallback(() => {
    if (isAuthenticated()) {
      dispatch(loginSuccess());
    } else {
      handleLogout();
    }
  }, [dispatch, handleLogout]);

  useEffect(() => {
    // Avoid running the monitor on the login page
    if (location.pathname === '/login') return;

    // Prevent multiple instances of the monitor
    if (tokenMonitorRunning.current) return;

    tokenMonitorRunning.current = true;
    handleAuthCheck();

    const tokenRefreshInterval = setInterval(async () => {
      const expiry = getTokenExpiry();
      const maxLifetimeReached =
        expiry && Date.now() > expiry + TOKEN_MAX_LIFETIME_SECONDS * 1000;

      if (maxLifetimeReached) {
        handleLogout();
        clearInterval(tokenRefreshInterval);
        return;
      }

      if (expiry && Date.now() > expiry) {
        try {
          await refreshToken();
        } catch (error) {
          handleLogout();
          clearInterval(tokenRefreshInterval);
        }
      }
    }, TOKEN_CHECK_INTERVAL);

    return () => {
      clearInterval(tokenRefreshInterval);
      tokenMonitorRunning.current = false;
    };
  }, [handleAuthCheck, handleLogout, location.pathname]);
};
