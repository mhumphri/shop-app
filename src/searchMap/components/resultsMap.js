import React, { useState, useEffect, useRef } from "react";
import PopoutBoxSm from "./popoutBoxSm";
import getCountryPolygons from "../functions/getCountryPolygons";
import randomNumberInRange from "../functions/randomNumberInRange";
import { calcLngDiff } from "../functions/calcLngDiff";
import bbox from "@turf/bbox";
import Loader from "./loader";
import "../css/resultsMap.css";

// component containing google map and logic for rendering and updating markers and responding to search queries which require the map to move

// scripts for loading google maps - needs to be outside the react component to prevent continuous re-rendering
var script = document.createElement("script");
script.src =
  "https://maps.googleapis.com/maps/api/js?key=AIzaSyAc2bVcp035eZ3dR3LrGjUfrR3pHkgmq68&callback=initMap&libraries=marker,places&v=beta";
script.async = true;
document.head.appendChild(script);

// holds google map object
let map;
// holds data and marker objects for current pill markers
let markers = [];
/* holds marker object of active large marker (which contains more details of saty in highlighted pill marker) */
let activeLargeMarker;

// sets up listener for mapClicks - state can't be accessed inside google map objects directly, so this is a workaround
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

// sets up listener for clicks on largeMarker - state can't be accessed inside google map objects directly, so this is a workaround
const largeMarkerClickListener = {
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
  // alternative for currentPillMarker state (which can be accessed "live" inside google map objects)
  let altCurrentPillMarker;
  //ref for map container - used to access position / dimensions of map containers
  const mapContainer = useRef(null);
  // holds data and google map object for largeMarker
  const [largeMarker, setLargeMarker] = useState();
  // keeps log of currently active pill marker - used for styling
  const [currentPillMarker, setCurrentPillMarker] = useState();
  // keeps log of currently active pill marker - used for styling
  const [prevPillMarker, setPrevPillMarker] = useState();
  // keeps log of state of pill markers (e.g. "current", "prev") - used for styling
  const [markerState, setMarkerState] = useState({});
  // boolean indicating if markers have loaded
  const [markersLoaded, setMarkersLoaded] = useState();
  // keeps log of most recent hotel which has been hovered over in the results list - used to disable styling when props.hoverHotel state changes
  const [hoverHotelLocal, setHoverHotelLocal] = useState();

  // highlights map marker when it is active (hover) in searchListLg.js and vice versa
  useEffect(() => {
    if (markersLoaded) {
      // resets styling (to white background and black text) of previously hovered over hotel
      if (hoverHotelLocal) {
        const prevResultSelector = getMarkerSelector(hoverHotelLocal);
        if (prevResultSelector) {
          prevResultSelector.style.backgroundColor = "white";
          prevResultSelector.style.color = "black";
        }
        const prevMarkerObject = getMarkerObject(hoverHotelLocal);
        if (prevMarkerObject) {
          prevMarkerObject.element.style.zIndex = 0;
        }
      }
      // sets style of pill marker (to black background and white text) corresponding to currently hovered over hotel in results list
      if (props.hoverHotel) {
        const activeResultSelector = getMarkerSelector(props.hoverHotel);
        if (activeResultSelector) {
          activeResultSelector.style.backgroundColor = "black";
          activeResultSelector.style.color = "white";
        }
        const markerObject = getMarkerObject(props.hoverHotel);
        if (markerObject) {
          markerObject.element.style.zIndex = 1;
          setHoverHotelLocal(props.hoverHotel);
        }
      }
    }
  }, [props.hoverHotel]);

  // parameters for initial map center and zoom
  let mapCenter = {
    lat: 48.6,
    lng: 0,
  };
  let mapZoom = 5;

  // triggers update of markers when either pageLoading or dataLoading props set to false (i.e. after simulated loading has finished)
  useEffect(() => {
    if (!props.dataLoading && !props.pageLoading) {
      console.log("HOTEL ARRAY UPDATE");
      updateMarkers();
    }
  }, [props.dataLoading, props.pageLoading]);

  // refreshes markers when largeView state changes so that (1) popout box render updates; and (2) largeMarker is switched off if we are moving into small view (where html render is used instead of google maps marker object)
  useEffect(() => {
    if (markersLoaded) {
      // deleted largeMarker when view changes from large view to small view (as html render is used instaed of google maps marker in small view)
      if (!props.largeView) {
        if (largeMarker) {
          largeMarker.marker.map = null;
        }

        updateMarkers("refresh");
      } else {
        // addLargeMarker(largeMarker.markerData);
        updateMarkers("refresh");
      }
    }
  }, [props.largeView]);

  // deletes current markers
  // keysObject argument is an object containing keys of markers which are not to be deleted
  // refresh argument overrides keysObject - if true, all markers are to be deleted
  const deleteMarkers = (keysObject, refresh) => {
    // if refresh set to true, all markers are deleted (as the render for large marker is different)
    if (refresh) {
      let i = markers.length;
      while (i--) {
        if (markers[i].markerData.key) markers[i].marker.map = null;
        markers.splice(i, 1);
      }
    }
    // if refresh is false, only markers for hotels which are not in both the previous array and new array are deleted
    else {
      let i = markers.length;
      while (i--) {
        if (!keysObject[markers[i].markerData.key]) {
          markers[i].marker.map = null;
          markers.splice(i, 1);
        }
      }
    }
  };

  // updates pill markers using latest roomData array
  const updateMarkers = (refresh) => {
    // initialise variables
    let currentMarkerRetained;
    let prevMarkerRetained;
    let largeMarkerRetained;
    let keysObject = {};
    let newMarkerState = {};

    // (1) loop through current hotel data array and create object containing all hotel keys
    // (2) check if stored currentMarker and prevMarker keys appear in current hotelArray - if not reset currentMarker and prevMarker values
    // (3) check if keys stored in markerState appear in current hotelArray - if so retain those object properties in updated markerState object
    for (let i = 0; i < props.hotelArray.length; i++) {
      // add key current hotelArray element to keys object
      keysObject[props.hotelArray[i].key] = true;
      // if current hotelArray element key matches currentPillMarker state, set currentMarkerRetained to true
      if (currentPillMarker === props.hotelArray[i].key) {
        currentMarkerRetained = true;
      }
      // if current hotelArray element key matches prevPillMarker state, set prevMarkerRetained to true
      if (prevPillMarker === props.hotelArray[i].key) {
        prevMarkerRetained = true;
      }
      // check if keys stored in markerState appear in current hotelArray - if they do, copy them across to newMarkerState
      if (markerState[props.hotelArray[i].key]) {
        newMarkerState[props.hotelArray[i].key] =
          markerState[props.hotelArray[i].key];
      }
      // check if the key for currently active large marker matches current hotelArray element key - if so set largeMarkerRetained to true
      if (largeMarker) {
        if (largeMarker.markerData.key === props.hotelArray[i].key) {
          largeMarkerRetained = true;
        }
      }
    }

    // current pill marker is not contained in current hotel data array, set currentPillMarker state to false
    if (!currentMarkerRetained) {
      setCurrentPillMarker(false);
    }

    // if prev pill marker is not contained in current hotel data array, set prevPillMarker state to false
    if (!prevMarkerRetained) {
      setPrevPillMarker(false);
    }

    // if largeMarker is not contained in current hotel data array, set largeMarker state to false
    if (!largeMarkerRetained && largeMarker) {
      activeLargeMarker.marker.map = null;
      activeLargeMarker = false;
      setLargeMarker(false);
    }

    // update MarkerState state
    setMarkerState(newMarkerState);

    // delete markers which do not appear in the current hotelArray (or delete all if refresh argument is true)
    deleteMarkers(keysObject, refresh);

    // if refresh argument is true, create new pill marker objects for all elements of hotelArray
    if (refresh) {
      for (let i = 0; i < props.hotelArray.length; i++) {
        addPillMarker(props.hotelArray[i], refresh);
      }
    }
    // if refresh is false, add new pill marker objects for all elements of hotelArray which are not in keysObject
    else {
      // residualKeysObject stores keys of map markers which have not been deleted
      let residualKeysObject = {};
      for (let i = 0; i < markers.length; i++) {
        residualKeysObject[markers[i].markerData.key] = true;
      }
      // pill markers added for elements of hotel array, with undeleted markers from previous hotel array filtered out
      for (let i = 0; i < props.hotelArray.length; i++) {
        if (!residualKeysObject[props.hotelArray[i].key]) {
          addPillMarker(props.hotelArray[i]);
        }
      }
    }

    // largeMarker is true, refresh argument is true (i.e. all markers are being deleted and updated) and large screen view, a new largeMarker (large maker displaying photo and hotel summary data) map objects is added
    if (largeMarker && refresh && props.largeView) {
      console.log("activeLarge1");
      addLargeMarker(largeMarker.markerData);
    }

    // set markersLoaded state to true
    if (!markersLoaded) {
      setMarkersLoaded(true);
    }
  };

  // creates new pill marker
  // markerData argument contains the hotel data (element from hotelArray)
  // ADD MORE! refresh indicates if marker is already on map and should be generated with no delay (the delay is used to simulate data loading from a server).
  const addPillMarker = (markerData, refresh) => {
    const createNewMarker = () => {
      function pillMarkerContent(markerData) {
        // initialise variables for pill marker inline styling (white background, dark text)
        let pillBackground = "#FFFFFF";
        let pillColor = "#222222";
        let pillzIndex = 0;
        let pillBoxShadow =
          "rgba(255, 255, 255, 0.18) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0.18) 0px 2px 4px";

        // inline styles if marker is has previously been active (shaded grey)
        if (markerState[markerData.key] === "prev") {
          pillBackground = "#EBEBEB";
          pillColor = "#222222";
          pillzIndex = 0;
          pillBoxShadow = "0 0 0 1px #B0B0B0 inset";
        }

        // styles if marker is currently active (dark background, white text)
        if (markerState[markerData.key] === "current") {
          pillBackground = "#222222";
          pillColor = "#FFFFFF";
          pillzIndex = 1;
          pillBoxShadow =
            "rgba(255, 255, 255, 0.18) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0.18) 0px 2px 4px";
        }

        // initialises pill marker html render
        const content = document.createElement("div");

        // sets pill marker html render
        content.innerHTML = `
        <div style="transform: translate(calc(-50% + 0px), calc(50% + 0px)); transition: transform 0.2s ease 0s; left: 50%; position: absolute; bottom: 0px; z-index: ${pillzIndex}; pointer-events: auto; font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif;">
          <button
            class="czgw0k9 dir dir-ltr"
            style="color: inherit; border: medium none; margin: 0px; padding: 0px; background: transparent; width: auto; overflow: visible; font: inherit;"
            data-veloute="map/markers/BasePillMarker"
          >
            <div
              class=" dir dir-ltr"
              style="--content-mini-box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.18), 0px 0px 0px 1px rgba(0, 0, 0, 0.08); align-items: center; cursor: pointer; display: flex; height: 28px; position: relative; transform: scale(1); transform-origin: 50% 50% 0px; transition: transform 150ms ease 0s;"
            >
              <div class="${markerData.key}" style="background-color: ${pillBackground}; border-radius: 28px; box-shadow: ${pillBoxShadow}; color: ${pillColor}; height: 28px; padding: 0px 8px; position: relative; transform: scale(1); transform-origin: 50% 50% 0px; transition: transform 300ms cubic-bezier(0, 0, 0.1, 1) 0s;">
                <div style="align-items: center; display: flex; height: 100%; justify-content: center; opacity: 1; transition: opacity 300ms cubic-bezier(0, 0, 0.1, 1) 0s; white-space: nowrap;">
                  <span
                    class="t5u4927 dir dir-ltr"
                    aria-label="Map marker of the listing: £695, "
                  >
                    £${markerData.price}
                  </span>
                </div>
              </div>
            </div>
          </button>
        </div>
        `;

        return content;
      }

      // creates new google maps advanced marker object
      const newMarker = new window.google.maps.marker.AdvancedMarkerView({
        map,
        content: pillMarkerContent(markerData),
        position: markerData.coords,
      });

      // creates large marker (which shows photo and more detail for hotel) when pill marker is clicked
      newMarker.addListener("click", (event) => {
        clickPill(markerData, newMarker);
        addLargeMarker(markerData);
      });

      const element = newMarker.element;

      // pointer enter listener which highlights pill marker when mouse hovers over
      ["focus", "pointerenter"].forEach((event) => {
        element.addEventListener(event, () => {
          highlight(newMarker, markerData);
        });
      });

      // pointer leave listener which highlights pill marker when mouse hovers over
      ["blur", "pointerleave"].forEach((event) => {
        element.addEventListener(event, () => {
          unhighlight(newMarker, markerData);
        });
      });

      // pushes object containing markerData and google maps marker object to markers array
      markers.push({ marker: newMarker, markerData: markerData });
    };

    // if refresh argument is true, create new marker is called with no delay (delay mimics data loading from server)
    if (refresh) {
      createNewMarker();
    }

    // if refresh argument is false, create new marker is called with a delay (delay mimics data loading from server)
    else {
      // random delay & timeout creates impression of loading from server
      let randomDelay = randomNumberInRange(200, 1000);

      setTimeout(() => {
        createNewMarker();
      }, randomDelay);
    }
  };

  // changes style to highlight pill marker (uses scale property to make pill slightly larger and z-index to bring forward)
  function highlight(markerView, markerData) {
    markerView.content.classList.add("highlight");
    markerView.element.style.zIndex = 2;
  }

  // changes style to highlight pill marker (returns scale and z-index properties to initial values)
  function unhighlight(markerView, markerData) {
    markerView.content.classList.remove("highlight");
    if (altCurrentPillMarker !== markerData.key) {
      markerView.element.style.zIndex = "";
    } else {
      markerView.element.style.zIndex = 1;
    }
  }

  // creates css selector for a given property key
  const getMarkerSelector = (markerKey) => {
    const selectorName = "." + markerKey;
    const newSelector = document.querySelector(selectorName);
    return newSelector;
  };

  // sets pill marker styles to "currently active" (i.e dark background and white text)
  // takes marker key and google map marker object as arguments
  const setPillStyleCurrent = (markerKey, marker) => {
    // creates css selector for a pill marker idenitifed by key
    const activeResultSelector = getMarkerSelector(markerKey);
    // sets styles
    if (activeResultSelector) {
      activeResultSelector.style.backgroundColor = "black";
      activeResultSelector.style.color = "white";
      marker.element.style.zIndex = 1;
    }
  };

  // sets pill marker styles to "previously active" (i.e shaded grey)
  // takes marker key and google map marker object as arguments
  const setPillStylePrev = (markerKey) => {
    // creates css selector for a pill marker idenitifed by key
    const prevResultSelector = getMarkerSelector(markerKey);
    // sets styles
    if (prevResultSelector) {
      prevResultSelector.style.backgroundColor = "#EBEBEB";
      prevResultSelector.style.color = "#222222";
      prevResultSelector.style.boxShadow = "0 0 0 1px #B0B0B0 inset";
    }
    // fetches marker object for previously active marker
    const prevMarkerObject = getMarkerObject(markerKey);
    // sets z-index css property for previously active marker
    if (prevMarkerObject) {
      prevMarkerObject.element.style.zIndex = 0;
    }
  };

  // handles user click on pill marker - changes newly selected maker style and also stores crrently selected marker in state (which triggers re-tyling of prev selected marker)
  function clickPill(markerData, marker) {
    setPillStyleCurrent(markerData.key, marker);
    setCurrentPillMarker(markerData.key);
    altCurrentPillMarker = markerData.key;
  }

  // updates styling of previously active pill marker and variable recording previous marker state - needs to be split out as state doesn't update in google map objects
  useEffect(() => {
    if (currentPillMarker) {
      if (!prevPillMarker) {
        // updates marker state object for currently active pill marker
        let newMarkerState = { ...markerState };
        newMarkerState[currentPillMarker] = "current";
        setMarkerState(newMarkerState);
        // sets current marker as prev pill marker (so there is a record when current pill marker updates)
        setPrevPillMarker(currentPillMarker);
      } else {
        // sets styles for previously active pill marker
        setPillStylePrev(prevPillMarker);
        // updates marker state object for currently active and previously active pill markers
        let newMarkerState = { ...markerState };
        newMarkerState[currentPillMarker] = "current";
        newMarkerState[prevPillMarker] = "prev";
        setMarkerState(newMarkerState);
        //  sets current marker as prev pill marker (so there is a record when current pill marker updates)
        setPrevPillMarker(currentPillMarker);
      }
    }
  }, [currentPillMarker]);

  // returns marker object for a given property key
  const getMarkerObject = (markerKey) => {
    let matchingMarkerObject;
    // compares marker key of interest against all keys stored in markers array
    for (let i = 0; i < markers.length; i++) {
      // if there is a match, matchingMarkerObject is is set to marker object from markers array
      if (markerKey === markers[i].markerData.key) {
        matchingMarkerObject = markers[i].marker;
        break;
      }
    }
    return matchingMarkerObject;
  };

  // Creates large popout marker (which gives more details on the currently selected pill marker + link)
  const addLargeMarker = (markerData) => {
    // deletes large marker (google map object and staored marker data) if one is currently active
    if (activeLargeMarker) {
      activeLargeMarker.marker.map = null;
      activeLargeMarker = false;
      setLargeMarker(false);
    }

    // creates new google maps advanced marker object
    const newMarker = new window.google.maps.marker.AdvancedMarkerView({
      map,
      content: largeMarkerContent(markerData),
      position: markerData.coords,
    });

    // sets new marker z-index property to 10 (so it appears in from of everything else)
    newMarker.element.style.zIndex = 10;

    // click listener which calls largeMarkerClickListener (which activates modal with link details) setter when large marker is clicked
    newMarker.addListener("click", (event) => {
      largeMarkerClickListener.current = true;
    });

    // updates activeLargeMarker variable and state variable with google maps marker object and marker data (element from hotelArray)
    activeLargeMarker = { marker: newMarker, markerData: markerData };
    setLargeMarker({ marker: newMarker, markerData: markerData });
  };

  // calculates position and generates html content for large marker
  function largeMarkerContent(markerData) {
    // gets current map bounds and ne and sw limit coords
    const mapBounds = map.getBounds();
    const neCoords = mapBounds.getNorthEast(); // Coords of the northeast corner
    const swCoords = mapBounds.getSouthWest(); // Coords of the southwest corner

    // initialises largeMarker width, min margin (buffer from edge of map where large marker cannot be rendered)
    let containerWidth = 327;
    // sets min margin (buffer from edge of map where large marker cannot be rendered)
    const minMargin = 35;

    // get dimensions/position of map container html element
    const mapBox = mapContainer.current.getBoundingClientRect();

    // calculates coordinate distance between lhs of map and marker
    const lhsLngDiff = calcLngDiff(swCoords.lng(), markerData.coords.lng);
    // calculates coordinate width of map
    const lngWidth = calcLngDiff(swCoords.lng(), neCoords.lng());
    // calculates pixel distance between map lhs and marker
    const lhsPxDiff = mapBox.width * (lhsLngDiff / lngWidth);
    // calculates pixel distance between map rhs and marker
    const rhsPxDiff = mapBox.width - lhsPxDiff;
    // initialises horizontal adjustement. This adjusts position of large marker horizontally if default position of marker flows into buffer margin around map or outside the map
    let horizontalAdj = 0;
    // if default position of marker flows into buffer margin around map or outside the map horizontal position is adjusted so that the large marker stays within the map (outside margin buffers) but is no longer aligned with the center of the pill marker
    // if px distance between map lhs and pill marker is less than half the widht of the container (plus buffer margin) large marker position is adjusted
    if (lhsPxDiff < containerWidth / 2 + minMargin) {
      horizontalAdj = containerWidth / 2 - (lhsPxDiff - minMargin);
    }
    // if px distance between map rhs and pill marker is less than half the widht of the container (plus buffer margin) large marker position is adjusted
    if (rhsPxDiff < containerWidth / 2 + minMargin) {
      horizontalAdj = -(containerWidth / 2 - (rhsPxDiff - minMargin));
    }

    // initialises vertical adjustments which determine whether large marker appears above or below the pill marker
    let verticalAdj;
    let verticalPercentage;
    // gets coordinates of current map center point
    const mapCenter = map.getCenter();

    // if map center latitude is above pill marker, set large marker position above the pill marker
    if (mapCenter.lat() > markerData.coords.lat) {
      verticalAdj = -31.078;
      verticalPercentage = 0;
    }
    // if map center latitude is below pill marker, set large marker position below the pill marker
    else {
      verticalAdj = 31.078;
      verticalPercentage = 100;
    }

    // creates inline style setting position of large marker
    const largeMarkerPos =
      "translate(calc(-50% + " +
      horizontalAdj +
      "px), calc(" +
      verticalPercentage +
      "% + " +
      verticalAdj +
      "px))";

    // initialises html content for largeMarker render
    const content = document.createElement("div");

    // html render for large popout marker (only renders if screen in large view)
    if (props.largeView) {
      content.innerHTML = `
      <div style="transform: ${largeMarkerPos}; left: 50%; position: absolute; bottom: 0px; z-index: 2; pointer-events: auto; font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif; animation-duration: 100ms;">
  <div class="results-map-hy6" style="width: ${containerWidth}px;">
    <img class="results-map-uc3" alt="alt" src="${markerData.photos[0]}" />

    <div class="results-map-la6">
      <div>
        <div class="results-map-qq1">
          <div class="results-map-lq2">${markerData.name}</div>
        </div>

        <div class="results-map-jh4">somewhere in ${markerData.country}</div>
      </div>
      <div>
        <div class="results-map-pp1">
          <div>
            <span class="results-map-al5">£${markerData.price}</span> per night
          </div>

          <div class="results-map-hh3">
            <svg
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
              style="display: block; height: 12px; width: 12px; fill: black"
            >
              <path
                d="M15.094 1.579l-4.124 8.885-9.86 1.27a1 1 0 0 0-.542 1.736l7.293 6.565-1.965 9.852a1 1 0 0 0 1.483 1.061L16 25.951l8.625 4.997a1 1 0 0 0 1.482-1.06l-1.965-9.853 7.293-6.565a1 1 0 0 0-.541-1.735l-9.86-1.271-4.127-8.885a1 1 0 0 0-1.814 0z"
                fill-rule="evenodd"
              ></path>
            </svg>
            <div class="results-map-ma1">${markerData.rating} (${markerData.numReviews})</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
`;
    }

    return content;
  }

  // adjusts map bounds if new country is inputted by user
  useEffect(() => {
    // map bound update is triggered if props.searchLocation has a non-false value and the value is not "map area" (which would be triggered by the user moving the map)
    if (props.searchLocation && props.searchLocation !== "map area") {
      // gets polygons for seleted country
      const countryPolygons = getCountryPolygons(props.searchLocation);
      // gets boundary box (smallest rectangle which contains country polygons) for country polygons (using turf bbox function)
      const countryBbox = bbox(countryPolygons);
      // creates google map LatLng object for NE of country bbox
      const bound1 = new window.google.maps.LatLng(
        countryBbox[1],
        countryBbox[0]
      );
      // creates google map LatLng object for SW of country bbox
      const bound2 = new window.google.maps.LatLng(
        countryBbox[3],
        countryBbox[2]
      );
      // initialises new LatLngBounds() google map object
      let countryBounds = new window.google.maps.LatLngBounds();
      // adds NE coords to countryBounds
      countryBounds.extend(bound1);
      // adds SW coords to countryBounds
      countryBounds.extend(bound2);
      // fits map to countryBounds
      map.fitBounds(countryBounds);
    }
  }, [props.searchLocation]);

  // creates new google map object and event listeners etc
  const renderMap = () => {
    // creates new google map object
    map = new window.google.maps.Map(document.getElementById("map"), {
      zoom: mapZoom,
      center: mapCenter,
      mapId: "4504f8b37365c3d0",
      disableDefaultUI: true,
      gestureHandling: "greedy",
      mapTypeId: "terrain",
    });
    // sets mapLoaded state to true when first idle event occurs (which then enables adding of markers inside the react component)
    window.google.maps.event.addListenerOnce(map, "idle", function () {
    });
    // updates stored map parameters (bounds, center, zoom etc) when map bounds change
    window.google.maps.event.addListener(map, "idle", function () {
      props.setMapParameters({
        bounds: map.getBounds(),
        center: map.getCenter(),
        zoom: map.getZoom(),
        box: mapContainer.current.getBoundingClientRect(),
      });
    });

    // event listener for mousedown uses a getter/setter to change drawerdown state
    map.addListener("click", (event) => {
      // getter/setter trigrers  of state (turning off) / style for active marker - can't be done inside event listener as can't access state here
      mapClickListener.current = true;
    });
  };

  // checks google API has loaded before rendering map
  const googleMapChecker = () => {
    // check for maps in case using other google api are being used
    if (!window.google) {
      // loops back round if api hasn't loaded
      setTimeout(googleMapChecker, 100);
    } else {
      // the google maps api is ready to use, render the map
      renderMap();
    }
  };

  // calls googleMapChecker when component loads for the first time
  useEffect(() => {
    googleMapChecker();
  }, []);

  // function which removes large marker
  const removeLargeMarker = () => {
    activeLargeMarker.marker.map = null;
    activeLargeMarker = false;
    setLargeMarker(false);
    setPillStylePrev(currentPillMarker);
    setCurrentPillMarker(false);
  };

  // closes  large marker popout box when map is clicked on - as can't read current state in event listener, so this listener is used as a work around
  mapClickListener.registerListener(function (val) {
    if (val) {
      removeLargeMarker();
    }
  });

  // generates url string and triggers modal showing navigation to roomPage when large marker is clicked
  largeMarkerClickListener.registerListener(function (val) {
    if (val) {
      props.setActiveLink("/hotels/" + activeLargeMarker.markerData.key);
    }
  });

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
                    transition:
                      "transform 850ms cubic-bezier(0.25, 1, 0.5, 1) 0s",
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
                              {props.expandMapView ? (
                                <path d="m12 4 11.2928932 11.2928932c.3905243.3905243.3905243 1.0236893 0 1.4142136l-11.2928932 11.2928932"></path>
                              ) : (
                                <path d="m20 28-11.29289322-11.2928932c-.39052429-.3905243-.39052429-1.0236893 0-1.4142136l11.29289322-11.2928932"></path>
                              )}
                            </g>
                          </svg>
                        </div>
                        {props.expandMapView ? (
                          <div class="l177lde9 dir dir-ltr">
                            <span class="l1pncren dir dir-ltr">Show list</span>
                          </div>
                        ) : null}
                      </button>
                    </div>
                  </div>
                </div>
                {props.dataLoading || props.pageLoading ? (
                  <Loader
                    largeView={props.largeView}
                    largeMarker={largeMarker}
                  />
                ) : null}
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
      {largeMarker && !props.largeView ? (
        <PopoutBoxSm
          markerData={largeMarker.markerData}
          removeLargeMarker={removeLargeMarker}
          setActiveLink={props.setActiveLink}
        />
      ) : null}
    </div>
  );
}

export default ResultsMap;
