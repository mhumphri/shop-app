import React, { useState, useEffect, useRef } from "react";
import "../css/searchMap.css";

//

// scripts for loading google maps - needs to be outside the react component to prevent continuous re-rendering
var script = document.createElement("script");
script.src =
  "https://maps.googleapis.com/maps/api/js?key=AIzaSyAc2bVcp035eZ3dR3LrGjUfrR3pHkgmq68&callback=initMap&libraries=marker,places&v=beta";
script.async = true;
document.head.appendChild(script);

// holds google map object
let map;
// holds currently active marker objects
let markers = []
// boolean which indicates if have all been loaded
let markersLoaded;
/* holds marker object of active large marker (which contains more details of saty in highlighted pill marker) */
let activeLargeMarker;
// boolean which indicates if markers are currently being loaded
let markersLoading;

// sets up listener for mapClicks - state can't be used in the event listener directly, so this is a workaround
const mapClickListener = {
  currentInternal: 0,
  currentListener: function (val) {},
  set current(val) {
    this.currentInternal = val;
    this.currentListener(val);
  },
  get current() {
    return this.currentInternal;
  },
  registerListener: function (listener) {
    this.currentListener = listener;
  },
};

function LargeMap(props) {

//ref for map container - used to calculate size of div
  const mapContainer = useRef(null);
  // boolean which indicates if the google map has been loaded
  const [mapLoaded, setMapLoaded] = useState();
  // object which holds map bounds, map center, map zoom, map box rectangle and map margin
  const [mapDimensions, setMapDimensions] = useState();

  let mapCenter = {
    lat: 48.6,
    lng: 0,
  };
  let mapZoom = 5


  /* creates new google map object */
  const renderMap = () => {
    console.log("RENDER MAP!")
    const center = {
      lat: 48.6,
      lng: 0,
    };
    map = new window.google.maps.Map(document.getElementById("map"), {
      zoom: mapZoom,
      center: mapCenter,
      mapId: "4504f8b37365c3d0",
      disableDefaultUI: true,
      gestureHandling: "greedy",
      mapTypeId: 'terrain',

    });
    /* sets mapLoaded variable to true when first idle event occurs (which then enables adding of markers inside the react component) */
    window.google.maps.event.addListenerOnce(map, "idle", function () {
      setMapLoaded(true);
    });
    // updates stored map bounds, center, zoom etc when map bounds change
    window.google.maps.event.addListener(map, "idle", function () {
      setMapDimensions(
        {
          mapBounds: map.getBounds(),
          mapCenter: map.getCenter(),
          mapZoom: map.getZoom(),
          mapBox: mapContainer.current.getBoundingClientRect(),
          mapMarginPx: 50,
        }
      )
    });

    /* event listener for mousedown uses a geter/setter to change drawerdown state */
    map.addListener("click", (event) => {
      activeLargeMarker.marker.map = null;
      // getter/setter trigrers  of state (turning off) / style for active marker - can't be done inside event listener as can't access state here
      mapClickListener.current=true

    });
  };

  /* checks google API has loaded before rendering map */
  const googleMapChecker = () => {
    // check for maps in case you're using other google api
    if (!window.google) {
      setTimeout(googleMapChecker, 100);
      console.log("not there yet");
    } else {
      console.log("we're good to go!!");
      // the google maps api is ready to use, render the map
      renderMap();
    }
  };

  /* calls googleMapChecker when component loads for the first time */
  useEffect(() => {
    googleMapChecker();
  }, []);


  return (


  <div class="m15dgkuj dir dir-ltr">
   <div class="c1yo0219 dir dir-ltr">
      <div>
        <div
          data-plugin-in-point-id="EXPLORE_MAP:TAB_ALL_HOMES"
          data-section-id="EXPLORE_MAP:TAB_ALL_HOMES"
        >
          <div class="c12zlp1w dir dir-ltr">
          <div
            aria-hidden="false"
            style={{
              contain: "layout paint",
              position: "relative",
              width: "100%",
              height: "100%",
            }}
            data-testid="map/GoogleMap"
          >
            <div
              class="cezhrh0 c1aiokyr dir dir-ltr"
              style={{
                whiteSpace: "nowrap",
                position: "absolute",
                marginLeft: "24px",
                marginTop: "24px",
                top: "0px",
                left: "0px",
                zIndex: "1",
                transition: "transform 850ms cubic-bezier(0.25, 1, 0.5, 1) 0s",
              }}
              aria-hidden="false"
            >
              <div class="copf0za dir dir-ltr">
                <div
                  class="c15e4bhw ctbkggg dir dir-ltr"
                  style={{ height: "40px", flexDirection: "row" }}
                >
                  <button
                    aria-label="Expand map and collapse list view"
                    type="button"
                    class="b117oblx dir dir-ltr"
                    onClick={props.toggleMapView}
                  >
                    <div class="l1pjhd3s dir dir-ltr">
                      <svg
                      className="search-map-mz1"
                        viewBox="0 0 32 32"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        role="presentation"
                        focusable="false"
                      >
                        <g fill="none">
                    {props.expandMapView ? <path d="m12 4 11.2928932 11.2928932c.3905243.3905243.3905243 1.0236893 0 1.4142136l-11.2928932 11.2928932"></path> : <path d="m20 28-11.29289322-11.2928932c-.39052429-.3905243-.39052429-1.0236893 0-1.4142136l11.29289322-11.2928932"></path> }
                        </g>
                      </svg>
                    </div>
              {props.expandMapView ?       <div class="l177lde9 dir dir-ltr">
            <span class="l1pncren dir dir-ltr">Show list</span>
          </div> : null}

                  </button>
                </div>
              </div>
            </div>
     <div
              ref={mapContainer}
              id="map"
              style={{
                height: "100%",
                backgroundColor: "rgb(230, 227, 223)",
                position: "relative",
                overflow: "hidden",
              }}
            ></div> 
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>



  )


}

export default LargeMap;
