import React, { useState, useEffect, useRef } from "react";
import SliderButton from "./sliderButton";
import "../css/rangeSlider.css";

// range slider portfolio item

function SimpleSlider(props) {
  // stores screen position of slider track
  const [trackPosition, setTrackPosition] = useState();

  // stores position of slider button (scale 0  to 100)
  const [buttonPos, setButtonPos] = useState(0);

  // ref for slider track
  const sliderTrack = useRef(null);

  // initialses sliderTrack on load and updates at screen resize events
  useEffect(() => {
    // initialises sliderTrack on load
    setTrackPosition(sliderTrack.current.getBoundingClientRect());
    // screen resize event listener
    window.addEventListener("resize", () => {
      setTrackPosition(sliderTrack.current.getBoundingClientRect());
    });
    return () => {
      // removes event listener
      window.removeEventListener("resize", () => {
        setTrackPosition(sliderTrack.current.getBoundingClientRect());
      });
    };
  }, []);



  // sets & removes pointermove event listener when slider button is dragged
  const handleButton = (e) => {
    e.preventDefault();
    console.log("E: " + e)
    let newButtonPos =
      ((e.clientX - trackPosition.left) / trackPosition.width) * 100;
      setButtonPos(newButtonPos);
    window.addEventListener("pointermove", handleDrag);
    props.setSimpleDrag(true)
    window.addEventListener("pointerup", () => {
      props.setSimpleDrag(false)
      window.removeEventListener("pointermove", handleDrag);
    });
  };

  // updates buttonPos in response to drag of left slider button
  const handleDrag = (e) => {
    let newButtonPos =
      ((e.clientX - trackPosition.left) / trackPosition.width) * 100;

    if (newButtonPos < 0) {
      newButtonPos = 0;
    } else if (newButtonPos > 100) {
      newButtonPos = 100;
    }
    console.log("newButtonPos: " + newButtonPos);
    setButtonPos(newButtonPos);
  };

  return (
    <div class="rangeslider-hc7">
      <div>
        <div class="rangeslider-jn7" >
          <div class="rangeslider-ty3" ref={sliderTrack}></div>

          <div
            class="rangeslider-vs7"
            style={{ left: "0%", width: buttonPos + "%" }}
          ></div>
          <div class="rangeslider-af3" onPointerDown={handleButton}>
            <SliderButton buttonPos={buttonPos} handleDrag={handleDrag} buttonDrag={props.simpleDrag} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SimpleSlider;
