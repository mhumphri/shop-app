import { configureStore } from '@reduxjs/toolkit';
import modalsSlice from './modals/modalsSlice';

export const store = configureStore({
  reducer: {
    modals: modalsSlice,
  },
});
