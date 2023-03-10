import React from "react";
import { useDispatch } from "react-redux";
import { updateMainModal } from "../../redux/modals/modalsSlice";
import TestImg1 from "../images/testImg1.jpg";

import "../css/portfolioItem.css";

<<<<<<< HEAD
// renders individual portfolio item either as link, button (for modal) or simple div

function PortfolioItem(props) {

  // redux hook for dispatching data
  const dispatch = useDispatch();

  // render of inner content
  const innerContent = [
=======
function PortfolioItem(props) {
  const dispatch = useDispatch();

  const innerButton = [
>>>>>>> adf875df92158750b667a3e300d8915afbdffb2d
    <div className="portfolioitem-tz4">
      {props.name ? (
        <div className="portfolioitem-ja2">{props.name}</div>
      ) : null}
      <img className="portfolioitem-uc3" alt="test" src={TestImg1} />
    </div>,
  ];

<<<<<<< HEAD
  // if props.href is true link is rendered
  if (props.href) {
    return (
      <a href="/rangeSlider" className="portfolioitem-ie3">
        {innerContent}
=======
  if (props.href) {
    return (
      <a href="/rangeSlider" className="portfolioitem-ie3">
        {innerButton}
>>>>>>> adf875df92158750b667a3e300d8915afbdffb2d
      </a>
    );
  }

<<<<<<< HEAD
  // if props.modal is true button is rendered
=======
>>>>>>> adf875df92158750b667a3e300d8915afbdffb2d
  else if (props.modal) {
    return (
      <button
        onClick={() => dispatch(updateMainModal(props.modal))}
        className="portfolioitem-ie3"
      >
<<<<<<< HEAD
        {innerContent}
      </button>
    );
  }
  // else div is rendered
   else {
    return <div className="portfolioitem-ie3 auto-pointer">{innerContent}</div>;
=======
        {innerButton}
      </button>
    );
  }
   else {
    return <div className="portfolioitem-ie3 auto-pointer">{innerButton}</div>;
>>>>>>> adf875df92158750b667a3e300d8915afbdffb2d
  }
}

export default PortfolioItem;
