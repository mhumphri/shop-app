import React, { useState, useEffect, useRef } from "react";
import SliderButton from "./sliderButton";
import "../css/rangeSlider.css";

// range slider portfolio item

function SimpleSlider() {
  // stores screen position of slider track
  const [trackPosition, setTrackPosition] = useState();

  // stores position of slider button (scale 0  to 100)
  const [buttonPos, setButtonPos] = useState(0);

  // stores position of slider button (scale 0  to 100)
  const [pointerDown, setPointerDown] = useState();

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
  const handleButton = () => {
    window.addEventListener("pointermove", handleDrag);
    setPointerDown(true)
<<<<<<< HEAD
    document.body.style.overflow = "hidden";
    window.addEventListener("pointerup", () => {
      setPointerDown(false)
      document.body.style.overflow = "auto";
=======
    window.addEventListener("pointerup", () => {
      setPointerDown(false)
>>>>>>> 7e4c152e3d704995da218a1da903bfa6a1e248af
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
        <div class="rangeslider-jn7">
          <div class="rangeslider-ty3" ref={sliderTrack}></div>
          <div class="rangeslider-af3">
            <SliderButton buttonPos={buttonPos} handleDrag={handleDrag} />
          </div>
          <div
            class="rangeslider-vs7"
            style={{ left: "0%", width: buttonPos + "%" }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default SimpleSlider;
