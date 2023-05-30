import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import ResultsMap from "./resultsMap";
import ResultsList from "./resultsList";
import HotelAppNav from "./hotelAppNav";
import LinkModal from "./linkModal";
import getActivePolygons from "../functions/getActivePolygons";
import getCountryPolygons from "../functions/getCountryPolygons";
import getRandomLocation from "../functions/getRandomLocation";
import getOtherPhotos from "../functions/getOtherPhotos";
import calcLandArea from "../functions/calcLandArea";
import generateKey from "../functions/generateKey";
import randomNumberInRange from "../functions/randomNumberInRange";
import getHotelArrayInit from "../functions/getHotelArrayInit";
import mapSearch from "../functions/mapSearch";
import locationSearch from "../functions/locationSearch";
import updatePageSearch from "../functions/updatePageSearch";
import searchRefreshSearch from "../functions/searchRefreshSearch";
import hotelData from "../data/hotelData";
import "../css/hotelApp.css";

// main component for earchPage app - contains homepage and all the logic for generating mock search results in place of server

function HotelApp(props) {
  // large view (boolean indicating if app currently in large view) and screen height (stored in redux)
  const largeView = useSelector((state) => state.deviceData.largeView);
  // viewport height (stored in redux)
  const screenHeight = useSelector((state) => state.deviceData.screenHeight);
  // viewport height (stored in redux)
  const screenWidth = useSelector((state) => state.deviceData.screenWidth);
  // boolean indicating if expanded map view is active
  const [expandMapView, setExpandMapView] = useState(false);
  // params of the currently visible map (bounds, center, zoom and box (position on screen))
  const [mapParameters, setMapParameters] = useState();
  // current stored search location (either country name or "map area")
  const [searchLocation, setSearchLocation] = useState("");
  // boolean which is true if user has updated search location input - used to prevent search being updated in response to map bounds changing from location search
  const [searchLocationUpdate, setSearchLocationUpdate] = useState();
  // array containg data for current search results
  const [hotelArray, setHotelArray] = useState(getHotelArrayInit);
  // Boolean indicating if first load of app is taking place - used to prevent searchLocation variable being set to "map area" when map bounds are first declared
  const [firstLoad, setFirstLoad] = useState(true);
  // total number of hotels returned by search
  const [numberHotels, setNumberHotels] = useState(1000);
  // max number of search pages returned by search (capped at 15)
  const [maxPages, setMaxPages] = useState();
  // boolean set to true when new search data is loading
  const [dataLoading, setDataLoading] = useState(true);
  // boolean set to true when data for a new search page is loading (distinct from dataLoading as number of search results / max pages doesn't update)
  const [pageLoading, setPageLoading] = useState();
  // stores currently active page (which is shown / controlled by paginationNav)
  const [activePage, setActivePage] = useState(1);
  // stores currently active page (which is shown / controlled by paginationNav)
  const [activeLink, setActiveLink] = useState();
  // stores hotel key if mouse currently hovering over in results list - used for highlighting pill marker on map
  const [hoverHotel, setHoverHotel] = useState();
  // boolean which indicates if text input / dropdown(large view) / search modal(small view) are open
  const [activeSearch, setActiveSearch] = useState();
  // holds latest map boundary box returned from server
  const [mapBbox, setMapBbox] = useState();
  // map data saved every time there is a map search - used for update page search
  const [savedMapData, setSavedMapData] = useState();
  // boolean indicating if location search is uderway - used to block a new map search from occuring when the map updates
  const [locationSearchCurrent, setLocationSearchCurrent] = useState();
  // holds key for latest search - used to filter out returns for older searches, if several are active simultaneously
  const [latestSearchKey, setLatestSearchKey] = useState();

  //ref for map container - used to access position / dimensions of map containers
  const mapContainer = useRef(null);

  // updates searchLocation in response to user input and sets searchLocationUpdate boolean to true
  const updateSearchLocation = (newLocation) => {
    setSearchLocation(newLocation.name);
    setSearchLocationUpdate(true);
    const searchData = {location: newLocation,
      mapContainer: mapContainer.current.getBoundingClientRect(),
    }
    makeServerCall("location", searchData)

  };


  // generates number of hotels based on land area implied by active map bounds (more land in scope = more hotels)
  const getHotelNumber = (activePolygons) => {
    const landArea = calcLandArea(activePolygons);
    return Math.round((landArea / 10000000) * randomNumberInRange(5, 30));
  };

  // updates numberHotels state, calcs and updates MaxPages state and resets active page state to 1
  const updateHotelAndPages = (newNumberHotels) => {
    setNumberHotels(newNumberHotels);
    let newMaxPages = Math.ceil(newNumberHotels / 18);
    if (newMaxPages > 15) {
      newMaxPages = 15;
    }
    setMaxPages(newMaxPages);
    setActivePage(1);
  };

  // boolean controlling visibility of map button (if page scrolled right down beyond limit of listcontainer, the button is not rendered)
  const [mapButtonActive, setMapButtonActive] = useState(true);
  // initialises css styles for search list outer container (needed for change of map view)
  const [searchListStyle, setSearchListStyle] = useState("fmdphkf dir dir-ltr");
  // initialises css styles for map outer container (needed for change of map view)
  const [mapStyle, setMapStyle] = useState("m1ict9kd dir dir-ltr");
  // ref for outer container of results list (used for controlling visibility of "show list" / "show map" button)
  const listContainerRef = useRef(null);



  // listens for scroll event (to control visibility of map/list items button in render, as it disappears when scrolled down to pagination nav)
  useEffect(() => {
    const handleScroll = (event) => {
      // get position of bottom of results list container
      const listContainerBottom = listContainerRef.current.getBoundingClientRect()
        .bottom;
      // if bototm of results list container is less than 70px from bottom of viewport map button render is disabled
      if (listContainerBottom < screenHeight - 70) {
        setMapButtonActive(false);
      } else {
        setMapButtonActive(true);
      }
    };

    // initialises and removed scroll event listener
    document.addEventListener("scroll", handleScroll, true);
    return () => {
      document.removeEventListener("scroll", handleScroll, true);
    };
  });

  // controls toggling of map view by changing css styles - between partial screen and full screen if screenwidth >= 950px, and between full screen and not visible if screen width < 950px
  const toggleMapView = () => {
    // if currently in expanded view set expandMapview to false and css updated
    if (expandMapView) {
      setExpandMapView(false);
      // enables scrolling when full map is not enabled (needed for windows chrome/edge browsers where scrollbar changes size of map)
      document.body.style.overflow = "auto";
      document.body.style.position = "static";
      // if screen width is >=950px intermediate step (controlled by timeout) is aded for smooth animation
      if (window.innerWidth >= 950) {
        setSearchListStyle("fmdphkf f1lf7snk dir dir-ltr");
        setMapStyle("m1ict9kd m7lqfs3 dir dir-ltr");
        setTimeout(() => {
          setSearchListStyle("fmdphkf dir dir-ltr");
          setMapStyle("m1ict9kd m12odydq dir dir-ltr");
        }, "850");
      } else {
        setSearchListStyle("fmdphkf dir dir-ltr");
        setMapStyle("m1ict9kd m12odydq dir dir-ltr");
      }
    }
    // if not currently in expanded view set expandMapview to true and css updated
    else {
      setExpandMapView(true);
      // disables scrolling when full map is enabled (needed for windows chrome/edge browsers where scrollbar changes size of map)
      document.body.style.overflow = "hidden";
      document.body.style.position = "relative";
      setSearchListStyle("fmdphkf fgnm67p f1lf7snk dir dir-ltr");
      setMapStyle("m1ict9kd m1k84ca2 dir dir-ltr");
    }
  };

  // handles user inputs from paginationNav
  const goToPage = (number) => {
    setActivePage(number)
    makeServerCall("updatePage")
  };

  const handleNavSearchClick = () => {
    makeServerCall("searchRefresh")
  }

  // updates search results in response to the map moving (either when there is a drag or zoom event )
  const handleMapMove = (newMapParameters, refreshHotels) => {

    console.log("handleMapMove: " + JSON.stringify(newMapParameters));


  };

const makeServerCall = (type, searchData) => {
  // const timeStamp = Date.now()
// IMPLEMENT SEARCK KEY!!!!
  const searchKey = generateKey()
  setLatestSearchKey(searchKey)
  setDataLoading(Date.now())
  // scrolls back to top of resultsList when searchData is returned
    window.scrollTo(0, 0);

  if (type === "map") {
console.log("map server call")
    if (savedMapData) {
      searchData.prevZoom = savedMapData.zoom
    }




if (locationSearchCurrent) {
  setLocationSearchCurrent(false)
}
else {

    setTimeout(() => {
      let newSearchResults
      // if first time loading, ignore the initial dummy hotel array and set firstLoad to false
      if (firstLoad) {
        newSearchResults = mapSearch(searchData, []);
      }
      else {
        newSearchResults = mapSearch(searchKey, searchData, hotelArray);
        setSearchLocation("map area");
      }
      setHotelArray(newSearchResults.hotelArray)
      setMapBbox(false)
      setNumberHotels(newSearchResults.numberHotels)
      setMaxPages(newSearchResults.maxPages)
      setActivePage(1);
      setDataLoading(false)
      if (firstLoad) {
      setFirstLoad(false)
    }
    }, "1500");
    // save map data (for update page search)
    setSavedMapData(searchData)
  }
  }
  else if (type === "location") {
    console.log("location server call")
    setLocationSearchCurrent(true)
    setTimeout(() => {
      const newSearchResults = locationSearch(searchKey, searchData);

      setHotelArray(newSearchResults.hotelArray)
      setMapBbox(newSearchResults.mapBbox)
      setNumberHotels(newSearchResults.numberHotels)
      setMaxPages(newSearchResults.maxPages)
      setActivePage(1);

      setDataLoading(false)
    }, "1500");
    setSavedMapData(false)
  }

  else if (type === "updatePage") {
    console.log("update page server call")
    setTimeout(() => {

      const newSearchResults = updatePageSearch(searchKey, searchLocation, savedMapData, hotelArray);


      setHotelArray(newSearchResults.hotelArray)


      setDataLoading(false)

    }, "1500");

  }

  else if (type === "searchRefresh") {
    console.log("refresh search server call")
    setTimeout(() => {

      const newSearchResults = searchRefreshSearch(searchKey, searchLocation, savedMapData, hotelArray);


      setHotelArray(newSearchResults.hotelArray)



      setDataLoading(false)

    }, "1500");

  }

};


  return (
    <div className="search-map-nr6">
      <HotelAppNav
        searchLocation={searchLocation}
        updateSearchLocation={updateSearchLocation}
        expandMapView={expandMapView}
        handleNavSearchClick={handleNavSearchClick}
        activeSearch={activeSearch}
        setActiveSearch={setActiveSearch}
      />

      <main className="search-map-cy5">
        <div class="search-map-1hy">
          {/* lowers position of button when screen height is low */}
          <div
            className={
              screenHeight > 500
                ? "search-map-fo8"
                : "search-map-fo8 small-screen-height"
            }
          >
            {expandMapView ? (
              <button
                type="button"
                class="search-map-174"
                onClick={toggleMapView}
              >
                <span class="search-map-7u6">
                  <span class="search-map-r16">Show list</span>
                  <div class="search-map-hqs">
                    <svg
                      className="search-map-sd2"
                      viewBox="0 0 16 16"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      role="presentation"
                      focusable="false"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M2.5 11.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zM15 12v2H6v-2h9zM2.5 6.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zM15 7v2H6V7h9zM2.5 1.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zM15 2v2H6V2h9z"
                      ></path>
                    </svg>
                  </div>
                </span>
              </button>
            ) : null}
            {!expandMapView && mapButtonActive && !dataLoading && !pageLoading ? (
              <button
                type="button"
                class="search-map-174"
                onClick={toggleMapView}
              >
                <span class="search-map-7u6">
                  <span class="search-map-r16">Show map</span>
                  <div class="search-map-hqs">
                    <svg
                      className="search-map-sd2"
                      viewBox="0 0 16 16"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      role="presentation"
                      focusable="false"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M2.5 11.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zM15 12v2H6v-2h9zM2.5 6.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zM15 7v2H6V7h9zM2.5 1.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zM15 2v2H6V2h9z"
                      ></path>
                    </svg>
                  </div>
                </span>
              </button>
            ) : null}
          </div>
        </div>

        <div className={searchListStyle}>
      <ResultsList
            listContainerRef={listContainerRef}
            numberHotels={numberHotels}
            hotelArray={hotelArray}
            dataLoading={dataLoading}
            activePage={activePage}
            maxPages={maxPages}
            goToPage={goToPage}
            pageLoading={pageLoading}
            setActiveLink={setActiveLink}
            hoverHotel={hoverHotel}
            setHoverHotel={setHoverHotel}
            firstLoad={firstLoad}
          />
        </div>
        <div className={mapStyle}>
          <ResultsMap
            expandMapView={expandMapView}
            toggleMapView={toggleMapView}
            searchLocation={searchLocation}
            setMapParameters={setMapParameters}
            mapParameters={mapParameters}
            hotelArray={hotelArray}
            dataLoading={dataLoading}
            pageLoading={pageLoading}
            largeView={largeView}
            screenWidth={screenWidth}
            setActiveLink={setActiveLink}
            hoverHotel={hoverHotel}
            handleMapMove={handleMapMove}
            searchLocationUpdate={searchLocationUpdate}
            makeServerCall={makeServerCall}
            firstLoad={firstLoad}
            mapContainer={mapContainer}
            mapBbox={mapBbox}
          />
        </div>
      </main>
      {activeLink ? (
        <LinkModal activeLink={activeLink} setActiveLink={setActiveLink} />
      ) : null}
    </div>
  );
}

export default HotelApp;
