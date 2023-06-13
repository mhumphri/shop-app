import React, { useState, useEffect, useRef } from "react";
import SliderButton from "./sliderButton";
import "../css/rangeSlider.css";

// simple range slider

function SimpleSlider(props) {

  // stores position of slider button (scale 0  to 100)
  const [buttonPos, setButtonPos] = useState(props.sliderPositionInit ? props.sliderPositionInit : 0);

  // ref for slider track
  const sliderTrack = useRef(null);

  // drag event listener (sets button position on load)
  const handleButton = (e) => {
    const trackPosition = sliderTrack.current.getBoundingClientRect();
    // calcs new button position (resulting from pointer down) on track as % (0%=LHS bound and 100%=RHS bound)
    let newButtonPos = ((e.clientX - trackPosition.left) / trackPosition.width) * 100;
    // update button position in this component
    setButtonPos(newButtonPos);
    // update button position in parent component
    if (props.updateSliderPosition) {
      props.updateSliderPosition(newButtonPos);
    }
    window.addEventListener("pointermove", handleDrag);
    // props.setSimpleDrag(true);
    window.addEventListener("pointerup", () => {
      // props.setSimpleDrag(false);
      window.removeEventListener("pointermove", handleDrag);
    });
  };

  // updates buttonPos in response to drag of slider button
  const handleDrag = (e) => {
    const trackPosition = sliderTrack.current.getBoundingClientRect();
    // calcs new button position (resulting from drag) on track as % (0%=LHS bound and 100%=RHS bound)
    let newButtonPos =
      ((e.clientX - trackPosition.left) / trackPosition.width) * 100;
    // if new button position is less than 0% (i.e. off the LHS of the track), button position state is set to 0
    if (newButtonPos < 1) {
      newButtonPos = 0;
    }
    // if new button position is greater than than 100% (i.e. off the RHS of the track), button position state is set to 100
    else if (newButtonPos > 100) {
      newButtonPos = 100;
    }
    // update button position in this component
    setButtonPos(newButtonPos);
    // update button position in parent component
    if (props.updateSliderPosition) {
      props.updateSliderPosition(newButtonPos);
    }
  };

  return (
    <div class={props.labelDisabled ? "rangeslider-ll3" : "rangeslider-hc7"}>
      <div>
        <div class="rangeslider-jn7">
          <div class="rangeslider-ty3" ref={sliderTrack}></div>

          <div
            class="rangeslider-vs7"
            style={{ left: "0%", width: buttonPos + "%" }}
          ></div>
          <div class="rangeslider-af3" onPointerDown={handleButton}>
            <SliderButton
              buttonPos={buttonPos}
              handleDrag={handleDrag}
              buttonDrag={props.simpleDrag}
              labelDisabled={props.labelDisabled}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SimpleSlider;
