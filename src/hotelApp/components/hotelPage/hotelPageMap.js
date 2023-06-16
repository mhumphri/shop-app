import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

// holds google maps object (outside react function to prevent re-rendering)
let map;

function RoomPageMap(props) {
  // boolean which indicates if the google map has been loaded
  const [mapLoaded, setMapLoaded] = useState();

  // assigns value for map id (api and html)
  let mapId = "mappy";
  if (props.modal) {
    mapId = "modalMappy";
  }

  // creates new google map
  const renderMap = () => {
    let center = {
      lat: 51.5,
      lng: 0,
    };
    if (props.coords) {
      center = {
        lat: parseFloat(props.coords.lat),
        lng: parseFloat(props.coords.lng),
      };
    }

    let zoom = 13;
    map = new window.google.maps.Map(document.getElementById(mapId), {
      zoom: zoom,
      center: center,
      mapId: mapId,
      disableDefaultUI: true,
      draggable: false,
      zoomControl: false,
      scrollwheel: false,
      disableDoubleClickZoom: true,
    });
    // sets mapLoaded variable to true when first idle event occurs (which then enables adding of markers inside the react component)
    window.google.maps.event.addListenerOnce(map, "idle", function () {
      setMapLoaded(true);
    });

    const marker = new window.google.maps.marker.AdvancedMarkerView({
      map,
      content: houseMarkerContent(),
      position: center,
    });
  };

  function houseMarkerContent() {
    const content = document.createElement("div");

    content.innerHTML = `
    <div>
      <div class="location-map-fa2">
    </div>
    <div class="location-map-hg5">
      <div
        class="location-map-ckc"
      >
      <div
        class="location-map-cy9"
      >
        <div
          class="location-map-c16"
        >
              <svg
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
                class="location-map-ld2"
                aria-hidden="true"
                role="presentation"
                focusable="false"
              >
                <path d="M8.602 1.147l.093.08 7.153 6.914-.696.718L14 7.745V14.5a.5.5 0 0 1-.41.492L13.5 15H10V9.5a.5.5 0 0 0-.41-.492L9.5 9h-3a.5.5 0 0 0-.492.41L6 9.5V15H2.5a.5.5 0 0 1-.492-.41L2 14.5V7.745L.847 8.86l-.696-.718 7.153-6.915a1 1 0 0 1 1.297-.08z"></path>
              </svg>



        </div>


      </div>
      </div>
    </div>

    `;

    return content;
  }

  // checks google API has loaded before rendering map
  const googleMapChecker = () => {
    // check for maps in case you're using other google api
    if (!window.google) {
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

  return (
    <div
      id={mapId}
      style={{
        height: "100%",
        backgroundColor: "rgb(230, 227, 223)",
        position: "relative",
        overflow: "hidden",
      }}
    ></div>
  );
}

export default RoomPageMap;
