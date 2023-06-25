import React, { useState, useEffect } from "react";
import ActionButton from "./actionButton";
import "../../css/hotelPage/floatingFooter.css";
const dayjs = require("dayjs");


function FloatingFooter(props) {


  const [datesSet, setDatesSet] = useState();
  const [datesRender, setDatesRender] = useState();


  useEffect(() => {

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
                    £{props.costs.avePerNight}
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
          </div>
        );
      }
    };

    setDatesRender(getDatesRender());
  }, [props.storedCheckin, props.storedCheckout, props.costs.avePerNight]);

  return (
    <div class="floating-footer-v3p">
      <div class="floating-footer-1fh">
        <div class="floating-footer-le6">
          <div class="floating-footer-plm">
            <div class="floating-footer-1ew">
              <div class="floating-footer-19a">
                {datesRender}
                <div>
                  {datesSet ? (<ActionButton message={"Reserve"} loader={true} clickFunction={props.navigateHome} narrow={props.screenWidth<410 ? true : false} />)
                  :
                  (<ActionButton message={"Check Availability"} clickFunction={props.scrollToDatepicker} narrow={props.screenWidth<410 ? true : false} />) }




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
