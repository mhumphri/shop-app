import React, { useState, useEffect, useRef } from "react";
import "../css/searchMap.css";

//

function SearchMap(props) {

  // boolean indicating if expanded map view is on
  const [expandMapView, setExpandMapView] = useState();

  const [searchListStyle, setSearchListStyle] = useState("fmdphkf dir dir-ltr");
  const [mapStyle, setMapStyle] = useState("m1ict9kd dir dir-ltr");

const toggleMapView = () => {
  console.log("toggleMap")
  if (expandMapView) {
    setExpandMapView(false)
 setSearchListStyle("fmdphkf f1lf7snk dir dir-ltr")
setMapStyle("m1ict9kd m7lqfs3 dir dir-ltr")
setTimeout(() => {
 setSearchListStyle("fmdphkf dir dir-ltr")
  setMapStyle("m1ict9kd m12odydq dir dir-ltr")

}, "850");
  }
  else {
    setExpandMapView(true)
  setSearchListStyle("fmdphkf fgnm67p f1lf7snk dir dir-ltr")
  setMapStyle("m1ict9kd m1k84ca2 dir dir-ltr")
}
}

  return (

<main className="search-map-cy5">
  <div className={searchListStyle}>list</div>
  <div className={mapStyle}>
    <div className="search-map-pw9">
    <div className="search-map-c15">
      <button
        aria-label="Expand map and collapse list view"
        type="button"
        className="search-map-b11"
        onClick={toggleMapView}
      >
        <div className="search-map-l1p">
          <svg
          className="search-map-mz1"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"

          >
            <g>
              <path d="m20 28-11.29289322-11.2928932c-.39052429-.3905243-.39052429-1.0236893 0-1.4142136l11.29289322-11.2928932"></path>
            </g>
          </svg>
        </div>
      </button>
      </div>
    </div>
  </div>
</main>


  )


}

export default SearchMap;
