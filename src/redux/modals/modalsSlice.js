import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mainModal: false,
  alertmodal: false,
};

const modalsSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    updateMainModal(state, action) {
      state.mainModal = action.payload;
    },
    updateAlertModal(state, action) {
      state.alertmodal = action.payload;
    },
  },
});

export const { updateMainModal, updateAlertModal } = modalsSlice.actions;

export default modalsSlice.reducer;
