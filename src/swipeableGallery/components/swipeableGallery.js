import React from "react";
import { useDispatch } from "react-redux";
import { updateMainModal } from "../../redux/modals/modalsSlice";

import "../css/swipeableGallery.css";

// renders individual portfolio item either as a swipable photo gallry with progress indicator

function SwipeableGallery(props) {

  // redux hook for dispatching data
  const dispatch = useDispatch();

  // render of inner content
  const innerContent = [
    <div className="portfolioitem-tz4">
      {props.name ? (
        <div className="portfolioitem-ja2">{props.name}</div>
      ) : null}
      <img className="portfolioitem-uc3" alt="alt" src={props.image} />
    </div>,
  ];

  // if props.href is true link is rendered
  if (props.href) {
    return (
      <a href="/rangeSlider" className="portfolioitem-ie3">
        {innerContent}
      </a>
    );
  }

  // if props.modal is true button is rendered
  else if (props.modal) {
    return (
      <button
        onClick={() => dispatch(updateMainModal(props.modal))}
        className="portfolioitem-ie3"
      >
        {innerContent}
      </button>
    );
  }
  // else div is rendered
   else {
    return <div className="portfolioitem-ie3 auto-pointer">{innerContent}</div>;
  }
}

export default SwipeableGallery;
