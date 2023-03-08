import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TopNav from "./navs/components/topNav";
import PortfolioList from "./homepage/components/portfolioList";
import RangeSlider from "./rangeSlider/components/rangeSlider";
import Modal from "./modal/components/modal";

function App() {
  const mainModal = useSelector((state) => state.modals.mainModal);

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
          path="/:itemName"
          element={
            <>
              <TopNav />
              <RangeSlider />
            </>
          }
        />
      </Routes>
      {mainModal ? <Modal /> : null}
    </Router>
  );
}

export default App;
