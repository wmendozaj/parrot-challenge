import { createToken, refreshToken, isAuthenticated, logout } from '../authService';
import apiClient from '../apiClient';
import { setCookie, getCookie, removeCookie } from '../../utils/cookiesUtils';
import labels from '../../utils/labels';

jest.mock('../apiClient');
jest.mock('../../utils/cookiesUtils');

const mockedGetCookie = jest.fn();
const mockedSetCookie = jest.fn();
const mockedRemoveCookie = jest.fn();

(getCookie as jest.Mock) = mockedGetCookie;
(setCookie as jest.Mock) = mockedSetCookie;
(removeCookie as jest.Mock) = mockedRemoveCookie;

describe('authService', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Mock localStorage
    Object.defineProperty(window, 'localStorage', {
      value: (() => {
        let store: Record<string, string> = {};
        return {
          getItem: jest.fn((key) => store[key] || null),
          setItem: jest.fn((key, value) => {
            store[key] = value;
          }),
          removeItem: jest.fn((key) => {
            delete store[key];
          }),
          clear: jest.fn(() => {
            store = {};
          }),
        };
      })(),
      writable: true,
    });
  });

  describe('createToken', () => {
    it('should store tokens in cookies and localStorage', async () => {
      (apiClient.post as jest.Mock).mockResolvedValue({
        data: { access: 'mockAccessToken', refresh: 'mockRefreshToken' },
      });

      const result = await createToken('username', 'password');

      expect(mockedSetCookie).toHaveBeenCalledWith('access_token', 'mockAccessToken', 1);
      expect(mockedSetCookie).toHaveBeenCalledWith('refresh_token', 'mockRefreshToken', 1);

      const expiryTime = parseInt(localStorage.getItem('token_expiry') || '', 10);
      expect(expiryTime).toBeGreaterThan(Date.now());
      expect(result).toBe('mockAccessToken');
    });
  });

  describe('refreshToken', () => {
    it('should refresh the token and update cookies', async () => {
      mockedGetCookie.mockReturnValue('mockRefreshToken');
      (apiClient.post as jest.Mock).mockResolvedValue({
        data: { access: 'newAccessToken' },
      });

      const result = await refreshToken();

      expect(mockedSetCookie).toHaveBeenCalledWith('access_token', 'newAccessToken', 1);
      expect(result).toBe('newAccessToken');
    });

    it('should throw an error if refresh token is missing', async () => {
      mockedGetCookie.mockReturnValue(null);

      await expect(refreshToken()).rejects.toThrow(labels.errors.tokenRefreshFailed);

      expect(mockedGetCookie).toHaveBeenCalledWith('refresh_token');
      expect(localStorage.getItem('token_expiry')).toBeNull();
    });
  });

  describe('isAuthenticated', () => {
    it('should return true if token is valid', () => {
      mockedGetCookie.mockReturnValue('mockAccessToken');
      localStorage.setItem('token_expiry', (Date.now() + 1000 * 60).toString());

      expect(isAuthenticated()).toBe(true);
    });

    it('should return false if token is expired', () => {
      mockedGetCookie.mockReturnValue('mockAccessToken');
      localStorage.setItem('token_expiry', (Date.now() - 1000 * 60).toString());

      expect(isAuthenticated()).toBe(false);
    });
  });

  describe('logout', () => {
    it('should clear cookies, localStorage, and redirect to login', () => {
      const originalLocation = window.location;

      Object.defineProperty(window, 'location', {
        configurable: true,
        value: { href: '' },
      });

      logout();

      expect(mockedRemoveCookie).toHaveBeenCalledWith('access_token');
      expect(mockedRemoveCookie).toHaveBeenCalledWith('refresh_token');
      expect(mockedRemoveCookie).toHaveBeenCalledWith('store_id');
      expect(localStorage.getItem('token_expiry')).toBeNull();
      expect(window.location.href).toBe('/login');

      Object.defineProperty(window, 'location', {
        configurable: true,
        value: originalLocation,
      });
    });
  });
});
