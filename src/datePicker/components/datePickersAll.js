import React, { useState } from "react";
import DatePicker from "./datePicker";
import SimpleSlider from "../../rangeSlider/components/simpleSlider";
import "../css/datePickersAll.css";

// renders list of individual portfolio items in a grid

function DatePickersAll() {
  // boolean showing true if the relevant slider is currently dragging
  const [simpleDrag, setSimpleDrag] = useState();
  //
  const [mobileViewWidth, setMobileViewWidth] = useState(300);
  //
  const [largeViewWidth, setLargeViewWidth] = useState(300);

  const [doublePanelWidth, setDoublePanelWidth] = useState(600);

  const updateMobileViewWidth = (newSliderPosition) => {
    const newMobileViewWidth = 300 + Math.ceil(newSliderPosition*2.5)
    setMobileViewWidth(newMobileViewWidth)
  }

  const updateLargeViewWidth = (newSliderPosition) => {
    const newLargeViewWidth = 300 + Math.ceil(newSliderPosition*4)
    setLargeViewWidth(newLargeViewWidth)
  }

  const updateDoublePanelWidth = (newSliderPosition) => {
    const newDoublePanelWidth =600 + Math.ceil(newSliderPosition*8)
    setDoublePanelWidth(newDoublePanelWidth)
  }

  return (
    <main className="date-pickers-all-yu1">
    <h2 className="date-pickers-all-ps2">mobile view (vertical axis)</h2>
    <div className="date-pickers-all-hs1">
    <div className="date-pickers-all-ta1">width: {mobileViewWidth}px</div>
    <SimpleSlider
      simpleDrag={simpleDrag}
      setSimpleDrag={setSimpleDrag}
      sliderPositionInit={0}
      updateSliderPosition={updateMobileViewWidth}
      labelDisabled={true}
    />
    </div>
     <div className="date-pickers-all-re2" style={{width: mobileViewWidth + "px"}}>

  <DatePicker width={mobileViewWidth} />

    </div>


 <h2 className="date-pickers-all-ps2">standard view - single panel</h2>
    <div className="date-pickers-all-hs1">
    <div className="date-pickers-all-ta1">width: {largeViewWidth}px</div>
    <SimpleSlider
      simpleDrag={simpleDrag}
      setSimpleDrag={setSimpleDrag}
      sliderPositionInit={0}
      updateSliderPosition={updateLargeViewWidth}
      labelDisabled={true}
    />
    </div>
  <div className="date-pickers-all-re3" style={{width: largeViewWidth + "px"}}>
    <DatePicker width={largeViewWidth} largeView={true} />
   </div>
   <h2 className="date-pickers-all-ps2">standard view - double panel</h2>
   <div className="date-pickers-all-hs1">
   <div className="date-pickers-all-ta1">width: {doublePanelWidth}px</div>
   <SimpleSlider
     simpleDrag={simpleDrag}
     setSimpleDrag={setSimpleDrag}
     sliderPositionInit={0}
     updateSliderPosition={updateDoublePanelWidth}
     labelDisabled={true}
   />
   </div>
 <div className="date-pickers-all-re3" style={{width: doublePanelWidth + "px"}}>
   <DatePicker width={doublePanelWidth} largeView={true} doublePanel={true} />
  </div>



    </main>
  );
}

export default DatePickersAll;
