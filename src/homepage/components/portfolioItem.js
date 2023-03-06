import React from "react";
import TestImg1 from "../images/testImg1.jpg";

import "../css/portfolioItem.css";

function PortfolioItem() {
  return (
    <a href="/rangeSlider" className="portfolioitem-ie3">
      <div className="portfolioitem-tz4">
        <div className="portfolioitem-ja2">range slider</div>
        <img className="portfolioitem-uc3" alt="test" src={TestImg1} />
      </div>
    </a>
  );
}

export default PortfolioItem
