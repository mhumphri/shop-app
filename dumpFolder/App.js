import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import {
  updateScreenDimensions,
  updateTouchScreen,
} from "./redux/deviceData/deviceDataSlice";
import { updateHotelArray, updateMapBbox, updateNumberHotels, updateMaxPages, updateActivePage, updateSearchLocationRedux, updateExpandMapView, refreshMarkerStateObject, updateActiveMarker } from "./redux/hotelApp/hotelAppSlice";
import generateKey from "./hotelApp/functions/generateKey";
import mapSearch from "./hotelApp/functions/mapSearch";
import locationSearch from "./hotelApp/functions/locationSearch";
import updatePageSearch from "./hotelApp/functions/updatePageSearch";
import searchRefreshSearch from "./hotelApp/functions/searchRefreshSearch";
import TopNav from "./navs/components/topNav";
import Homepage from "./homepage/components/homepage";
import Widgets from "./widgets/components/widgets";
import HotelApp from "./hotelApp/components/hotelApp";
import HotelPage from "./hotelApp/components/hotelPage/hotelPage";
import Modal from "./modal/components/modal";
import DatepickersAll from "./datepicker/components/datepickersAll";

function App() {
  const dispatch = useDispatch();

  // boolean showing true is user has navigated away to individual hotel page (used to prevent data reload when they navigate back)
  const navigateAway = useSelector((state) => state.hotelApp.navigateAway);
  // main modal state (stored in redux)
  const mainModal = useSelector((state) => state.modals.mainModal);
  //
  const markerStateObject = useSelector((state) => state.hotelApp.markerStateObject);
  //
  const activeMarker = useSelector((state) => state.hotelApp.activeMarker);
  // map data saved every time there is a map search - used for update page search
  const savedMapData = useSelector((state) => state.hotelApp.savedMapData);
  // array containg data for current search results (stored in redux)
  const hotelArray = useSelector((state) => state.hotelApp.hotelArray);
  // total number of hotels returned by search
  const numberHotels = useSelector((state) => state.hotelApp.numberHotels);
  // max number of search pages returned by search (capped at 15)
  const maxPages = useSelector((state) => state.hotelApp.maxPages);
  // stores currently active page (which is shown / controlled by paginationNav)
  const activePage = useSelector((state) => state.hotelApp.activePage);
  // stores currently active page (which is shown / controlled by paginationNav)
  const searchLocation = useSelector((state) => state.hotelApp.searchLocation);


  // const [firstLoad, setFirstLoad] = useState(navigateAway ? false : true);
  const [firstLoad, setFirstLoad] = useState(true);
  // Boolean indicating if markers on map need to be refreshed (due to user navigating back to search page)
  const [refreshMarkers, setRefreshMarkers] = useState();

  // boolean set to true when new search data is loading
  const [dataLoading, setDataLoading] = useState(navigateAway ? false : true);


  // holds key for latest search - used to filter out returns for older searches, if several are active simultaneously
  const [latestSearchKey, setLatestSearchKey] = useState();
  const searchKeyRef = useRef();
  searchKeyRef.current = latestSearchKey;
  const locationSearchCurrentRef = useRef();

  // listens for screen resize and updates screen width variable in redux
  useEffect(() => {
    // stores current screenwidth in redux
    const updateScreenWidth = () => {
      dispatch(
        updateScreenDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        })
      );
    };
    updateScreenWidth();
    // detect if a "coarse pointer" - usually a touch screen - is the primary input device and stores touchScreen boolean in redux
    dispatch(updateTouchScreen(window.matchMedia("(pointer: coarse)").matches));
    window.addEventListener("resize", () => {
      updateScreenWidth();
    });
    return () => {
      window.removeEventListener("resize", () => {
        updateScreenWidth();
      });
    };
  }, [dispatch]);


  // handles server calls and routes - mimics REST API POST call - uses promises and timeOut functions to imitate server comms
  const makeServerCall = (type, searchData) => {
    let serverRoute;

    const initialiseSearch = (newSearchKey) => {
      // sets data loading which turns on loader icon and greys out results in searchList
      setDataLoading(true);
      // stores key for search
      setLatestSearchKey(newSearchKey);
      // scrolls back to top of resultsList when searchData is returned
      window.scrollTo(0, 0);
    };

    // hadles data object returned from server, updating state for which data has been returned
    const fulfilServerCall = (newSearchResults) => {
      // search key for server response must match most recent searchkey stored locally - this is to avoid state being updated with data from search calls which have been superceded
      if (newSearchResults.searchKey === searchKeyRef.current) {
        // update markerStateObject when hotelArray is updated
        const newHotelArray = [...newSearchResults.hotelArray];
        let newArrayKeys = {}
        // loop through new  HotelArray, creating an aobject with keys
          for (let i=0; i<newHotelArray.length; i++) {
          newArrayKeys[newHotelArray[i].key]=true
        }
  let newMarkerStateObject = {}
  let newActiveMarker = false
  // loop through previous markerStateObject - if match newArray keys, retain that key in marker State object
     for (let [key] of Object.entries(markerStateObject)) {
    if (newArrayKeys[key]) {
      newMarkerStateObject[key] = true
      if (activeMarker===key) {
        newActiveMarker = key
      }
    }


}

dispatch(updateActiveMarker(newActiveMarker))
  dispatch(refreshMarkerStateObject(newMarkerStateObject))
        dispatch(updateHotelArray(newSearchResults.hotelArray))





        // updates map boundary box (for location search when map will move in response to search results)
        if (newSearchResults.mapBbox) {
          // setMapBbox(newSearchResults.mapBbox);
          dispatch(updateMapBbox(newSearchResults.mapBbox))
        }
        // sets number of hotels for current search "typeof" used as a zero response is also falsey
        if (typeof newSearchResults.numberHotels === "number") {
          //setNumberHotels(newSearchResults.numberHotels);
          dispatch(updateNumberHotels(newSearchResults.numberHotels))
        }
        // sets number of maxPages for current search "typeof" used as a zero response is also falsey
        if (typeof newSearchResults.maxPages === "number") {
          // setMaxPages(newSearchResults.maxPages);
          dispatch(updateMaxPages(newSearchResults.maxPages))
        }
        // resets search page (i.e. sets page to 1)
        if (newSearchResults.activePage) {
          // setActivePage(newSearchResults.activePage);
          dispatch(updateActivePage(newSearchResults.activePage))
        }
        setDataLoading(false);
        if (firstLoad) {
          setFirstLoad(false);
        }
      }
    };
    // handles server calls initiated by map movements ("idle google map event handler")
    if (type === "map") {

      if (navigateAway) {
        setRefreshMarkers(true)
        setFirstLoad(false)

      }
      else {

      // adds previous zoom level to search object
      if (savedMapData) {
        searchData.prevZoom = savedMapData.zoom;
      }

      // updates savedMapData with latest search data
      // setSavedMapData(searchData);
      // dispatch(updateSavedMapData(searchData))
      let prevHotelArray = hotelArray;
      // if not first load searchLocation set to "map search" . If firstLoad searchLocation remains unchanged and prevHotelArray is set to false (to avoid init dummy variables being sent to server)
      if (firstLoad) {
        prevHotelArray = [];
      } else {
        //setSearchLocation({ name: "map area" });
        dispatch(updateSearchLocationRedux({ name: "map area" }))
      }
      // generates unique key and calls initialise search function
      const newSearchKey = generateKey();
      initialiseSearch(newSearchKey);
      // sets up route (function mimics REST API POST call) for map search server call
      serverRoute = mapSearch(newSearchKey, searchData, prevHotelArray);
    }
    }
    // handles server calls initiated by user selecting option from location dropdown menu
    else if (type === "location") {
      // boolean which prevents map search being triggered by map movement caused by change of location
      locationSearchCurrentRef.current = true;
      // generates unique key and calls initialise search function
      const newSearchKey = generateKey();
      initialiseSearch(newSearchKey);
      // sets up route (function mimics REST API POST call) for location search server call
      serverRoute = locationSearch(newSearchKey, searchData, savedMapData);
    }
    // handles server calls initiated by user selecting a new page from the pagination nav
    else if (type === "updatePage") {
      // generates unique key and calls initialise search function
      const newSearchKey = generateKey();
      initialiseSearch(newSearchKey);
      const newPageNumber = searchData;
      let finalPageHotels = false;
      // if page specified by search is the max page posiible, the number of results for the final page is calculated and sent as an argument (inreality this would prob happen server side)
      if (maxPages === newPageNumber) {
        // if greater than 15*18 (max number of hotels which can be seen due to 15 page max, the number of hotles on the final page is set the max, which is 18)
        if (numberHotels>269) {
          finalPageHotels = 18
        }
        // if total number of hotles is below 270, the number of hotels which will appear in the final page is calculated
        else {
          finalPageHotels = numberHotels - (maxPages - 1) * 18;
        }
      }
      // sets up route (function mimics REST API POST call) for update page search
      serverRoute = updatePageSearch(
        newSearchKey,
        searchLocation,
        savedMapData,
        finalPageHotels
      );
    }
    // handles server calls initiated by user clicking on nav search icon
    else if (type === "searchRefresh") {
      // generates unique key and calls initialise search function
      const newSearchKey = generateKey();
      initialiseSearch(newSearchKey);
      // sets up route (function mimics REST API POST call) for search refresh search
      serverRoute = searchRefreshSearch(
        newSearchKey,
        searchLocation,
        savedMapData,
        hotelArray
      );
    }
    //
    const makeServerCall = new Promise((resolve) => {
      setTimeout(() => {
        resolve(serverRoute);
      }, 1000);
    });

    makeServerCall.then((value) => fulfilServerCall(value));
  };


  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <TopNav />
              <Homepage />
            </>
          }
        />

        <Route
          path="/widgets"
          element={
            <>
              <TopNav narrow={true} itemName="widgets" />
              <Widgets />
            </>
          }
        />
        <Route
          path="/hotel-app"
          element={
            <>
              <HotelApp makeServerCall={makeServerCall} firstLoad={firstLoad} dataLoading={dataLoading} />
            </>
          }
        />
        <Route
          path="hotel-app/hotels/:hotelId"
          element={
            <>
            <HotelPage makeServerCall={makeServerCall} firstLoad={firstLoad} dataLoading={dataLoading} />
            </>
          }
        />
        <Route
          path="/datepickers"
          element={
            <>
              <TopNav narrow={true} itemName="datepickers" />
              <DatepickersAll />
            </>
          }
        />
      {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
      </Routes>
      {mainModal ? <Modal /> : null}
    </Router>
  );
}

export default App;
