
        {props.searchLocation ? props.searchLocation : "Where to?" }

    props.setSearchLocation(newCountry)

if (countryInput!==props.searchLocation) {
  setCountryInput(props.searchLocation)

////

state.deviceData.screenHeight);
const screenWidth = useSelector((state) => state.deviceData.screenWidth);

//////

// bounds, center, zoom, container postion of the currently visible map
const [mapDimensions, setMapDimensions] = useState();
// records a selection of variables relevant to map state (bounds, zoom, container postion, screen mapDimensions, map view). Is updated when map updates
const [mapState, setMapState] = useState();
// position of map container on screen
const [mapBox, setMapBox] = useState();
// current stored search location (either country name or "map area")
const [searchLocation, setSearchLocation] = useState();

/////

// add random coordinates to each of the properties in the array
/*
if (activePolygons.length > 0) {
  for (let i = 0; i < newRoomArray.length; i++) {
    const newCoords = getRandomCoords(
      currentState.mapBounds,
      currentState.mapBox,
      50,
      activePolygons
    );

    let newRoomObject = { ...newRoomArray[i] };
    newRoomObject.coords = newCoords;
    finalRoomArray.push(newRoomObject);
  }
} else {
  finalRoomArray = [];
}
*/

/////

const updateMapState = (bounds, center, zoom, box) => {
  /*
  console.log("update map dimesnions")
  console.log("bounds: " + bounds)
  console.log("center: " + center)
  console.log("zoom: " + zoom)
  console.log("box: " + box)

  const newMapDimensions = {
    bounds: bounds,
    center: center,
    zoom: zoom,
    box: box,
  }
  setMapDimensions(newMapDimensions)
*/
}

/*
useEffect(() => {
console.log("MAP DIMESNIONS CHANGED!")
}, [mapDimensions]);
*/

////

<SearchMapNav searchLocation={searchLocation} setSearchLocation={setSearchLocation} />

////

<LargeMap expandMapView={expandMapView} toggleMapView={toggleMapView} updateMapState={updateMapState} searchLocation={searchLocation} />

////

console.log("MAP UPDATE!!!")
/*      props.updateMapState(map.getBounds(), map.getCenter(), map.getZoom(), mapContainer.current.getBoundingClientRect())
setMapDimensions(
  {
    mapBounds: map.getBounds(),
    mapCenter: map.getCenter(),
    mapZoom: map.getZoom(),
    mapBox: mapContainer.current.getBoundingClientRect(),
    mapMarginPx: 50,
  }
) */
// props.setMapBounds(map.getBounds())
// props.updateMapDimensions(map.getBounds(), map.getCenter(), map.getZoom(), mapContainer.current.getBoundingClientRect())


////

import getCountryPolygons from "../functions/getCountryPolygons";
import bbox from "@turf/bbox";

//////

// add random coordinates to each of the properties in the array
/*
if (activePolygons.length > 0) {
  for (let i = 0; i < newRoomArray.length; i++) {
    const newCoords = getRandomCoords(
      currentState.mapBounds,
      currentState.mapBox,
      50,
      activePolygons
    );

    let newRoomObject = { ...newRoomArray[i] };
    newRoomObject.coords = newCoords;
    finalRoomArray.push(newRoomObject);
  }
} else {
  finalRoomArray = [];
}
*/


////

useEffect(() => {
if (props.searchLocation) {
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

const newMapState = {
  bounds: bounds,
  center: center,
  zoom: zoom,
  box: box,
  screenDimensions: [screenWidth, screenHeight],
  expandMapView: expandMapView,
  searchLocation, searchLocation,
}

\// this sets data for rooms returned  after search and also generates coordinates for map markers taking accoutn of map bounds, map margins, land polygons, location choice, screen configuration (i.e. is drawer up or down)
const setRoomArray = (currentState) => {
  // random select 18 rooms
  let newRoomArray = randomSelectRooms(18);
  let finalRoomArray = [];

  // if fewer than 18 rooms required for active search page, delete the difference
  if (currentState.maxPages === currentState.activePage) {
    const elemsToDelete =
      currentState.maxPages * 18 - currentState.totalRooms.postFilter;
    newRoomArray.splice(newRoomArray.length - elemsToDelete, elemsToDelete);
  }

  // calc active map polygons based on currently stored map bounds and location prefs
  let activePolygons;
  if (currentState.mapBounds) {
    if (currentState.largeView) {
      activePolygons = getActivePolygons(
        currentState.mapBounds,
        currentState.mapCenter,
        currentState.drawerDown
      );
    } else {
      activePolygons = getActivePolygonsSm(
        currentState.mapBounds,
        currentState.mapCenter,
        currentState.drawerDown
      );
    }
    if (currentState.location && currentState.location !== "map area") {
      activePolygons = [getCountryPolygon(currentState.location)];
    }

    // add random coordinates to each of the properties in the array
    if (activePolygons.length > 0) {
      for (let i = 0; i < newRoomArray.length; i++) {
        const newCoords = getRandomCoords(
          currentState.mapBounds,
          currentState.mapBox,
          currentState.mapMarginPx,
          activePolygons
        );

        let newRoomObject = { ...newRoomArray[i] };
        newRoomObject.coords = newCoords;
        finalRoomArray.push(newRoomObject);
      }
    } else {
      finalRoomArray = [];
    }
  }

  return finalRoomArray;
};
