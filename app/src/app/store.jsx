import { configureStore } from '@reduxjs/toolkit';
import appReducer from '../features/AppSlice.jsx'

export const store = configureStore({
    reducer: {
      app: appReducer
    },
  });