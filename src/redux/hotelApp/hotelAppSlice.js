import { createSlice } from "@reduxjs/toolkit";
import getHotelArrayInit from "../../hotelApp/functions/getHotelArrayInit";

const initialState = {
  hotelArray: getHotelArrayInit(),
  navigateAway: false,
  savedMapData: {},
  mapBbox: false,
  numberHotels: 1000,
  maxPages: false,
  activePage: 1,
  searchLocation: {name: ""},
};

const modalsSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    updateHotelArray(state, action) {
      state.hotelArray = action.payload;
    },
    updateNavigateAway(state, action) {
      state.navigateAway = action.payload;
    },
    updateSavedMapData(state, action) {
      state.savedMapData = action.payload;
    },
    updateMapBbox(state, action) {
      state.mapBbox = action.payload;
    },
    updateNumberHotels(state, action) {
      state.numberHotels = action.payload;
    },
    updateMaxPages(state, action) {
      state.maxPages = action.payload;
    },
    updateActivePage(state, action) {
      state.activePage = action.payload;
    },
    updateSearchLocationRedux(state, action) {
      state.searchLocation = action.payload;
    },
  },
});

export const { updateHotelArray, updateNavigateAway, updateSavedMapData, updateMapBbox, updateNumberHotels, updateMaxPages, updateActivePage, updateSearchLocationRedux } = modalsSlice.actions;

export default modalsSlice.reducer;
