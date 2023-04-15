// Creates large popout marker to the map (which gives more details on the currently selected pill marker + link)
const addLargeMarker = (markerData) => {
  if (activeLargeMarker) {
    activeLargeMarker.marker.map = null;
    activeLargeMarker = false;
  }

  const newMarker = new window.google.maps.marker.AdvancedMarkerView({
    map,
    content: largeMarkerContent(markerData),
    position: markerData.coords,
  });

  // const element = newMarker.element;
  newMarker.element.style.zIndex = 10
/*
  newMarker.addListener("click", (event) => {
    largeMarkerClickListener.current=true
  });
  */

  activeLargeMarker = {marker: newMarker, markerData: markerData};
};

// calculates position and generates html content for large marker
function largeMarkerContent(markerData) {

  const neCoords = props.mapParameters.bounds.getNorthEast(); // Coords of the northeast corner
  const swCoords = props.mapParameters.bounds.getSouthWest(); // Coords of the southwest corner

const content = document.createElement("div");

let containerWidth = 327;
let minMargin = 35;

let adjustment = 0;
let lhsLngDiff = 0
/*
lhsLngDiff = calcLngDiff(swCoords.lng(), markerData.coords.lng)

const lngWidth = calcLngDiff(swCoords.lng(),neCoords.lng())
const lhsPxDiff = mapBox.width * (lhsLngDiff/lngWidth)
const rhsPxDiff = mapBox.width - lhsPxDiff
*/

let verticalAdj = - 31.078
let verticalPercentage = 0
let horizontalAdj = 0

/*
  if (lhsPxDiff < containerWidth / 2 + minMargin) {
    horizontalAdj = containerWidth / 2 - (lhsPxDiff - minMargin);
  }
  if (rhsPxDiff < containerWidth / 2 + minMargin) {
    horizontalAdj = -(containerWidth / 2 - (rhsPxDiff - minMargin));
  }

if (mapCenter.lat()>markerData.coords.lat) {
  console.log("BELOW CENTER")
  verticalAdj = - 31.078
  verticalPercentage = 0
}
else {
  console.log("ABOVE CENTER")
  verticalAdj = 31.078
  verticalPercentage = 100
}
*/

const largeMarkerPos = "translate(calc(-50% + " + horizontalAdj + "px), calc(" + verticalPercentage + "% + " + verticalAdj + "px))";

  content.innerHTML = `<div
      class="_1mhd7uz"
      style="transform: ${largeMarkerPos}; left: 50%; position: absolute; bottom: 0px; z-index: 1; pointer-events: auto; font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif; animation-duration: 100ms;"
    >

        <div
          aria-labelledby="title_2107131"
          class="cy5jw6o c142ueu dir dir-ltr"
          role="group"
          style="--card-container_width: ${containerWidth}px;"
        >
          <div class="lwy0wad lkzpgws dir dir-ltr">
            <div class="g1dqasw8 cb4nyux dir dir-ltr">
              <div class="t1jojoys dir dir-ltr" id="title_2107131">
                ${markerData.summary.description1}
              </div>
              <div class="n1vl7ksh s1cjsi4j dir dir-ltr">
                <span class="t6mzqp7 dir dir-ltr">${markerData.summary.description2}</span>
              </div>
              <div class="b19nwwl6 dir dir-ltr">
                <div class="p1lki7m8 dir dir-ltr">
                  <div style="--pricing-guest-display-price-alignment: flex-start; --pricing-guest-display-price-flex-wrap: wrap; --pricing-guest-primary-line-font-size: 15px; --pricing-guest-primary-line-line-height: 19px; --pricing-guest-primary-line-unit-price-font-weight: var(--jx-zk-pv); --pricing-guest-primary-line-trailing-content-font-size: 14px; --pricing-guest-secondary-line-font-size: 14px; --pricing-guest-secondary-line-line-height: 18px; --pricing-guest-secondary-line-color: #717171; --pricing-guest-explanation-disclaimer-font-size: 14px; --pricing-guest-explanation-disclaimer-line-height: 18px; --pricing-guest-primary-line-strikethrough-price-font-weight: 600; --pricing-guest-primary-line-qualifier-font-size: 15px; --pricing-guest-primary-line-qualifier-line-height: 19px;">
                    <div class="_i5duul">
                      <span class="_14y1gc">
                        <div class="_1jo4hgw" aria-hidden="true">

                          <span class="_1y74zjx">${
                            "£" + markerData.prices.dayRate
                          }&nbsp;</span>
                          <span class="_jiydcq">night</span>
                        </div>
                        <span class="a8jt5op dir dir-ltr">
                          £464 per night, originally £555
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
                <div class="s1cjsi4j dir dir-ltr">
                  <span class="a8jt5op dir dir-ltr">,</span>
                  <span aria-hidden="true"> ·</span>
                  <span class=" dir dir-ltr">20–25 Jan</span>
                </div>
              </div>
              <span
                aria-label="4.98 out of 5 average rating,  349 reviews"
                class="t5eq1io r4a59j5 dir dir-ltr"
                role="img"
              >
                <span class="su0q88m dir dir-ltr">
                  <svg
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                    style="display: block; height: 12px; width: 12px; fill: currentcolor;"
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
                <span aria-hidden="true" class="r1dxllyb dir dir-ltr">
                  ${markerData.summary.aveRating} (${
    markerData.summary.numReviews
  })
                </span>
              </span>
            </div>
            <div class="mltso3m dir dir-ltr">
              <div class="c14dgvke dir dir-ltr">
                <div
                  aria-describedby="carousel-description"
                  class="cnjlbcx cp0pqp0 rd7fm2t dir dir-ltr"
                  role="group"
                >
                  <div class="c18vjgz6 dir dir-ltr">
                    <div class="o47luuh o1q97y5m dir dir-ltr">
                      <div class="b1tv82fw dir dir-ltr">
                      </div>
                    </div>
                  </div>
                  <div class="s1yvqyx7 dir dir-ltr">
                    <div class=" dir dir-ltr">
                      <div class="awuxh4x dir dir-ltr">
                        <div class="cw9aemg dir dir-ltr">
                          <div class="c14whb16 dir dir-ltr">
                              <div class="cjv59qb dir dir-ltr">
                                <div
                                  class="_1h6n1zu"
                                  style="display: inline-block; vertical-align: bottom; height: 100%; width: 100%; min-height: 1px;"
                                  role="presentation"
                                  aria-hidden="true"
                                >
                                  <picture>
                                    <source
                                      srcset="${markerData.photos[0].img} 1x"
                                      media="(max-width: 743px)"
                                    />
                                    <source
                                      srcset="${markerData.photos[0].img} 1x"
                                      media="(min-width: 743.1px) and (max-width: 1127px)"
                                    />
                                    <source
                                      srcset="${markerData.photos[0].img} 1x"
                                      media="(min-width: 1127.1px) and (max-width: 1439px)"
                                    />
                                    <source
                                      srcset="${markerData.photos[0].img} 1x"
                                      media="(min-width: 1439.1px)"
                                    />
                                    <img
                                      class="_6tbg2q"
                                      style="object-fit: cover; vertical-align: bottom;"
                                      aria-hidden="true"
                                      elementtiming="LCP-target"
                                      id="FMP-target"
                                      loading="eager"
                                      src="https://a0.muscache.com/im/pictures/37112192/cefdb7f0_original.jpg?im_w=720"
                                      data-original-uri="https://a0.muscache.com/im/pictures/37112192/cefdb7f0_original.jpg?im_w=720"
                                    />
                                  </picture>
                                  <div
                                    class="_15p4g025"
                                    style='background-image: url("https://a0.muscache.com/im/pictures/37112192/cefdb7f0_original.jpg?im_w=720"); background-size: cover;'
                                  ></div>
                                </div>
                              </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
      `;

  return content;
}
