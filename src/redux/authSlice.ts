import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { createToken, logout } from '../services/authService';
import { setCookie } from '../utils/cookiesUtils';
import labels from '../utils/labels';

interface AuthState {
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
};

/**
 * Async thunk to handle user login.
 * @param username - The user's username.
 * @param password - The user's password.
 * @returns A promise resolving to the access token.
 */
export const performLogin = createAsyncThunk(
  'auth/performLogin',
  async ({ username, password }: { username: string; password: string }, thunkAPI) => {
    try {
      const token = await createToken(username, password);
      setCookie('access_token', token, 1);
      return token;
    } catch (error) {
      return thunkAPI.rejectWithValue(labels.errors.loginFailed);
    }
  }
);

/**
 * Authentication slice for managing authentication state.
 */
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state) => {
      state.isAuthenticated = true;
    },
    logoutSuccess: (state) => {
      state.isAuthenticated = false;
      logout();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(performLogin.fulfilled, (state) => {
        state.isAuthenticated = true;
      });
  },
});

export const { loginSuccess, logoutSuccess } = authSlice.actions;
export default authSlice.reducer;
