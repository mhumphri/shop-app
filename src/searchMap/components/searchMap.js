import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import LargeMap from "./largeMap";
import ResultsList from "./resultsList";
import SearchMapNav from "./searchMapNav";
import SearchMapFooter from "./searchMapFooter";
import "../css/searchMap.css";

//

function SearchMap(props) {

  // large view (boolean indicating if app currently in large view) and screen height (stored in redux)
  const largeView = useSelector((state) => state.deviceData.largeView);
  const screenHeight = useSelector((state) => state.deviceData.screenHeight);

  // boolean indicating if expanded map view is on
  const [expandMapView, setExpandMapView] = useState();

  // boolean controlling visibility of map button (if page scrolled right down beyond limit of listcontainer, the button is not rendered)
  const [mapButtonActive, setMapButtonActive] = useState();

  const [searchListStyle, setSearchListStyle] = useState("fmdphkf dir dir-ltr");
  const [mapStyle, setMapStyle] = useState("m1ict9kd dir dir-ltr");
  // ref for outer container of results list (used for controlling visibility of "show list" / "show map" button)
  const listContainerRef = useRef(null);




  useEffect(() => {

    const handleScroll = (event) => {

      console.log("scroll: " + window.scrollY)
      console.log("listContainerPos: " + listContainerRef.current.getBoundingClientRect().bottom)
      const listContainerBottom = listContainerRef.current.getBoundingClientRect().bottom
      if (listContainerBottom < screenHeight-70) {
        console.log("MAP OFF")
        setMapButtonActive(false)
      }
      else {
        console.log("MAP ON")
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
  console.log("toggleMap")
  if (expandMapView) {
    console.log("toggleMap - close map")
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
    console.log("toggleMap - open map")
    setExpandMapView(true)
  setSearchListStyle("fmdphkf fgnm67p f1lf7snk dir dir-ltr")
  setMapStyle("m1ict9kd m1k84ca2 dir dir-ltr")

}
}



  return (
<div className="search-map-nr6">
<SearchMapNav />
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
    <ResultsList listContainerRef={listContainerRef} />
  </div>
  <div className={mapStyle}>
<LargeMap expandMapView={expandMapView} toggleMapView={toggleMapView} />
  </div>
</main>
{/* largeView ? <SearchMapFooter /> : null */}
</div>


  )


}

export default SearchMap;
