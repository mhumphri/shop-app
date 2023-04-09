import React, { useState, useEffect, useRef } from "react";
import LargeMap from "./largeMap";
import ResultsList from "./resultsList";
import SearchMapNav from "./searchMapNav";
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
<>
<SearchMapNav />
<main className="search-map-cy5">

  <div class="_1hytef3">
    <div class="_fo8j1u0">
      <button
        type="button"
        class="_174uh40 l1j9v1wn dir dir-ltr"
        onClick={toggleMapView}
      >
         {expandMapView ? <span class="_7u66d2">
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
        </span> :
        <span class="_7u66d2">
         <span class="_r16tng">Show map</span>
         <div class="_hqsu3j">
           <svg
             viewBox="0 0 32 32"
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
             <path d="M31.245 3.747a2.285 2.285 0 0 0-1.01-1.44A2.286 2.286 0 0 0 28.501 2l-7.515 1.67-10-2L2.5 3.557A2.286 2.286 0 0 0 .7 5.802v21.95a2.284 2.284 0 0 0 1.065 1.941A2.29 2.29 0 0 0 3.498 30l7.515-1.67 10 2 8.484-1.886a2.285 2.285 0 0 0 1.802-2.245V4.247a2.3 2.3 0 0 0-.055-.5zM12.5 25.975l-1.514-.303L9.508 26H9.5V4.665l1.514-.336 1.486.297v21.349zm10 1.36l-1.515.337-1.485-.297V6.025l1.514.304L22.493 6h.007v21.335z"></path>
           </svg>
         </div>
       </span> }
      </button>
    </div>
  </div>

  <div className={searchListStyle}>
    <ResultsList />
  </div>
  <div className={mapStyle}>
<LargeMap expandMapView={expandMapView} toggleMapView={toggleMapView} />
  </div>
</main>
</>


  )


}

export default SearchMap;
