import React, { useState, useEffect, useRef } from "react";
import PopoutBoxSm from "./popoutBoxSm";
import getCountryPolygons from "../functions/getCountryPolygons";
import randomNumberInRange from "../functions/randomNumberInRange";
import { calcLngDiff } from "../functions/calcLngDiff";
import bbox from "@turf/bbox";
import Loader from "./loader";
import "../css/resultsMap.css";
import HouseS1 from "../../images/birds/bird1.jpg";

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
let markers = [];
// boolean which indicates if have all been loaded
// let markersLoaded;
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

// sets up listener for clicks on largeMarker - state can't be used in the event listener directly, so this is a workaround
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
  //ref for map container - used to calculate size of div
  const mapContainer = useRef(null);
  // boolean which indicates if the google map has been loaded
  const [mapLoaded, setMapLoaded] = useState();
  // object which holds map bounds, map center, map zoom, map box rectangle and map margin
  const [mapDimensions, setMapDimensions] = useState();
  //
  const [largeMarker, setLargeMarker] = useState();
  // keeps log of currently active pill marker
  const [currentPillMarker, setCurrentPillMarker] = useState();
  // keeps log of currently active pill marker
  const [prevPillMarker, setPrevPillMarker] = useState();
  // keeps log of currently active pill marker
  const [markerState, setMarkerState] = useState({});
  // keeps log of currently active pill marker
  const [markersLoaded, setMarkersLoaded] = useState();
  // keeps log of currently active pill marker
  const [hoverHotelLocal, setHoverHotelLocal] = useState();

  // COULD BE RATIONALISED? ?? highlights map marker when it is active (hover) in searchListLg.js and vice versa
  useEffect(() => {
    if (markersLoaded) {
      if (hoverHotelLocal) {
        const prevResultSelector = getMarkerSelector(hoverHotelLocal)
        if (prevResultSelector) {
        prevResultSelector.style.backgroundColor = "white";
        prevResultSelector.style.color = "black";
      }
        const prevMarkerObject = getMarkerObject(hoverHotelLocal)
      if (prevMarkerObject) {
        prevMarkerObject.element.style.zIndex = 0
      }
      }
  if (props.hoverHotel) {
        const activeResultSelector = getMarkerSelector(props.hoverHotel);
        if (activeResultSelector) {
        activeResultSelector.style.backgroundColor = "black";
        activeResultSelector.style.color = "white";
      }
        const markerObject = getMarkerObject(props.hoverHotel)
        if (markerObject) {
        markerObject.element.style.zIndex = 1;
        setHoverHotelLocal(props.hoverHotel)
      }
      }
    }
  }, [props.hoverHotel]);

  let mapCenter = {
    lat: 48.6,
    lng: 0,
  };
  let mapZoom = 5;

  useEffect(() => {
    if (!props.dataLoading && !props.pageLoading) {
      console.log("HOTEL ARRAY UPDATE");
      updateMarkers();
    }
  }, [props.dataLoading, props.pageLoading]);

  // refreshes markers when largeView state changes (so that popout box render updates)
  useEffect(() => {
          if (markersLoaded) {
      if (!props.largeView) {
        if (largeMarker) {
       largeMarker.marker.map = null;
     }

        updateMarkers("refresh")
      }
      else {
        // addLargeMarker(largeMarker.markerData);
        updateMarkers("refresh")
      }
    }

  }, [props.largeView]);

  // deletes current markers
  const deleteMarkers = (keysObject, refresh) => {
    /*
  for (let i = 0; i < markers.length; i++) {
    if (!keysObject[markers[i].markerData.key]) {
     markers[i].marker.map = null;
   }
  }
  */

// let newMarkerState = {...markerState}

    // if refresh set to true, all markers are deleted (as the render for large marker is different)
    if (refresh) {

      var i = markers.length;
      while (i--) {
      /*  if (newMarkerState[markers[i].markerData.key]) {
          delete newMarkerState[markers[i].markerData.key]
        } */
        if (markers[i].markerData.key)

        markers[i].marker.map = null;
        markers.splice(i, 1);
      }
    }
    // if refresh is false, only markers for hotels which are not in both the previous array and new array are deleted
    else {
      var i = markers.length;
      while (i--) {
        if (!keysObject[markers[i].markerData.key]) {
      /*    if (newMarkerState[markers[i].markerData.key]) {
            delete newMarkerState[markers[i].markerData.key]
          } */
          markers[i].marker.map = null;
          markers.splice(i, 1);

        }
      }
    }

  //  setMarkerState(newMarkerState)



    //  markers=[]
    /*  if (activeLargeMarker) {
  activeLargeMarker.marker.map = null;
  activeLargeMarker = false;
}
*/
  };

  // updates markers using latest roomData array
  const updateMarkers = (refresh) => {

    /*
if (markersLoaded) {
  markersLoaded = false
 deleteMarkers()
}
*/


// initialise variables
  let currentMarkerRetained
  let prevMarkerRetained
  let largeMarkerRetained
    let keysObject = {};
     let newMarkerState = {}


    // (1) loop through current hotel data array and create object with all keys
    // (2) check if stored currentMarker and prevMarker keys appear in current hotelArray - if not reset currentMarker and prevMarker values
    // (3) check if keys stored in markerState appear in current hotelArray - if so retain those object properties in updated markerState object
    for (let i = 0; i < props.hotelArray.length; i++) {
      // add current element key to keys object
      keysObject[props.hotelArray[i].key] = true;
      // if current element key matches currentPillMarker state, set currentMarkerRetained to true
      if (currentPillMarker===props.hotelArray[i].key) {
        currentMarkerRetained=true
      }
      // if current element key matches prevPillMarker state, set prevMarkerRetained to true
      if (prevPillMarker===props.hotelArray[i].key) {
        prevMarkerRetained=true
      }
      // check if keys stored in markerState appear in current hotelArray - if they do, copy them across to newMarkerState
      if (markerState[props.hotelArray[i].key]) {
        newMarkerState[props.hotelArray[i].key]=markerState[props.hotelArray[i].key]
      }
      if (largeMarker) {
      if (largeMarker.markerData.key===props.hotelArray[i].key) {
        console.log("LARGE_MARKER_KEY_MATCH")
        largeMarkerRetained=true
      }
    }
    }

    // prev pill marker is not contained in current hotel data array, set prevPillMarker state to false
    if (!currentMarkerRetained) {
      setCurrentPillMarker(false)
    }

    // current pill marker is not contained in current hotel data array, set currentPillMarker state to false
        if (!prevMarkerRetained) {
          setPrevPillMarker(false)
        }

        // if large marker is not contained in current hotel data array, set largeMarker state to false
     if (!largeMarkerRetained && largeMarker) {
              activeLargeMarker.marker.map = null;
              activeLargeMarker = false;
              setLargeMarker(false);

            }

    // update MarkerState state
    setMarkerState(newMarkerState)


    // delete markers which do not appear in the current hotelArray (or delete all in the case of refresh)
    deleteMarkers(keysObject, refresh);


    // if refresh, add new pill map markers for all elements of hotelArray
    if (refresh) {
      for (let i = 0; i < props.hotelArray.length; i++) {
        addPillMarker(props.hotelArray[i], refresh);
      }
    }
// if refresh, add new pill map markers for all elements of hotelArray which are not in keyArray
    else {
      // residualKeysObject stores keys of map markers which have not been deleted
      let residualKeysObject = {};
      for (let i = 0; i < markers.length; i++) {
        residualKeysObject[markers[i].markerData.key] = true;
      }
      // map amrkers added for elements of hotel array, with undeleted markers from previous hotel array filtered out
      for (let i = 0; i < props.hotelArray.length; i++) {
        if (!residualKeysObject[props.hotelArray[i].key]) {
          addPillMarker(props.hotelArray[i]);
        }
      }
    }

    if (largeMarker && refresh && props.largeView) {
      console.log("activeLarge1")
      addLargeMarker(largeMarker.markerData);
    }

    if (!markersLoaded) {
      setMarkersLoaded(true)
    }
  };

  // creates a pill marker (there is one for every property in roomArray)
  const addPillMarker = (markerData, refresh) => {


    const createNewMarker = () => {
      function pillMarkerContent(markerData) {


        let pillBackground = "#FFFFFF"
        let pillColor = "#222222"
        let pillzIndex = 0
        let pillBoxShadow = "rgba(255, 255, 255, 0.18) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0.18) 0px 2px 4px"

        if (markerState[markerData.key]==="prev") {
          pillBackground = "#EBEBEB"
          pillColor = "#222222"
          pillzIndex = 0
          pillBoxShadow = "0 0 0 1px #B0B0B0 inset"
        }

        if (markerState[markerData.key]==="current") {
          pillBackground = "black"
          pillColor = "#FFFFFF"
          pillzIndex = 1
          pillBoxShadow = "rgba(255, 255, 255, 0.18) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0.18) 0px 2px 4px"
        }



        const content = document.createElement("div");

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

      /* creates marker object */
      const newMarker = new window.google.maps.marker.AdvancedMarkerView({
        map,
        content: pillMarkerContent(markerData),
        position: markerData.coords,
      });

      /* adds large marker (which shows more detail for property) when pill marker is clicked */
      newMarker.addListener("click", (event) => {
        clickPill(markerData, newMarker);
        addLargeMarker(markerData);
      });

      markers.push({ marker: newMarker, markerData: markerData });
    };

    if (refresh) {
      createNewMarker();
    } else {
      // random delay & timeout creates impression of loading from server
      let randomDelay = randomNumberInRange(200, 1000);

      setTimeout(() => {
        createNewMarker();
      }, randomDelay);
    }
  };

  // creates css selector for a given property key
  const getMarkerSelector = (markerKey) => {
    const selectorName = "." + markerKey;
    const newSelector = document.querySelector(
      selectorName
    );
    return newSelector
  }


const setPillStyleCurrent = (markerKey, marker) => {
  const activeResultSelector = getMarkerSelector(markerKey);
  if (activeResultSelector) {
  activeResultSelector.style.backgroundColor = "black";
  activeResultSelector.style.color = "white";
  marker.element.style.zIndex = 1;

    }
}

const setPillStylePrev = (markerKey) => {
  const prevResultSelector = getMarkerSelector(markerKey)
  if (prevResultSelector) {
  prevResultSelector.style.backgroundColor = "#EBEBEB";
  prevResultSelector.style.color = "#222222";
  prevResultSelector.style.boxShadow ="0 0 0 1px #B0B0B0 inset";
}
const prevMarkerObject = getMarkerObject(markerKey)
if (prevMarkerObject) {
prevMarkerObject.element.style.zIndex = 0
}

}

  // handles user click on pill marker - changes newly selected maker style and also stores crrently selected marker in state (which triggers re-tyling of prev selected marker)
  function clickPill(markerData, marker) {

        setPillStyleCurrent(markerData.key, marker)
        setCurrentPillMarker(markerData.key)

  }

  // updates styling of previously active pill marker and variable recording previous marker state - needs to be split out as state doesn't update in google map objects
  useEffect(() => {
    if (currentPillMarker) {
    if (!prevPillMarker) {
      setPrevPillMarker(currentPillMarker)

      let newMarkerState = {...markerState}
      newMarkerState[currentPillMarker] = "current"
      setMarkerState(newMarkerState)
    }
    else {
      setPillStylePrev(prevPillMarker)
  /*    const prevResultSelector = getMarkerSelector(prevPillMarker)
      if (prevResultSelector) {
      prevResultSelector.style.backgroundColor = "#EBEBEB";
      prevResultSelector.style.color = "#222222";
      prevResultSelector.style.boxShadow ="0 0 0 1px #B0B0B0 inset";
    } */

    let newMarkerState = {...markerState}
    newMarkerState[currentPillMarker] = "current"
    newMarkerState[prevPillMarker] = "prev"
    setMarkerState(newMarkerState)

    /*
      const prevMarkerObject = getMarkerObject(prevPillMarker)
      if (prevMarkerObject) {
      prevMarkerObject.element.style.zIndex = 0

    }
    */
    setPrevPillMarker(currentPillMarker)
    }
  }
  }, [currentPillMarker]);

  // retrives marker object for a given property key
  const getMarkerObject = (markerKey) => {
    let matchingMarkerObject
    for (let i=0; i<markers.length; i++) {
      if (markerKey===markers[i].markerData.key) {
        matchingMarkerObject = markers[i].marker
      }
    }
    return matchingMarkerObject
  }



  // Creates large popout marker to the map (which gives more details on the currently selected pill marker + link)
  const addLargeMarker = (markerData) => {

    if (activeLargeMarker) {
      console.log("activeLarge2")
      activeLargeMarker.marker.map = null;
      activeLargeMarker = false;
      setLargeMarker(false);
    }

    const newMarker = new window.google.maps.marker.AdvancedMarkerView({
      map,
      content: largeMarkerContent(markerData),
      position: markerData.coords,
    });

    newMarker.element.style.zIndex = 10

    newMarker.addListener("click", (event) => {
      largeMarkerClickListener.current=true
    });

    activeLargeMarker = { marker: newMarker, markerData: markerData };
    setLargeMarker({ marker: newMarker, markerData: markerData });
  };

  // calculates position and generates html content for large marker
  function largeMarkerContent(markerData) {

    const mapBounds = map.getBounds();
    const neCoords = mapBounds.getNorthEast(); // Coords of the northeast corner
    const swCoords = mapBounds.getSouthWest(); // Coords of the southwest corner

    const content = document.createElement("div");

    let containerWidth = 327;
    let minMargin = 35;

    let adjustment = 0;
    const mapBox = mapContainer.current.getBoundingClientRect();

    const lhsLngDiff = calcLngDiff(swCoords.lng(), markerData.coords.lng)
    const lngWidth = calcLngDiff(swCoords.lng(),neCoords.lng())
    const lhsPxDiff = mapBox.width * (lhsLngDiff/lngWidth)
    const rhsPxDiff = mapBox.width - lhsPxDiff

    let horizontalAdj = 0

    if (lhsPxDiff < containerWidth / 2 + minMargin) {
      horizontalAdj = containerWidth / 2 - (lhsPxDiff - minMargin);
    }
    if (rhsPxDiff < containerWidth / 2 + minMargin) {
      horizontalAdj = -(containerWidth / 2 - (rhsPxDiff - minMargin));
    }


    let verticalAdj
    let verticalPercentage
    const mapCenter = map.getCenter();

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

    const largeMarkerPos =
      "translate(calc(-50% + " +
      horizontalAdj +
      "px), calc(" +
      verticalPercentage +
      "% + " +
      verticalAdj +
      "px))";

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

  useEffect(() => {
    if (props.searchLocation && props.searchLocation !== "map area") {
      console.log("LOCATION UPDATE");
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
    console.log("RENDER MAP!");
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
      mapTypeId: "terrain",
    });
    /* sets mapLoaded variable to true when first idle event occurs (which then enables adding of markers inside the react component) */
    window.google.maps.event.addListenerOnce(map, "idle", function () {
      setMapLoaded(true);
    });
    // updates stored map bounds, center, zoom etc when map bounds change
    window.google.maps.event.addListener(map, "idle", function () {
      props.setMapParameters({
        bounds: map.getBounds(),
        center: map.getCenter(),
        zoom: map.getZoom(),
        box: mapContainer.current.getBoundingClientRect(),
      });
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
      console.log("activeLarge3")
      /*
      activeLargeMarker.marker.map = null;
      activeLargeMarker = false;
      setLargeMarker(false);
      */
      // getter/setter trigrers  of state (turning off) / style for active marker - can't be done inside event listener as can't access state here
      mapClickListener.current = true;
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

  const removeLargeMarker = () => {
    activeLargeMarker.marker.map = null;
    activeLargeMarker = false;
    setLargeMarker(false);
    setPillStylePrev(currentPillMarker)
    setCurrentPillMarker(false)
  }

  // sets drawer down and closes popout box when map is clicked on - as can't read current state in event listener, so this listener is used as a work around
  mapClickListener.registerListener(function (val) {
    if (val) {
      removeLargeMarker()
  }
  });

  // generates url string and triggers navigation to roomPage when large marker is clicked
  largeMarkerClickListener.registerListener(function (val) {
    if (val) {
      props.setActiveLink("/hotels/" + activeLargeMarker.markerData.key)
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
                {props.dataLoading || props.pageLoading ? <Loader largeView={props.largeView} largeMarker={largeMarker} /> : null}
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
        <PopoutBoxSm markerData={largeMarker.markerData} removeLargeMarker={removeLargeMarker} setActiveLink={props.setActiveLink} />
      ) : null}
    </div>
  );
}

export default ResultsMap;
