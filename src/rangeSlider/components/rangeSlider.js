import React, { useState, useEffect, useRef } from "react";
import DistributionSlider from "./distributionSlider";
import SimpleSlider from "./simpleSlider";
import DiscreteSlider from "./discreteSlider";
import TwoHandleSlider from "./twoHandleSlider";
import "../css/rangeSlider.css";

// range slider portfolio item

function RangeSlider() {

  document.body.style.overflow = "hidden";

  return (
    <>
    <div className="rangeslider-dx3">
      <div className="rangeslider-hy5">
        <div className="rangeslider-ns6">
          <div className="rangeslider-wr4">
          <h2 className="rangeSlider-kz1">simple slider</h2>
          <SimpleSlider / >
            <h2 className="rangeSlider-kz1">two handle slider</h2>
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
