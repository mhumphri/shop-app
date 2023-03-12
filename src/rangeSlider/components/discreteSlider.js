import React, { useState, useEffect, useRef } from "react";
import SliderButton from "./sliderButton";
import "../css/rangeSlider.css";
import "../css/discreteSlider.css";

// range slider portfolio item

function DiscreetSlider() {
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
    window.addEventListener("pointerup", () => {
      setPointerDown(false)
      window.removeEventListener("pointermove", handleDrag);
    });
  };

  // updates buttonPos in response to drag of left slider button
  const handleDrag = (e) => {
    let newButtonPos =
      ((e.clientX - trackPosition.left) / trackPosition.width) * 100;

      if (newButtonPos < 0) {
        setButtonPos(0)
      }
      else if (newButtonPos > 100) {
        setButtonPos(100)
      }
      else {
        setButtonPos(Math.round(newButtonPos/10)*10)
      }

  };

  return (
    <div class="rangeslider-hc7">
      <div>
        <div class="rangeslider-jn7">
          <div class="rangeslider-ty3 wide" ref={sliderTrack} />
            <div
              class="rangeslider-vs7 wide"
              style={{ left: "0%", width: buttonPos + "%" }}
            ></div>

          {[0,10,20,30,40,50,60,70,80,90,100].map(x => <div style={{ left: x + "%"  }}className={buttonPos < x ? "rangeslider-hn2" : "rangeslider-hn2 on"} />)}

          <div class="rangeslider-af3">

            <SliderButton buttonPos={buttonPos} handleDrag={handleDrag} />

          </div>


        </div>
      </div>
    </div>
  );
}

export default DiscreetSlider;
