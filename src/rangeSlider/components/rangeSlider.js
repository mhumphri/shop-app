import React, { useState, useEffect, useRef } from "react";
import DistributionSlider from "./distributionSlider";
import SimpleSlider from "./simpleSlider";
import DiscreteSlider from "./discreteSlider";
import TwoHandleSlider from "./twoHandleSlider";
import "../css/rangeSlider.css";

// range slider portfolio item

function RangeSlider() {



  return (
    <>
    <div className="rangeslider-dx3">
      <div className="rangeslider-hy5">
        <div className="rangeslider-ns6">
          <div className="rangeslider-wr4">
          <h2 className="rangeSlider-kz1">simple slider</h2>
          <SimpleSlider / >
<<<<<<< HEAD
            <h2 className="rangeSlider-kz1">two handle slider</h2>
=======
            <h2 className="rangeSlider-kz1">2 handle slider</h2>
>>>>>>> 7e4c152e3d704995da218a1da903bfa6a1e248af
            <TwoHandleSlider / >
            <h2 className="rangeSlider-kz1">discrete slider</h2>
            <DiscreteSlider / >

          </div>
          <h2 className="rangeSlider-kz1">data distribution slider</h2>
          <DistributionSlider / >
          </div>
          </div>
        </div>
    </>
  );
}

export default RangeSlider;
