// import React, { useState, useEffect, useRef } from "react";
import React, { useRef } from "react";
import "../../css/hotelPage/indReview.css";

function IndReview(props) {
  const reviewText = useRef(null);
  // true if text exceeds x lines and "show more" button is enabled
  // const [boxOverflow, setBoxOverflow] = useState();

/*
  function countLines() {
    let lineLimit = 5;
    if (props.modal) {
      lineLimit = 15;
    } else if (props.largeView) {
      lineLimit = 3;
    }

    var divHeight = reviewText.current.offsetHeight;
    var lineHeight = 24;
    var lines = divHeight / lineHeight;
    if (lines >= lineLimit) {
      setBoxOverflow(true);
    }
  }


  useEffect(() => {
    countLines();
  }, []);
  */

  /* returns render of text and line breaks in response to array of text and false (for line break) elements */
  const textRender = (textArray) => {
    let newText = [];
    for (let i = 0; i < textArray.length; i++) {
      if (!textArray[i]) newText.push(<br />);
      else if (textArray[i].header) {
        newText.push(
          <span className="description-1di">{textArray[i].header}</span>
        );
      } else {
        newText.push(textArray[i]);
      }
    }
    return newText;
  };

  return (
    <div role="listitem" class="ind-review-162">
      <div>
        <div class="ind-review-chn">
          <div class="ind-review-t9g">
            <h3 tabindex="-1" class="ind-review-14i" elementtiming="LCP-target">
              {props.data.userName}
            </h3>
            <div class="ind-review-s11">(August 2022)</div>
          </div>
        </div>
      </div>
      <div>
        {/*
          <div style={boxOverflow ? {
            lineHeight: "24px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: "3",
            MozBoxOrient: "vertical",
          } : {
            lineHeight: "24px"}}> */}
        <div
          style={{
            lineHeight: "24px",
          }}
        >
          <span>
            <span ref={reviewText}>{textRender(props.data.text)}</span>
          </span>
        </div>
      </div>
      {/* boxOverflow ?
          <div class="ind-review-s17">
            <button
              type="button"
              class="ind-review-15r"
              onClick={props.showMore}
            >
              <span class="ind-review-atm">
                <span>Show more</span>
                <span class="ind-review-atm2">
                  <svg
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                    class="ind-review-kk2"
                    aria-hidden="true"
                    role="presentation"
                    focusable="false"
                  >
                    <g fill="none">
                      <path d="m12 4 11.2928932 11.2928932c.3905243.3905243.3905243 1.0236893 0 1.4142136l-11.2928932 11.2928932"></path>
                    </g>
                  </svg>
                </span>
              </span>
            </button>
          </div> : null  */}
    </div>
  );
}

export default IndReview;
