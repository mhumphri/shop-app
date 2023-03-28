import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { updateScreenDimensions } from "./redux/deviceData/deviceDataSlice";
import TopNav from "./navs/components/topNav";
import PortfolioList from "./homepage/components/portfolioList";
import RangeSlider from "./rangeSlider/components/rangeSlider";
import SearchMap from "./searchMap/components/searchMap";
import Modal from "./modal/components/modal";

function App() {

  const dispatch = useDispatch();

  // main modal state (stored in redux)
  const mainModal = useSelector((state) => state.modals.mainModal);

  // stores current screenwidth in redux
  const updateScreenWidth = () => {
    dispatch(updateScreenDimensions({width: window.innerWidth, height: window.innerHeight}));
  };

  // stores screen width when component loads
  updateScreenWidth();

  /* listens for screen re-size and updates screen width variable */
  useEffect(() => {
    window.addEventListener("resize", () => {
      updateScreenWidth();
    });
    return () => {
      window.removeEventListener("resize", () => {
        updateScreenWidth();
      });
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <TopNav />
              <PortfolioList />
            </>
          }
        />
        <Route
          path="/range-slider"
          element={
            <>
              <TopNav narrow={true} />
              <RangeSlider />
            </>
          }
        />
        <Route
          path="/search-map"
          element={
            <>
              <TopNav narrow={true} />
              <SearchMap />
            </>
          }
        />
      </Routes>
      {mainModal ? <Modal /> : null}
    </Router>
  );
}

export default App;
