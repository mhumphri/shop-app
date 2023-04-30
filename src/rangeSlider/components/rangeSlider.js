import React, { useState, useEffect, useRef } from "react";
import DistributionSlider from "./distributionSlider";
import SimpleSlider from "./simpleSlider";
import DiscreteSlider from "./discreteSlider";
import TwoHandleSlider from "./twoHandleSlider";
import "../css/rangeSlider.css";

// range slider portfolio item

function RangeSlider() {

  // boolean showing true if the relevant slider is currently dragging
  const [simpleDrag, setSimpleDrag] = useState();
  const [discreteDrag, setDiscreteDrag] = useState();
  const [twoHandleLeftDrag, setTwoHandleLeftDrag] = useState();
  const [twoHandleRightDrag, setTwoHandleRightDrag] = useState();
  const [distributionLeftDrag, setDistributionLeftDrag] = useState();
  const [distributionRightDrag, setDistributionRightDrag] = useState();


/*
  useEffect(() => {
if (simpleDrag || discreteDrag || twoHandleLeftDrag || twoHandleRightDrag || distributionLeftDrag || distributionRightDrag) {
  // document.body.style.overflow = "hidden";
  console.log("NO SCROLLING")
}
else {
  // document.body.style.overflow = "auto";
  console.log("SCROLLING")
}
}, [simpleDrag, discreteDrag, twoHandleLeftDrag, twoHandleRightDrag, distributionLeftDrag, distributionRightDrag]);
*/

  return (
    <>
    <div className="rangeslider-dx3">
      <div className="rangeslider-hy5">
        <div className="rangeslider-ns6">
          <div className="rangeslider-wr4">
          <h2 className="rangeSlider-kz1">simple slider</h2>
          <SimpleSlider simpleDrag={simpleDrag} setSimpleDrag={setSimpleDrag} / >
            <h2 className="rangeSlider-kz1">discrete slider</h2>
            <DiscreteSlider discreteDrag={discreteDrag} setDiscreteDrag={setDiscreteDrag}  / >
            <h2 className="rangeSlider-kz1">two handle slider</h2>
            <TwoHandleSlider twoHandleLeftDrag={twoHandleLeftDrag} setTwoHandleLeftDrag={setTwoHandleLeftDrag} twoHandleRightDrag={twoHandleRightDrag} setTwoHandleRightDrag={setTwoHandleRightDrag} / >


          </div>
          <h2 className="rangeSlider-kz1">data distribution slider</h2>
          <DistributionSlider distributionLeftDrag={distributionLeftDrag} setDistributionLeftDrag={setDistributionLeftDrag} distributionRightDrag={distributionRightDrag} setDistributionRightDrag={setDistributionRightDrag}  / >
          </div>
          </div>
        </div>
    </>
  );
}

export default RangeSlider;
