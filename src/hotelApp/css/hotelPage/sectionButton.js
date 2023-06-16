import React, { useState, useEffect, useRef } from "react";


function SectionButton(props) {

  return (
    <button
      data-testid="pdp-show-all-reviews-button"
      aria-label="Show all 34 reviews, Opens modal dialog"
      type="button"
      class={props.largeView ? "b65jmrv v7aged4 dir dir-ltr" : "b65jmrv bgpdp7p v7aged4 dir dir-ltr"}
      onClick={props.click}
    >
      {props.message}
    </button>
)
}


export default SectionButton;
