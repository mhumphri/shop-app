import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import ResultsMap from "./resultsMap";
import ResultsList from "./resultsList";
import SearchMapNav from "./searchMapNav";
import LinkModal from "./linkModal";
import SearchMapFooter from "./searchMapFooter";
import shuffleArray from "../functions/shuffleArray";
import getActivePolygons from "../functions/getActivePolygons";
import getCountryPolygons from "../functions/getCountryPolygons";
import getRandomLocation from "../functions/getRandomLocation";
import getPhotos from "../functions/getPhotos";
import calcLandArea from "../functions/calcLandArea";
import generateKey from "../functions/generateKey";
import randomNumberInRange from "../functions/randomNumberInRange";
import { hotelData } from "../data/hotelData";
import "../css/searchMap.css";

// main component for earchPage app - contains homepage and all the logic for generating mock search results in place of server

function SearchMap(props) {
  // large view (boolean indicating if app currently in large view) and screen height (stored in redux)
  const largeView = useSelector((state) => state.deviceData.largeView);
  // viewport height (stored in redux)
  const screenHeight = useSelector((state) => state.deviceData.screenHeight);
  // viewport height (stored in redux)
  const screenWidth = useSelector((state) => state.deviceData.screenWidth);
  // boolean indicating if expanded map view is active
  const [expandMapView, setExpandMapView] = useState(false);
  // bounds of the currently visible map
  const [mapBounds, setMapBounds] = useState();
  // params of the currently visible map (bounds, center, zoom and box (position on screen))
  const [mapParameters, setMapParameters] = useState();
  // mapParameters plus expand map view state - updated in lag so as to compare latest map parameters (and avoid updating in response to map bounds changes resulting from the map view being changed )
  const [mapState, setMapState] = useState({expandMapView: false});
  // store time of last screen resize - used to prevent search being updated in response to changes in browser size
  const [resize, setResize] = useState(0);
  // current stored search location (either country name or "map area")
  const [searchLocation, setSearchLocation] = useState("");
  // boolean which is true if user has updated search location input - used to prevent search being updated in response to map bounds changing from location search
  const [searchLocationUpdate, setSearchLocationUpdate] = useState();
  // array containg data for current search results
  const [hotelArray, setHotelArray] = useState([]);
  // Boolean indicating if first load of app is taking place - used to prevent searchLocation variable being set to "map area" when map bounds are first declared
  const [firstLoad, setFirstLoad] = useState(true);
  // total number of hotels returned by search
  const [numberHotels, setNumberHotels] = useState();
  // max number of search pages returned by search (capped at 15)
  const [maxPages, setMaxPages] = useState();
  // boolean set to true when new search data is loading
  const [dataLoading, setDataLoading] = useState();
  // boolean set to true when data for a new search page is loading (distinct from dataLoading as number of search results / max pages doesn't update)
  const [pageLoading, setPageLoading] = useState();
  // stores currently active page (which is shown / controlled by paginationNav)
  const [activePage, setActivePage] = useState(1);
  // stores currently active page (which is shown / controlled by paginationNav)
  const [activeLink, setActiveLink] = useState();
  // stores hotel key if mouse currently hovering over in results list - used for highlighting pill marker on map
  const [hoverHotel, setHoverHotel] = useState();
  // boolean which is toggled by search button on nav to refresh search
  const [searchRefresh, setSearchRefresh] = useState();


  // listens for screen re-size event and updates resize variable with current time
  useEffect(() => {
    window.addEventListener("resize", () => {
      setResize(Date.now());
    });
    return () => {
      window.removeEventListener("resize", () => {
        console.log("resize finish");
      });
    };
  }, []);

  // updates searchLocation in response to user input and sets searchLocationUpdate boolean to true
  const updateSearchLocation = (newLocation) => {
    setSearchLocation(newLocation);
    setSearchLocationUpdate(true);
  };

  // sets dataLoading boolean to true for 1300 ms in order to mimic data loading from server
  const triggerDataLoading = () => {
    setDataLoading(true);
    setTimeout(() => {
      setDataLoading(false);
    }, "1300");
  };

  // sets pageLoading boolean to true for 1300 ms in order to mimic data loading from server (distinct from dataLoading as it is the data for a new page loading rather than for an entriely new search)
  const triggerPageLoading = () => {
    setPageLoading(true);
    setTimeout(() => {
      setPageLoading(false);
    }, "1300");
  };

  // useEffect triggered by mapBounds being updated or searchRefresh being toggled (when search button on nav is clicked) - generates mock search results in place of server
  useEffect(() => {
    console.log("MAP PARAMETERS UPDATE")
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

    // if searchLocationUpdate boolean is true country specific search is triggered
    if (searchLocationUpdate) {
      console.log("!!!searchLocationUpdate")
      // sets dataLoading boolean to true for 1300 ms in order to mimic data loading from server
      triggerDataLoading();
      // get polygons for country specified in search
      const activePolygons = [getCountryPolygons(searchLocation)];
      // generates search results (for a single search page of 18 results)
      setHotelArray(generateHotelArray(18, activePolygons, true));
      setSearchLocationUpdate(false);
      // updates numberHotels state, calcs and updates MaxPages state and resets active page state to 1
      updateHotelAndPages(getHotelNumber(activePolygons));
    }
    // if searchLocationUpdate boolean is false search based on  current map bounds is triggered
    else {
      console.log("!!!notsearchLocationUpdate")


      // calcs time interval since last screen resize (if below 500ms it is assumed that change in map bounds results from screen resize and new search is aborted)
      const msSinceResize = Date.now() - resize;

            // if not first load and not a user specified country search, searchLocation state is set to "map area" (i.e the user has changed the map bounds triggering a new search)
      if (!firstLoad && msSinceResize > 500) {
        setSearchLocation("map area");
      }



      // if map parameters have already been declared and change in map bounds not result of screen resize a new search is triggered
      if (mapParameters && msSinceResize > 500) {
        console.log("!!!mapParameters && msSinceResize > 500")
        // fetches polygons within current map bounds
        const activePolygons = getActivePolygons(mapParameters.bounds);
        // calc land area for polygons within current map bounds
        const landArea = calcLandArea(activePolygons);
        // initialises count variable for number of hotels returned by previous search which fall within bounds of current map (i.e. those of the new search)
        let existingHotelsCount = 0;
        // range of lng and lat for current map
        const boundsLatLo = mapParameters.bounds.eb.lo;
        const boundsLatHi = mapParameters.bounds.eb.hi;
        const boundsLngLo = mapParameters.bounds.La.lo;
        const boundsLngHi = mapParameters.bounds.La.hi;
        // counts number of hotels returned by prev search which remain within the map bounds of current search (these will remain as search results)
        for (let i = 0; i < hotelArray.length; i++) {
          const hotelLat = hotelArray[i].coords.lat;
          const hotelLng = hotelArray[i].coords.lng;
          //if hotel coordinates fall within current map bounds exisitngHotels count is incremented
          if (
            hotelLat > boundsLatLo &&
            hotelLat < boundsLatHi &&
            hotelLng > boundsLngLo &&
            hotelLng < boundsLngHi
          ) {
            existingHotelsCount++;
          }
        }

        // calcs number of hotels based on land area implied by active map bounds
        const additionalHotels = getHotelNumber(activePolygons);
        // adds on exisitng hotels from prev search (this is to make sure that the hotel number is >= to hotels currently on map for the search area. This is a fail safe as getHotelNumber() may return a v low number when we zoom down to very small search areas )
        const newNumHotels = existingHotelsCount + additionalHotels;
          // updates numberHotels state, calcs and updates MaxPages state and resets active page state to 1
        updateHotelAndPages(newNumHotels);

        // sets number of hotels returned by search - default is 18 per page but can be lower if total numer returned by search is less than 18 (i.e. the search area is very small)
        let hotelsInArray = 18;
        if (newNumHotels < 18) {
          hotelsInArray = newNumHotels;
        }

        // number of hotels returned >0 search results are generated an stored in hotelArray state
        if (activePolygons.length > 0) {
          console.log("!!!activePolygons.length > 0")
          // mapState is yet to be declared this is the first search so a simple search without any checks is triggered
          if (!mapState) {
            console.log("!!!activePolygons.length > 1")
            // sets dataLoading boolean to true for 1300 ms in order to mimic data loading from server
            triggerDataLoading();
            // search results are generated an stored in hotelArray state
            setHotelArray(generateHotelArray(hotelsInArray, activePolygons));
          } else {
            console.log("!!!activePolygons.length > 2")
            // initialises refresh boolean - if true prev search results are deleted even if they fall within current map bounds.
            let refresh = false;
            // refresh set to true when zooming out or if searchFresh has been toggled (i.e. search button on nav has been clicked) - all prev search reulsts are deleted
            if (mapParameters.zoom < mapState.zoom || searchRefresh!==mapState.searchRefresh) {
              refresh = true;
            }
            // if current expandMapView state does not equal state at time of last search, the new search is aborted (as the change in map bounds is assumed to result from the change in map view). Only for above 949px (because the render changes at this point so that map isn't show on the rhs but button needs to be clicked) as map bounds don't change when we move from list to map in small (<950px screen width) view.
            if (expandMapView === mapState.expandMapView || screenWidth<950 ) {
              console.log("!!!activePolygons.length > 3")
              // sets dataLoading boolean to true for 1300 ms in order to mimic data loading from server
              triggerDataLoading();
                // search results are generated an stored in hotelArray state
              setHotelArray(
                generateHotelArray(hotelsInArray, activePolygons, refresh)
              );
            }
          }
        }
        // number of hotels returned = 0 generates an empty array as search result
        else {
          triggerDataLoading();
          setHotelArray([]);
        }

        // mapState is updated (updated in lag so as to compare latest map parameters (and avoid updating in response to map bounds changes resulting from the map view being changed )
        const newMapState = {
          bounds: mapParameters.bounds,
          center: mapParameters.center,
          zoom: mapParameters.zoom,
          box: mapParameters.box,
          expandMapView: expandMapView,
          searchRefresh: searchRefresh,
        };
        setMapState(newMapState);
      }
    }
  }, [mapParameters, searchRefresh]);

  // boolean controlling visibility of map button (if page scrolled right down beyond limit of listcontainer, the button is not rendered)
  const [mapButtonActive, setMapButtonActive] = useState(true);
  // initialises css styles for search list outer container (needed for change of map view)
  const [searchListStyle, setSearchListStyle] = useState("fmdphkf dir dir-ltr");
    // initialises css styles for map outer container (needed for change of map view)
  const [mapStyle, setMapStyle] = useState("m1ict9kd dir dir-ltr");
  // ref for outer container of results list (used for controlling visibility of "show list" / "show map" button)
  const listContainerRef = useRef(null);

/* randomly selects a given number of rooms from roomData array
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
  } */

  // generates data for hotels returned by search. Takes numbers of hotels, active land polygons and refresh (deleted all prev results if true) as arguments
  const generateHotelArray = (numHotels, activePolygons, refresh) => {
    // sets firstLoad variable on first load
    if (firstLoad) {
    setFirstLoad(false);
  }
  // initialises search result array
    let newHotelArray = [];

    // if refresh set to false this code identifies hotels from the previous search which fall within current search map bounds and adds them to new search results
    if (!refresh) {
      // makes copy of previous search results
      let prevHotelArray = [...hotelArray];
      // range of lng and lat for current map
      const boundsLatLo = mapParameters.bounds.eb.lo;
      const boundsLatHi = mapParameters.bounds.eb.hi;
      const boundsLngLo = mapParameters.bounds.La.lo;
      const boundsLngHi = mapParameters.bounds.La.hi;
      // counts number of hotels returned by prev search which remain within the map bounds of current search (these will remain as search results)
      for (let i = 0; i < prevHotelArray.length; i++) {
        const hotelLat = prevHotelArray[i].coords.lat;
        const hotelLng = prevHotelArray[i].coords.lng;
        // identifies hotels from the previous search which fall within current search map bounds and adds them to new search results
        if (
          hotelLat > boundsLatLo &&
          hotelLat < boundsLatHi &&
          hotelLng > boundsLngLo &&
          hotelLng < boundsLngHi
        ) {
          newHotelArray.push(prevHotelArray[i]);
        }
      }
    }
    // number of hotels from previous search which have been retained for current search (as they fall within current search map bounds)
    const currentArrayLength = newHotelArray.length;

// !!!NEED AN EXTRA STEP HERE TO ACCOUNT FOR PHTOS RETAINED FROM PREV SEARCH!!!!
    // generates array with numbers 0 to 19 - used to select unique photo from list of stock photos
    let indexArray = [];
    for (let i = 0; i < 20; i++) {
      indexArray.push(i);
    }

    // adds new hotels to make up difference between the number of hotels retained frok previous search and number required for this search
    for (let i = currentArrayLength; i < numHotels; i++) {
      // randomly selects an index value from indexArray
      const mainPicIndex = Math.floor(Math.random() * indexArray.length);
      // sets value (number between 0 and 19) to identify main photo
      const mainPic = indexArray[mainPicIndex];
      // main pic value is deleted from index array, so it cannot be selected again
      indexArray.splice(mainPicIndex, 1);
      //!! NEED TO SEE WHAT'S GOING ON WITH BOX AND MARGIN!!
      // generates location coords and country using mapboounds, mapbox, margin and active polygons as arguments
      const location = getRandomLocation(
        mapParameters.bounds,
        mapParameters.box,
        50,
        activePolygons
      );

      // generates data from new hotel and adds to search results array
      const newHotel = {
        name: "accomodation name",
        key: generateKey(12),
        coords: location.coords,
        country: location.country,
        price: randomNumberInRange(30, 450),
        photos: getPhotos(mainPic),
        rating: randomNumberInRange(30, 50)/10,
        numReviews: randomNumberInRange(5, 200),
      };
      newHotelArray.push(newHotel);
    }

    return newHotelArray;
  };

  // listens for scroll event (to control visibility of map/list items button in render, as it disappears when scrolled down to pagination nav)
  useEffect(() => {
    const handleScroll = (event) => {
      // get position of bottom of results list container
      const listContainerBottom = listContainerRef.current.getBoundingClientRect().bottom;
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
      setSearchListStyle("fmdphkf fgnm67p f1lf7snk dir dir-ltr");
      setMapStyle("m1ict9kd m1k84ca2 dir dir-ltr");
    }
  };

  // handles user inputs from paginationNav
  const goToPage = (number) => {
    // gets land polygons for currently visible map
    let activePolygons = getActivePolygons(mapParameters.bounds);
    // gets searchLocation set to specific country land polygons for selected country are retrieved
    if (searchLocation !== "map area" && searchLocation !== "") {
      activePolygons = [getCountryPolygons(searchLocation)];
    }

    // sets default number of hotels returned by search - default is 18 per page
    let hotelsInArray = 18;
    // if search page is the last page, the number of results is calculated as it may be less than the defualt value of 18
    if (number === maxPages && maxPages < 15) {
      hotelsInArray = numberHotels - (maxPages - 1) * 18;
      console.log("hotelsInArray: " + hotelsInArray);
    }
    // sets pageLoading boolean to true for 1300ms in order to mimic data loading from server
    triggerPageLoading();
    // generates search results (refresh is set to true which clears away all previous search results (as user wants to see a fresh page))
    setHotelArray(generateHotelArray(hotelsInArray, activePolygons, true));

    if (number <= maxPages) {
      setActivePage(number);
    }
  };

  return (
    <div className="search-map-nr6">
      <SearchMapNav
        searchLocation={searchLocation}
        updateSearchLocation={updateSearchLocation}
        searchRefresh={searchRefresh}
        setSearchRefresh={setSearchRefresh}
      />
      <main className="search-map-cy5">
        <div class="_1hytef3">
          <div class="_fo8j1u0">
            {expandMapView ? (
              <button
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
                      <path
                        fill-rule="evenodd"
                        d="M2.5 11.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zM15 12v2H6v-2h9zM2.5 6.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zM15 7v2H6V7h9zM2.5 1.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zM15 2v2H6V2h9z"
                      ></path>
                    </svg>
                  </div>
                </span>
              </button>
            ) : null}
            {!expandMapView && mapButtonActive ? (
              <button
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
          />
        </div>
        <div className={mapStyle}>
          <ResultsMap
            expandMapView={expandMapView}
            toggleMapView={toggleMapView}
            setMapBounds={setMapBounds}
            searchLocation={searchLocation}
            setMapParameters={setMapParameters}
            mapParameters={mapParameters}
            hotelArray={hotelArray}
            dataLoading={dataLoading}
            pageLoading={pageLoading}
            largeView={largeView}
            screenWidth={screenWidth}
            resize={resize}
            setActiveLink={setActiveLink}
            hoverHotel={hoverHotel}
          />
        </div>
      </main>
      {/* largeView ? <SearchMapFooter /> : null */}
      {activeLink ? <LinkModal activeLink={activeLink} setActiveLink={setActiveLink} /> : null}
    </div>
  );
}

export default SearchMap;
