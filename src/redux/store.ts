import { configureStore } from '@reduxjs/toolkit';

import authReducer from './authSlice';
import uiReducer from './uiSlice';
import menuReducer from './menuSlice';

/**
 * Configures the Redux store by combining reducers for authentication, UI state, and menu data.
 */
const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    menu: menuReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
