import { configureStore } from '@reduxjs/toolkit';
import modalsSlice from './modals/modalsSlice';
import deviceDataSlice from './deviceData/deviceDataSlice';

export const store = configureStore({
  reducer: {
    modals: modalsSlice,
    deviceData: deviceDataSlice,
  },
});
