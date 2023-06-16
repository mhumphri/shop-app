import React, { useState, useEffect, useRef } from "react";
import "../../css/hotelPage/floatingFooter.css";
import calcCosts from "./functions/calcCosts";
const dayjs = require("dayjs");

function FloatingFooter(props) {
  const getDatesRender = () => {
    let newText;
    if (props.storedCheckin && props.storedCheckout) {
      setDatesSet(true);
      const checkinMonth = dayjs(props.storedCheckin).format("MMM");
      const checkoutMonth = dayjs(props.storedCheckout).format("MMM");
      if (checkinMonth === checkoutMonth) {
        newText =
          dayjs(props.storedCheckin).format("D") +
          "-" +
          dayjs(props.storedCheckout).format("D") +
          " " +
          checkinMonth;
      } else {
        newText =
          dayjs(props.storedCheckin).format("D") +
          " " +
          checkinMonth +
          "-" +
          dayjs(props.storedCheckout).format("D") +
          " " +
          checkoutMonth;
      }
      return (
        <div class="floating-footer-754">
          <div class="floating-footer-ati">
            <span class="floating-footer-14y">
              <div class="floating-footer-1jo" aria-hidden="true">
                <span class="floating-footer-tyx">
                  £25{/*£[calcCosts().perNight]*/}
                </span>
                <span class="floating-footer-r1n">&nbsp;night</span>
              </div>
            </span>
          </div>

          <div class="floating-footer-1ir">
            <button type="button" class="floating-footer-15r">
              {newText}
            </button>
          </div>
        </div>
      );
    } else {
      setDatesSet(false);
      return (
        <div class="floating-footer-754">
          <div>
            <div class="floating-footer-ati">
              <span class="floating-footer-14y">
                <div class="floating-footer-1cr">Add dates for prices</div>
              </span>
            </div>
          </div>
          <div class="floating-footer-176">
            <span class="floating-footer-1pg">
              <span>
                <svg
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                  class="floating-footer-sg8"
                  aria-hidden="true"
                  role="presentation"
                  focusable="false"
                >
                  <path
                    d="M15.094 1.579l-4.124 8.885-9.86 1.27a1 1 0 0 0-.542 1.736l7.293 6.565-1.965 9.852a1 1 0 0 0 1.483 1.061L16 25.951l8.625 4.997a1 1 0 0 0 1.482-1.06l-1.965-9.853 7.293-6.565a1 1 0 0 0-.541-1.735l-9.86-1.271-4.127-8.885a1 1 0 0 0-1.814 0z"
                    fill-rule="evenodd"
                  ></path>
                </svg>
              </span>
              <span class="floating-footer-12s" aria-hidden="true">
                {props.data.rating}
              </span>
            </span>
          </div>
        </div>
      );
    }
  };

  const [datesSet, setDatesSet] = useState();
  const [datesRender, setDatesRender] = useState();


  useEffect(() => {
    setDatesRender(getDatesRender());
  }, [props.storedCheckin, props.storedCheckout]);

  return (
    <div class="floating-footer-v3p">
      <div class="floating-footer-1fh">
        <div class="floating-footer-le6">
          <div class="floating-footer-plm">
            <div class="floating-footer-1ew">
              <div class="floating-footer-19a">
                {datesRender}
                <div>
                  {datesSet ? (
                    <button
                      type="button"
                      class="floating-footer-108"
                      onClick={props.navigateHome}
                    >
                      Reserve
                    </button>
                  ) : (
                    <button
                      type="button"
                      class="floating-footer-108"
                      onClick={props.scrollToDatePicker}
                    >
                        Check availability
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FloatingFooter;
