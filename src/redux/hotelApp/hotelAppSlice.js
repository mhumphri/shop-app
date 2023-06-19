import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hotelArray: [],
};

const modalsSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    updateHotelArray(state, action) {
      state.hotelArray = action.payload;
    },
  },
});

export const { updateHotelArray } = modalsSlice.actions;

export default modalsSlice.reducer;
