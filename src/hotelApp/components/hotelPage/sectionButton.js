import React, { useState, useEffect, useRef } from "react";
import "../../css/hotelPage/sectionButton.css";


function SectionButton(props) {

  return (
    <button
      type="button"
      class="section-button-b65"
      onClick={props.click}
    >
      {props.message}
    </button>
)
}


export default SectionButton;
