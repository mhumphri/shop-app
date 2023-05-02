import React, { useState, useEffect, useRef } from "react";
import "../css/sliderButton.css";

// range slider portfolio item

function SliderButton(props) {



  // stores position of slider button (scale 0  to 100)
  const [buttonHover, setButtonHover] = useState();




  // set buttonHover to true when onMouseEnter fires
  const handleMouseEnter = () => {
    setButtonHover(true)
  };

// set buttonHover to false when onMouseleave fires
  const handleMouseLeave = () => {
    setButtonHover(false)
  };

  return (
    <>
    <button
      type="button"
      className={props.narrowTrack ? "rangeslider-pu5 narrow-track" : "rangeslider-pu5" }
      role="slider"
      style={{
        left: props.buttonPos + "%",
        position: "absolute",
      }}

      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
 {props.labelDisabled ? null : <div className={props.buttonDrag || buttonHover ? "rangeslider-ja5" : "rangeslider-ja5 hidden" }>{props.buttonPos.toFixed(0)}</div> }
    </button>

    </>
  );
}

export default SliderButton;
