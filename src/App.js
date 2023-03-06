import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import TopNav from "./navs/components/topNav";
import PortfolioList from "./homepage/components/portfolioList";
import RangeSlider from "./rangeSlider/components/rangeSlider";
import Modal from "./modal/components/modal";

function App() {
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
                    path="/rangeSlider"
                    element={
                      <>
                      <TopNav />
                      <RangeSlider />
                      </>
                    }
                  />
                </Routes>
    <Modal />
    </Router>
  );
}

export default App;
