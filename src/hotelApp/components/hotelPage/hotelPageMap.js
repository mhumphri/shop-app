import React, { useEffect, useLayoutEffect, useRef, useState } from "react";



// holds google map object
let map2;

function RoomPageMap(props) {
  // boolean which indicates if the google map has been loaded





  //  controls delay for individual search result (adding on small random additonal delay) when props.listItemLoading in the parent component (resultsList.js) updates


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
    if (props.hotelData.coords) {
      center = props.hotelData.coords
    }
/*
    if (props.coords) {
      center = {
        lat: parseFloat(props.coords.lat),
        lng: parseFloat(props.coords.lng),
      };
    }
    */

    let zoom = 15;
    map2 = new window.google.maps.Map(document.getElementById(mapId), {
      zoom: zoom,
      center: center,
      mapId: mapId,
      disableDefaultUI: true,
      draggable: false,
      zoomControl: false,
      scrollwheel: false,
      disableDoubleClickZoom: true,
    });
    /* sets mapLoaded variable to true when first idle event occurs (which then enables adding of markers inside the react component) */


    const marker = new window.google.maps.Marker({
  position: center,
  map2,
  title: "Hello World!",
});





marker.setMap(map2)


  };



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
