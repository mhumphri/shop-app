import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { updateMainModal } from "../../redux/modals/modalsSlice";

import "../css/swipeableGallery.css";

// renders individual portfolio item either as a swipable photo gallry with progress indicator

function SwipeableGallery(props) {

const photoArray = [1,2,3,4,5,6,7,8,9]


  /* index of photo currently visible */
  const [currentPhoto, setCurrentPhoto] = useState(0);
  /* total number of photos in array */
  const [maxPhoto] = useState(photoArray.length-1);
  /* boolean value indicating if chevrons currently active - used to deterin appropriate styling */
  const [chevronsActive, setChevronsActive] = useState(false);
    /* css styles for LHS and RHS chevrons */
  const [lhsChevronStyle, setLhsChevronStyle] = useState("s134m7bb s1tdgjmu dir dir-ltr");
  const [rhsChevronStyle, setRhsChevronStyle] = useState("s134m7bb s1tdgjmu dir dir-ltr");

  /* ref for photo viewer div */
  const galleryRef = useRef(null);

  /* updates chevron styling in reponse to photo gallery being scrolled */
  const onGalleryScroll = () => {
    const currentScrollPos = galleryRef.current.scrollLeft;
    const imageWidth = galleryRef.current.offsetWidth;
    if (Math.round(currentScrollPos / imageWidth) !== currentPhoto) {
      setCurrentPhoto(Math.round(currentScrollPos / imageWidth));
    }

  };

  /* moves to next image when LHS chevron is clicked  */
  const scrollLeft = () => {
    const currentScrollPos = galleryRef.current.scrollLeft;
    const imageWidth = galleryRef.current.offsetWidth;
    galleryRef.current.scrollTo({
      left: currentScrollPos - imageWidth,
      behavior: "smooth",
    });
  };

  /* moves to next image when RHS chevron is clicked  */
  const scrollRight = () => {
    const currentScrollPos = galleryRef.current.scrollLeft;
    const imageWidth = galleryRef.current.offsetWidth;
    galleryRef.current.scrollTo({
      left: currentScrollPos + imageWidth,
      behavior: "smooth",
    });
  };

  /* render of progress dots at the bottom of the photo (which show as you scroll through the photo array) */
  const dotsRender = (livePhoto) => {
    let newDots = [];
    for (let i = 0; i < photoArray.length; i++) {
      let style = "_1k9ksvh";
      if (i === livePhoto) {
        style = "_4o74ccl";
      }

      let dotScale = 1;

      if (i > 0) {
        if (i >= livePhoto + 2 || i <= livePhoto - 2) {
          dotScale = 0.666667;
        }
        if (i > 1) {
          if (i === livePhoto + 1 || i === livePhoto - 1) {
            dotScale = 0.833333;
          }
        }

        if (livePhoto > maxPhoto - 2) {
          if (i >= maxPhoto - 2) {
            dotScale = 1;
          }
          if (i === maxPhoto - 3) {
            dotScale = 0.833333;
          }
        }

        if (livePhoto < 3) {
          if (i < 3) {
            dotScale = 1;
          }
          if (i === 3) {
            dotScale = 0.833333;
          }
        }

        if (i === livePhoto) {
          dotScale = 1;
        }
      }

      newDots.push(
        <span
          class={style}
          style={{ transform: "scale(" + dotScale + ")" }}
        ></span>
      );
    }

    let dotsPosition = 0;

    if (currentPhoto > 1) {
      dotsPosition = (currentPhoto - 2) * -11;
    }

    if (currentPhoto >= maxPhoto - 2) {
      dotsPosition = (maxPhoto - 4) * -11;
    }

    const newRender = (
      <div
        class="_1b2klj3"
        style={{ transform: "translateX(" + dotsPosition + "px)" }}
      >
        {newDots}
      </div>
    );

    return newRender;
  };

  const updateChevrons = () => {
    if (chevronsActive) {
    if (currentPhoto > 0) {
      setLhsChevronStyle("s134m7bb swcqrz4 dir dir-ltr");
    }
    else {
      setLhsChevronStyle("s134m7bb swcqrz4 s1tdgjmu  dir dir-ltr");
    }

    if (currentPhoto < maxPhoto) {
      setRhsChevronStyle("s134m7bb swcqrz4 dir dir-ltr");
    }
    else {
      setRhsChevronStyle("s134m7bb swcqrz4 s1tdgjmu dir dir-ltr");
    }
  }
  else {
    setLhsChevronStyle("s134m7bb swcqrz4 s1tdgjmu  dir dir-ltr");
    setRhsChevronStyle("s134m7bb swcqrz4 s1tdgjmu dir dir-ltr");
  }
  }

  /* updates chevron styling in response to changes in currentPhoto and props.activeResult */
  useEffect(() => {
    updateChevrons();
  }, [currentPhoto, chevronsActive]);

  /* activates chevron styling and active item in reponse to mouse entering */
  const handleMouseEnter = () => {
    setChevronsActive(true)
  };

  /* de-activates chevron styling and active item in reponse to mouse entering */
  const handleMouseLeave = () => {
    setChevronsActive(false)


  };




  // redux hook for dispatching data
  const dispatch = useDispatch();

  // render of inner content
  const innerContent = [
    <div class="c14dgvke dir dir-ltr"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      <div
        aria-describedby="carousel-description"
        class="cnjlbcx_v2 cp0pqp0 rztl681 dir dir-ltr"
        role="group"
      >

{/* contains info label and chvrons etc */}
          <div class="c18vjgz6 dir dir-ltr">
            <div class="o47luuh o1q97y5m dir dir-ltr">
              <div class="tsz9f4o dir dir-ltr">

                  <div className="portfolioitem-ja2">
                  swipeable gallery
                  </div>

              </div>
              <div class="m1dum4mk dir dir-ltr">
                <div class="m1tlldn6 dir dir-ltr">
                  <div class={lhsChevronStyle}>
                    <button
                      data-is-hidden="true"
                      aria-hidden="true"
                      aria-label="Previous image"
                      type="button"
                      class="_1d3iagv"
                      onClick={scrollLeft}
                    >
                      <span class="_3hmsj">
                        <svg
                          viewBox="0 0 32 32"
                          xmlns="http://www.w3.org/2000/svg"
                          style={{
                            display: "block",
                            fill: "none",
                            height: "12px",
                            width: "12px",
                            stroke: "currentcolor",
                            strokeWidth: "4px",
                            overflow: "visible",
                          }}
                          aria-hidden="true"
                          role="presentation"
                          focusable="false"
                        >
                          <g fill="none">
                            <path d="m20 28-11.29289322-11.2928932c-.39052429-.3905243-.39052429-1.0236893 0-1.4142136l11.29289322-11.2928932"></path>
                          </g>
                        </svg>
                      </span>
                    </button>
                  </div>
                </div>
                <div class="ms83rji dir dir-ltr">
                  <div class={rhsChevronStyle}>
                    <button
                      aria-hidden="false"
                      aria-label="Next image"
                      type="button"
                      class="_1d3iagv"
                      onClick={scrollRight}
                    >
                      <span class="_3hmsj">
                        <svg
                          viewBox="0 0 32 32"
                          xmlns="http://www.w3.org/2000/svg"
                          style={{
                            display: "block",
                            fill: "none",
                            height: "12px",
                            width: "12px",
                            stroke: "currentcolor",
                            strokeWidth: "4px",
                            overflow: "visible",
                          }}
                          aria-hidden="true"
                          role="presentation"
                          focusable="false"
                        >
                          <g fill="none">
                            <path d="m12 4 11.2928932 11.2928932c.3905243.3905243.3905243 1.0236893 0 1.4142136l-11.2928932 11.2928932"></path>
                          </g>
                        </svg>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
              <div class="b1tv82fw dir dir-ltr">
                <div class="bycbjmy dir dir-ltr"></div>
                <div class="balhpdq dir dir-ltr">
                  <div
                    aria-label="Photo 1 of 13"
                    role="img"
                    class="_r752or"
                  >
                    <div class="_szn05y">
                      {dotsRender(currentPhoto)}
                    </div>
                  </div>
                </div>
                <div class="b18glxm4 dir dir-ltr"></div>
              </div>
            </div>
          </div>






              <div class="swipeable-gallery-cw9">
                {/* important div - gives height */}
                <div
                  class="swipeable-gallery-c14"
                  onScroll={onGalleryScroll}
                  ref={galleryRef}
                >
                {photoArray.map((x) => (
                  <div
                    class="swipeable-gallery-rfe"
                  >
<div className="swipeable-gallery-tz4">
  <img className="swipeable-gallery-uc3" alt="alt" src={props.image} />
</div>
</div>

))
}



                </div>
              </div>




    </div>
  </div>
  ];


    return <div className="portfolioitem-ie3 auto-pointer">{innerContent}</div>;

}

export default SwipeableGallery;
