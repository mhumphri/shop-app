import React, { useState, useEffect, useRef } from "react";
import GuestPickerSearchbox from "./guestPickerSearchbox";
import ActionButton from "./actionButton";
import "../../css/hotelPage/floatingSearchbox.css";
const dayjs = require("dayjs");

function FloatingSearchbox(props) {
  const [guestPickerActive, setGuestPickerActive] = useState();
  const dateButtonRef = useRef(null);
  const guestPickerRef = useRef(null);
  const guestButtonRef = useRef(null);

  useEffect(() => {
    function handler(event) {
      if (
        !guestPickerRef.current.contains(event.target) &&
        !guestButtonRef.current.contains(event.target)
      ) {
        setGuestPickerActive(false);
      }
    }
    window.addEventListener("click", handler);
    return () => window.removeEventListener("click", handler);
  }, []);

  // message which summarizes cuurent (room page) guest inputs
  const guestSummaryMsg = () => {
    let newMsg = "add guests";

    const totalGuests = props.guestsData.Adults + props.guestsData.Children;
    if (totalGuests > 0) {
      if (totalGuests === 1) {
        newMsg = totalGuests + " guest";
      } else {
        newMsg = totalGuests + " guests";
      }
      if (props.guestsData.Infants === 1) {
        newMsg += ", 1 infant";
      }
      if (props.guestsData.Infants > 1) {
        newMsg += ", " + props.guestsData.Infants + " infants";
      }
      if (props.guestsData.Pets === 1) {
        newMsg += ", 1 pet";
      }
      if (props.guestsData.Pets > 1) {
        newMsg += ", " + props.guestsData.Pets + " pets";
      }
    }
    return newMsg;
  };

  // handles user clicking "reserve" button - activates spinner and navigates to homepage after timeout
  const navigateHome = () => {
    window.location.href = "/hotel-app";
  };

  return (
    <div class="floating-searchbox-ud8" ref={props.sidebarRef}>
      <div ref={props.floatingSearchInner}>
        <div class="floating-searchbox-c7v">
          <div>
            <div class="floating-searchbox-ati">
              {props.checkinDate && props.checkoutDate ? (
                <span class="floating-searchbox-14y">
                  <div class="floating-searchbox-1jo">
                    <span class="floating-searchbox-tyx">
                      £{props.costs.avePerNight}
                    </span>
                    <span class="floating-searchbox-r1n">&nbsp;per night</span>
                  </div>
                </span>
              ) : (
                <span class="floating-searchbox-14y">
                  <div class="floating-searchbox-1cr">Add dates for prices</div>
                </span>
              )}
            </div>
          </div>
        </div>

        <div class="floating-searchbox-p03">
          <div class="floating-searchbox-cx1">
            <div class="floating-searchbox-jro">
              <button
                ref={dateButtonRef}
                class="floating-searchbox-16l"
                type="button"
                onClick={props.scrollToDatepicker}
              >
                <div class="floating-searchbox-19y">
                  <div class="floating-searchbox-7eq">Check-in</div>
                  {props.checkinDate ? (
                    <div class="floating-searchbox-mgs">
                      {dayjs(props.checkinDate).format("DD/MM/YYYY")}
                    </div>
                  ) : (
                    <div class="floating-searchbox-mgs light-text">
                      Add date
                    </div>
                  )}
                </div>
                <div class="floating-searchbox-48v">
                  <div class="floating-searchbox-7eq">Checkout</div>
                  {props.checkoutDate ? (
                    <div class="floating-searchbox-mgs">
                      {dayjs(props.checkoutDate).format("DD/MM/YYYY")}
                    </div>
                  ) : (
                    <div class="floating-searchbox-mgs light-text">
                      Add date
                    </div>
                  )}
                </div>
              </button>
              <div class="floating-searchbox-t26" />
            </div>
            <div>
              <div class="floating-searchbox-jro">
                <div
                  ref={guestButtonRef}
                  class="floating-searchbox-1gp"
                  role="button"
                  tabindex="0"
                  onClick={() => setGuestPickerActive(true)}
                >
                  <label class="floating-searchbox-13k">
                    <div class="floating-searchbox-7eq">Guests</div>
                    <div class="floating-searchbox-1ek">
                      <div class="floating-searchbox-1ir">
                        <span>{guestSummaryMsg()}</span>
                      </div>
                    </div>
                  </label>
                  <div class="floating-searchbox-lmi">
                    <svg
                      viewBox="0 0 32 32"
                      xmlns="http://www.w3.org/2000/svg"
                      class="floating-searchbox-ks2"
                    >
                      <g fill="none">
                        <path d="m28 12-11.2928932 11.2928932c-.3905243.3905243-1.0236893.3905243-1.4142136 0l-11.2928932-11.2928932"></path>
                      </g>
                    </svg>
                  </div>
                </div>
                <div class="floating-searchbox-t26 bottom" />
              </div>

              <div ref={guestPickerRef}>
                {guestPickerActive ? (
                  <GuestPickerSearchbox
                    setGuestPickerActive={setGuestPickerActive}
                    guestsData={props.guestsData}
                    setGuestsData={props.setGuestsData}
                  />
                ) : null}
              </div>
            </div>
          </div>
        </div>

        <div>
          {props.checkinDate && props.checkoutDate ? (
            <ActionButton
              message={"Reserve"}
              loader={true}
              clickFunction={navigateHome}
            />
          ) : (
            <ActionButton
              message={"Check Availability"}
              clickFunction={props.scrollToDatepicker}
            />
          )}
          {/*


          props.checkinDate && props.checkoutDate ? (
            <button
              type="button"
              class="floating-searchbox-qqb"
              onClick={reserveClickHandler}
            >
              {reserveClickSpinner ? <div className="floating-searchbox-loader" /> :  <span className="floating-searchbox-sk4">Reserve</span>}
            </button>
          ) :

           <button
            type="button"
            class="floating-searchbox-qqb"
            onClick={props.scrollToDatepicker}
          >
            Check Availability
          </button> */}
        </div>
      </div>

      {props.checkinDate && props.checkoutDate ? (
        <div class="floating-searchbox-1wp">
          <section>
            <div class="floating-searchbox-18x">
              <div class="floating-searchbox-1fp">
                <span class="floating-searchbox-18x">
                  <div class="floating-searchbox-10d">
                    <div class="floating-searchbox-m6l">
                      £{props.costs.roomRate} x {props.costs.numberNights}{" "}
                      nights
                    </div>
                  </div>
                </span>
                <span class="floating-searchbox-1k4">
                  £{props.costs.roomCost}
                </span>
              </div>
              <div class="floating-searchbox-1fp">
                <span class="floating-searchbox-18x">
                  <div class="floating-searchbox-10d">
                    <div class="floating-searchbox-m6l">
                      Occupancy taxes and fees
                    </div>
                  </div>
                </span>
                <span class="floating-searchbox-1k4">
                  £{props.costs.taxCost}
                </span>
              </div>
            </div>
            <div class="floating-searchbox-1em">
              <div class="floating-searchbox-1fp bold">
                <span class="floating-searchbox-18x">
                  <div>Total</div>
                </span>
                <span class="floating-searchbox-1k4">
                  £{props.costs.totalCost}
                </span>
              </div>
            </div>
          </section>
        </div>
      ) : null}
    </div>
  );
}

export default FloatingSearchbox;
