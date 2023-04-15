import React, { useState, useEffect, useRef } from "react";
import getCountryPolygons from "../functions/getCountryPolygons";
import randomNumberInRange from "../functions/randomNumberInRange";
import bbox from "@turf/bbox";
import Loader from "./loader";
import "../css/resultsMap.css";

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

function ResultsMap(props) {

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

  useEffect(() => {
    if (!props.dataLoading && !props.pageLoading) {
      console.log("HOTEL ARRAY UPDATE")
      updateMarkers()
    }



}, [props.dataLoading, props.pageLoading]);

// deletes current markers
const deleteMarkers = (keysObject) => {
  /*
  for (let i = 0; i < markers.length; i++) {
    if (!keysObject[markers[i].markerData.key]) {
     markers[i].marker.map = null;
   }
  }
  */

  var i = markers.length
  while (i--) {
      if (!keysObject[markers[i].markerData.key]) {
        markers[i].marker.map = null;
          markers.splice(i, 1);
      }
  }

//  markers=[]
/*  if (activeLargeMarker) {
  activeLargeMarker.marker.map = null;
  activeLargeMarker = false;
}
*/
}

// updates markers using latest roomData array
const updateMarkers = () => {
console.log("updateMarkers")
/*
if (markersLoaded) {
  markersLoaded = false
 deleteMarkers()
}
*/

let keysObject = {}
for (let i=0; i<props.hotelArray.length; i++) {
  keysObject[props.hotelArray[i].key]=true
}
console.log("keysObject: " + JSON.stringify(keysObject))

deleteMarkers(keysObject)


let residualKeysObject = {}
for (let i=0; i<markers.length; i++) {
  residualKeysObject[markers[i].markerData.key]=true
}

  for (let i = 0; i < props.hotelArray.length; i++) {
    if (!residualKeysObject[props.hotelArray[i].key]) {
    addPillMarker(props.hotelArray[i]);
  }

  }
};

// creates a pill marker (there is one for every property in roomArray)
const addPillMarker = (markerData) => {
  console.log("addPillMarker")

  // random delay & timeout creates impression of loading from server
    let randomDelay = randomNumberInRange(200, 1000);

    setTimeout(() => {

      function pillMarkerContent(markerData) {
        console.log("pillMarkerContent")

        const content = document.createElement("div");

        content.innerHTML = `
        <div style="transform: translate(calc(-50% + 0px), calc(50% + 0px)); transition: transform 0.2s ease 0s; left: 50%; position: absolute; bottom: 0px; z-index: 0; pointer-events: auto; font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif;">
          <button
            class="czgw0k9 dir dir-ltr"
            style="color: inherit; border: medium none; margin: 0px; padding: 0px; background: transparent; width: auto; overflow: visible; font: inherit;"
            data-veloute="map/markers/BasePillMarker"
          >
            <div
              class=" dir dir-ltr"
              style="--content-mini-box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.18), 0px 0px 0px 1px rgba(0, 0, 0, 0.08); align-items: center; cursor: pointer; display: flex; height: 28px; position: relative; transform: scale(1); transform-origin: 50% 50% 0px; transition: transform 150ms ease 0s;"
            >
              <div class="${markerData.key}" style="background-color: #FFFFFF; border-radius: 28px; box-shadow: rgba(255, 255, 255, 0.18) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0.18) 0px 2px 4px; color: #222222; height: 28px; padding: 0px 8px; position: relative; transform: scale(1); transform-origin: 50% 50% 0px; transition: transform 300ms cubic-bezier(0, 0, 0.1, 1) 0s;">
                <div style="align-items: center; display: flex; height: 100%; justify-content: center; opacity: 1; transition: opacity 300ms cubic-bezier(0, 0, 0.1, 1) 0s; white-space: nowrap;">
                  <span
                    class="t5u4927 dir dir-ltr"
                    aria-label="Map marker of the listing: £695, "
                  >
                    £124
                  </span>
                </div>
              </div>
            </div>
          </button>
        </div>
        `;

        return content;
      }

      /* creates marker object */
      const newMarker = new window.google.maps.marker.AdvancedMarkerView({
        map,
        content: pillMarkerContent(markerData),
        position: markerData.coords,
      });

      markers.push({marker: newMarker, markerData: markerData});

    }, randomDelay);
  }



  useEffect(() => {
  if (props.searchLocation && props.searchLocation!=="map area" ) {
  console.log("LOCATION UPDATE")
  let countryBbox;
  let countryPolygons = getCountryPolygons(props.searchLocation);
  countryBbox = bbox(countryPolygons);

  var countryBounds = new window.google.maps.LatLngBounds();
  var bound1 = new window.google.maps.LatLng(
    countryBbox[1],
    countryBbox[0]
  );
  var bound2 = new window.google.maps.LatLng(
    countryBbox[3],
    countryBbox[2]
  );
  countryBounds.extend(bound1);
  countryBounds.extend(bound2);
  map.fitBounds(countryBounds);
  }
  }, [props.searchLocation]);


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
      props.setMapParameters({bounds: map.getBounds(),
        center: map.getCenter(),
        zoom: map.getZoom(),
        box: mapContainer.current.getBoundingClientRect()})
      /* setMapDimensions(
        {
          mapBounds: map.getBounds(),
          mapCenter: map.getCenter(),
          mapZoom: map.getZoom(),
          mapBox: mapContainer.current.getBoundingClientRect(),
          mapMarginPx: 50,
        }
      )
      props.setMapBounds(map.getBounds()) */

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
            {props.dataLoading || props.pageLoading ? <Loader /> : null}
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

export default ResultsMap;
