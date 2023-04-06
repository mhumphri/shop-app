import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  screenWidth: false,
  screenHeight: false,
  visualVpHeight: 50,
  largeView: false,
};

const deviceDataSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    updateScreenDimensions(state, action) {
      state.screenWidth = action.payload.width;
      state.screenHeight = action.payload.height;
      state.visualVpHeight = action.visualVpHeight;
      if (state.screenWidth > 767) {
        state.largeView = true;
      } else {
        state.largeView = false;
      }
    },
  },
});

export const { updateScreenDimensions } = deviceDataSlice.actions;

export default deviceDataSlice.reducer;
