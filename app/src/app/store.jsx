import { configureStore } from '@reduxjs/toolkit';
import appReducer from '../features/AppSlice.jsx'
import bookReducer from '../features/BooksSlice.jsx'

export const store = configureStore({
    reducer: {
      app: appReducer,
      books: bookReducer
    },
  });