import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import ResultsMap from "./resultsMap";
import ResultsList from "./resultsList";
import SearchMapNav from "./searchMapNav";
import SearchMapFooter from "./searchMapFooter";
import shuffleArray from "../functions/shuffleArray";
import getActivePolygons from "../functions/getActivePolygons";
import getCountryPolygons from "../functions/getCountryPolygons";
import getRandomCoords from "../functions/getRandomCoords";
import calcLandArea from "../functions/calcLandArea";
import generateKey from "../functions/generateKey";
import randomNumber from "../functions/randomNumber";
import { hotelData } from "../data/hotelData";
import "../css/searchMap.css";

//

function SearchMap(props) {

  // large view (boolean indicating if app currently in large view) and screen height (stored in redux)
  const largeView = useSelector((state) => state.deviceData.largeView);
  const screenHeight = useSelector((state) => state.deviceData.screenHeight);
  const screenWidth = useSelector((state) => state.deviceData.screenWidth);

  // boolean indicating if expanded map view is on
  const [expandMapView, setExpandMapView] = useState();

  // bounds of the currently visible map
  const [mapBounds, setMapBounds] = useState();

  // params of the currently visible map
  const [mapParameters, setMapParameters] = useState();


  // bounds of the currently visible map
  const [mapState, setMapState] = useState();

  // bounds of the currently visible map
  const [resize, setResize] = useState(0);

  // current stored search location (either country name or "map area")
  const [searchLocation, setSearchLocation] = useState("");
  // current stored search location (either country name or "map area")
  const [searchLocationUpdate, setSearchLocationUpdate] = useState();

  // bounds of the currently visible map
  const [hotelArray, setHotelArray] = useState([]);

  // Boolean indicating if first load of app is taking place
  const [firstLoad, setFirstLoad] = useState(true);

  // total number of hotels returned by a search
  const [numberHotels, setNumberHotels] = useState();

  // max number of pages in ResultsList
  const [maxPages, setMaxPages] = useState();

  // boolean set to true when new search data is loading
  const [dataLoading, setDataLoading] = useState();

  // boolean set to true when data for a new search page is loading (different from dataLoading as number of search results / max pages doesn't update)
  const [pageLoading, setPageLoading] = useState();

  // stores currently active page (which is shown / controlled by paginationNav)
  const [activePage, setActivePage] = useState(1);





  /* listens for screen re-size and updates screen width variable */
  useEffect(() => {
    window.addEventListener("resize", () => {
      setResize(Date.now())
    });
    return () => {
      window.removeEventListener("resize", () => {
          console.log("resize finish")
      });
    };
  }, []);


const updateSearchLocation = (newLocation) => {
  setSearchLocation(newLocation)
  setSearchLocationUpdate(true)
}

//
const triggerDataLoading = () => {
  setDataLoading(true)
    setTimeout(() => {
      setDataLoading(false)
    }, "1300");
}

const triggerPageLoading = () => {
  setPageLoading(true)
    setTimeout(() => {
      setPageLoading(false)
    }, "1300");
}

useEffect(() => {






// FIRST STEP - GENERATE TOTAL NUMBER OF HOTELS!!!

const getHotelNumber = (activePolygons) => {
  const landArea = calcLandArea(activePolygons)
  return Math.round(landArea /10000000 * randomNumber(5,30))
}

const updateHotelAndPages = (newNumberHotels) => {
  setNumberHotels(newNumberHotels)
  let newMaxPages = Math.ceil(newNumberHotels / 18);
  if (newMaxPages > 15) {
    newMaxPages = 15;
  }
  setMaxPages(newMaxPages)
  setActivePage(1)
}



if (searchLocationUpdate) {
triggerDataLoading()
  console.log("location update: " + searchLocation)
const activePolygons = [getCountryPolygons(searchLocation)];
setHotelArray(generateHotelArray(18, activePolygons, true))
setSearchLocationUpdate(false)
updateHotelAndPages(getHotelNumber(activePolygons))

}
else {
  if (!firstLoad) {
    setSearchLocation("map area")
  }


const msSinceResize = Date.now() - resize

if (mapParameters &&  msSinceResize>500) {



const activePolygons = getActivePolygons(mapParameters.bounds);
const landArea = calcLandArea(activePolygons)
console.log("landArea: " + landArea)

let existingHotels = 0

const boundsLatLo = mapParameters.bounds.eb.lo
const boundsLatHi = mapParameters.bounds.eb.hi
const boundsLngLo = mapParameters.bounds.La.lo
const boundsLngHi = mapParameters.bounds.La.hi

    for (let i=0; i<hotelArray.length; i++) {

      const hotelLat = hotelArray[i].coords.lat
      const hotelLng = hotelArray[i].coords.lng

        if (hotelLat>boundsLatLo && hotelLat<boundsLatHi && hotelLng>boundsLngLo && hotelLng<boundsLngHi ) {
          existingHotels++
        }
    }

console.log("existingHotels: " + existingHotels )



const additionalHotels = getHotelNumber(activePolygons)
console.log("additionalHotels: " + additionalHotels)
const newNumHotels = existingHotels + additionalHotels
console.log("newNumHotels: " + newNumHotels)
updateHotelAndPages(newNumHotels)


console.log("numberHotels: " + numberHotels)
let hotelsInArray = 18
if (newNumHotels<18) {
  hotelsInArray=newNumHotels
}

console.log("hotelsInArray: " + hotelsInArray)

if (activePolygons.length > 0) {

if (!mapState) {
  triggerDataLoading()
  setHotelArray(generateHotelArray(hotelsInArray, activePolygons))
}

else {

  let refresh = false
  if (mapParameters.zoom<mapState.zoom) {
    console.log("REFRESH")
    refresh = true
  }
  if (expandMapView=== mapState.expandMapView)
{
  triggerDataLoading()
  setHotelArray(generateHotelArray(hotelsInArray, activePolygons, refresh))
}
}
}
else {
  triggerDataLoading()
  setHotelArray([])

}

const newMapState = {
  bounds: mapParameters.bounds,
  center: mapParameters.center,
  zoom: mapParameters.zoom,
  box: mapParameters.box,
  expandMapView: expandMapView,
}
setMapState(newMapState)





}
}




}, [mapParameters]);







  // boolean controlling visibility of map button (if page scrolled right down beyond limit of listcontainer, the button is not rendered)
  const [mapButtonActive, setMapButtonActive] = useState();

  const [searchListStyle, setSearchListStyle] = useState("fmdphkf dir dir-ltr");
  const [mapStyle, setMapStyle] = useState("m1ict9kd dir dir-ltr");
  // ref for outer container of results list (used for controlling visibility of "show list" / "show map" button)
  const listContainerRef = useRef(null);


  // randomly selects a given number of rooms from roomData array
  function randomSelectHotels(number) {
    let newHotelArray = [...hotelData];
    let i = newHotelArray.length;
    while (i > number) {
      const random = Math.floor(Math.random() * newHotelArray.length);
      newHotelArray.splice(random, 1);
      i--;
    }
    shuffleArray(newHotelArray);
    return newHotelArray;
  }

  // this sets data for rooms returned  after search and also generates coordinates for map markers taking accoutn of map bounds, map margins, land polygons, location choice, screen configuration (i.e. is drawer up or down)

  const generateHotelArray = (numHotels, activePolygons, refresh) => {
    console.log("generateHotelArray")
    setFirstLoad(false)

    let newHotelArray = []

if (!refresh) {

    let prevHotelArray = [...hotelArray]

    const boundsLatLo = mapParameters.bounds.eb.lo
    const boundsLatHi = mapParameters.bounds.eb.hi
    const boundsLngLo = mapParameters.bounds.La.lo
    const boundsLngHi = mapParameters.bounds.La.hi



        for (let i=0; i<prevHotelArray.length; i++) {

          const hotelLat = prevHotelArray[i].coords.lat
          const hotelLng = prevHotelArray[i].coords.lng


            if (hotelLat>boundsLatLo && hotelLat<boundsLatHi && hotelLng>boundsLngLo && hotelLng<boundsLngHi ) {
              newHotelArray.push(prevHotelArray[i])
            }





        }

      }



const currentArrayLength = newHotelArray.length

    for (let i=currentArrayLength; i<numHotels; i++) {
      console.log("NEWHOTEL: " + i)
      const newHotel = {
        key: generateKey(12),
        coords: getRandomCoords(
          mapParameters.bounds,
          mapParameters.box,
          50,
          activePolygons
        ),
      }
      newHotelArray.push(newHotel)

    }











    return newHotelArray;
  };




  useEffect(() => {

    const handleScroll = (event) => {

      const listContainerBottom = listContainerRef.current.getBoundingClientRect().bottom
      if (listContainerBottom < screenHeight-70) {
        setMapButtonActive(false)
      }
      else {
        setMapButtonActive(true)
      }
        /* if (searchbarRef.current && !searchbarRef.current.contains(event.target)) {
            setActiveSearch(false);
            if (countryInput!==countryInputStored) {
              setCountryInput(countryInputStored)
            }
        } */
    };

      document.addEventListener('scroll', handleScroll, true);
      return () => {
          document.removeEventListener('scroll', handleScroll, true);
      };
  });

const toggleMapView = () => {

  if (expandMapView) {
    setExpandMapView(false)
    if (window.innerWidth>=950) {

 setSearchListStyle("fmdphkf f1lf7snk dir dir-ltr")
setMapStyle("m1ict9kd m7lqfs3 dir dir-ltr")
setTimeout(() => {
 setSearchListStyle("fmdphkf dir dir-ltr")
  setMapStyle("m1ict9kd m12odydq dir dir-ltr")
  }, "850");
}

else {
  setSearchListStyle("fmdphkf dir dir-ltr")
   setMapStyle("m1ict9kd m12odydq dir dir-ltr")
}



  }
  else {
    setExpandMapView(true)
  setSearchListStyle("fmdphkf fgnm67p f1lf7snk dir dir-ltr")
  setMapStyle("m1ict9kd m1k84ca2 dir dir-ltr")

}
}


// PAGINATION CONTROLS


const goToPage = (number) => {
  console.log("GO TO PAGE: " + number)

  let activePolygons = getActivePolygons(mapParameters.bounds);
  if (searchLocation!=="map area" && searchLocation!=="") {
    activePolygons = [getCountryPolygons(searchLocation)];
  }



  let hotelsInArray = 18
  if (number===maxPages && maxPages<15) {
    hotelsInArray = numberHotels - (maxPages-1)*18
    console.log("hotelsInArray: " + hotelsInArray)
  }

    triggerPageLoading()
  setHotelArray(generateHotelArray(hotelsInArray, activePolygons, true))



  if (number<=maxPages) {
    setActivePage(number)
  }
}



  return (
<div className="search-map-nr6">
<SearchMapNav searchLocation={searchLocation} updateSearchLocation={updateSearchLocation}  />
<main className="search-map-cy5">

  <div class="_1hytef3">
    <div class="_fo8j1u0">
    {expandMapView ? <button
        type="button"
        class="_174uh40 l1j9v1wn dir dir-ltr"
        onClick={toggleMapView}
      >
        <span class="_7u66d2">
          <span class="_r16tng">Show list</span>
          <div class="_hqsu3j">
            <svg
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                display: "block",
                height: "16px",
                width: "16px",
                fill: "rgb(255, 255, 255)",
              }}
              aria-hidden="true"
              role="presentation"
              focusable="false"
            >
              <path fill-rule="evenodd" d="M2.5 11.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zM15 12v2H6v-2h9zM2.5 6.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zM15 7v2H6V7h9zM2.5 1.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zM15 2v2H6V2h9z"></path>
            </svg>
          </div>
        </span>
      </button> : null}
      {!expandMapView && mapButtonActive ? <button
          type="button"
          class="_174uh40 l1j9v1wn dir dir-ltr"
          onClick={toggleMapView}
        >
          <span class="_7u66d2">
            <span class="_r16tng">Show map</span>
            <div class="_hqsu3j">
              <svg
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  display: "block",
                  height: "16px",
                  width: "16px",
                  fill: "rgb(255, 255, 255)",
                }}
                aria-hidden="true"
                role="presentation"
                focusable="false"
              >
                <path fill-rule="evenodd" d="M2.5 11.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zM15 12v2H6v-2h9zM2.5 6.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zM15 7v2H6V7h9zM2.5 1.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zM15 2v2H6V2h9z"></path>
              </svg>
            </div>
          </span>
        </button> : null}
    </div>
  </div>

  <div className={searchListStyle}>
    <ResultsList listContainerRef={listContainerRef} numberHotels={numberHotels} dataLoading={dataLoading} activePage={activePage} maxPages={maxPages} goToPage={goToPage} pageLoading={pageLoading} />
  </div>
  <div className={mapStyle}>
<ResultsMap expandMapView={expandMapView} toggleMapView={toggleMapView} setMapBounds={setMapBounds} searchLocation={searchLocation} setMapParameters={setMapParameters} hotelArray={hotelArray} dataLoading={dataLoading} pageLoading={pageLoading} />
  </div>
</main>
{/* largeView ? <SearchMapFooter /> : null */}
</div>


  )


}

export default SearchMap;
