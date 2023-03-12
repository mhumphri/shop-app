import React, { useState, useEffect, useRef } from "react";
import "../css/sliderButton.css";

// range slider portfolio item

function SliderButton(props) {

  // stores position of slider button (scale 0  to 100)
  const [pointerDown, setPointerDown] = useState();

  // stores position of slider button (scale 0  to 100)
  const [buttonHover, setButtonHover] = useState();

  // sets & removes pointermove event listener when slider button is dragged
  const handleButton = () => {
    window.addEventListener("pointermove", props.handleDrag);
    setPointerDown(true)
    window.addEventListener("pointerup", () => {
      setPointerDown(false)
      window.removeEventListener("pointermove", props.handleDrag);
    });
  };


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
      className="rangeslider-pu5"
      role="slider"
      style={{
        left: props.buttonPos + "%",
        position: "absolute",
      }}
      onPointerDown={handleButton}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
 {props.labelDisabled ? null : <div className={pointerDown || buttonHover ? "rangeslider-ja5" : "rangeslider-ja5 hidden" }>{props.buttonPos.toFixed(0)}</div> }
    </button>

    </>
  );
}

export default SliderButton;
