import React, { useState } from "react";
import ActionButton from "./actionButton";
import "../../css/hotelPage/scrollNav.css";

function ScrollNav(props) {
  const [scrollNavActive, setScrollNavActive] = useState();
  const [scrollNavRHSActive, setScrollNavRHSActive] = useState();



  React.useEffect(() => {

    const handleScroll = () => {
      if (props.middleContentBox.current.getBoundingClientRect().top < 0) {
        setScrollNavActive(true);
      } else {
        setScrollNavActive(false);
      }

      if (props.floatingSearchInner.current.getBoundingClientRect().bottom < 80) {
        setScrollNavRHSActive(true);
      } else {
        setScrollNavRHSActive(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [props.middleContentBox, props.floatingSearchInner]);

  const navOption = (scrollRef, label) => {
    return [
      <div class="scroll-nav-14f">
        <button
          type="button"
          class="scroll-nav-1yy"
          onClick={() => props.scrollTo(scrollRef)}
        >
          <div class="scroll-nav-11g">{label}</div>
        </button>
      </div>,
    ];
  };

  // handles user clicking "reserve" button - activates spinner and navigates to homepage after timeout
  const navigateHome = () => {
    window.location.href = "/hotel-app";
  };

  if (scrollNavActive) {
    return (
      <div class="scroll-nav-6gz">
        <div class="scroll-nav-le6">
          <div class="scroll-nav-plm">
            <div class="scroll-nav-dmn">
              <div class="scroll-nav-yau">
                {navOption(props.photosRef, "Photos")}
                {navOption(props.amenitiesRef, "Amenities")}
                {navOption(props.reviewsRef, "Reviews")}
                {navOption(props.locationRef, "Location")}
              </div>

              <div class="scroll-nav-e29">
                <div class="scroll-nav-xkk">
                  <div
                    class={
                      scrollNavRHSActive ? "scroll-nav-15t" : "scroll-nav-14u"
                    }
                  >
                    <div class="scroll-nav-1fx" data-testid="book-it-default">
                      <div class="scroll-nav-ixd">
                        <div>
                          <div class="scroll-nav-ati">
                            <span class="scroll-nav-14y">
                              {props.checkinDate && props.checkoutDate ? (
                                <div class="scroll-nav-1jo">
                                  <span class="scroll-nav-tyx">
                                    £{props.costs.avePerNight}
                                  </span>
                                  <span class="scroll-nav-r1n">
                                    &nbsp;night
                                  </span>
                                </div>
                              ) : (
                                <div class="scroll-nav-1cr">
                                  Add dates for prices
                                </div>
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div class="scroll-nav-fz3">
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ScrollNav;
