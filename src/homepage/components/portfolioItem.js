import React from "react";
import { useDispatch } from "react-redux";
import { updateMainModal } from "../../redux/modals/modalsSlice";
import TestImg1 from "../images/testImg1.jpg";

import "../css/portfolioItem.css";

function PortfolioItem(props) {
  const dispatch = useDispatch();

  const innerButton = [
    <div className="portfolioitem-tz4">
      {props.name ? (
        <div className="portfolioitem-ja2">{props.name}</div>
      ) : null}
      <img className="portfolioitem-uc3" alt="test" src={TestImg1} />
    </div>,
  ];

  if (props.href) {
    return (
      <a href="/rangeSlider" className="portfolioitem-ie3">
        {innerButton}
      </a>
    );
  }

  else if (props.modal) {
    return (
      <button
        onClick={() => dispatch(updateMainModal(props.modal))}
        className="portfolioitem-ie3"
      >
        {innerButton}
      </button>
    );
  }
   else {
    return <div className="portfolioitem-ie3 auto-pointer">{innerButton}</div>;
  }
}

export default PortfolioItem;
