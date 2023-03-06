import React from "react";
import PortfolioItem from "./portfolioItem";
import "../css/portfolioList.css";

function PortfoiloList() {
  return (
    <div className="portfoliolist-yu1">
      <div className="portfoliolist-ap7">
        <div className="portfoliolist-pp6">
          <PortfolioItem />
          <PortfolioItem />
          <PortfolioItem />
          <PortfolioItem />
        </div>
      </div>
    </div>
  )
}

export default PortfoiloList;
