import React, { useState, useEffect, useRef } from "react";
import "../../css/hotelPage/actionButton.css";

function ActionButton(props) {
  const [spinner, setSpinner] = useState();

  const clickHandler = () => {
    console.log("clickHandler");
    props.clickFunction();
  };

  const clickHandlerLoader = () => {
    console.log("clickHandlerLoader");
    setSpinner(true);
    setTimeout(() => {
      props.clickFunction();
    }, "1500");
  };

  if (props.loader) {
    return (
      <button
        type="button"
        class={props.narrow ? "action-button-qqb narrow" : "action-button-qqb"}
        onClick={clickHandlerLoader}
      >
        <div className={spinner ? "spinner" : "spinner hidden"} />
        <span
          className={spinner ? "action-button-sk4 hidden" : "action-button-sk4"}
        >
          {props.message}
        </span>
      </button>
    );
  } else {
    return (
      <button type="button" class={props.narrow ? "action-button-qqb narrow" : "action-button-qqb"} onClick={clickHandler}>
        <span className="action-button-sk4">{props.message}</span>
      </button>
    );
  }
}

export default ActionButton;
