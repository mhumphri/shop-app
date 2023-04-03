import React, { useState, useEffect, useRef } from "react";
import crossButton from "./crossButton";
import countryPolygons from "../data/countryPolygons.json";
import "../css/searchMapNav.css";

//

function SearchMapNav(props) {

  const [activeSearch, setActiveSearch] = React.useState();
  const [fullCountryArray, setFullCountryArray] = React.useState([]);

    const [countryInput, setCountryInput] = React.useState("");
    const [countryInputStored, setCountryInputStored] = React.useState("");

const searchbarRef = useRef(null);

  useEffect(() => {
    const featuresArray = countryPolygons.features
    let countryArray = []
    for (let i=0; i<featuresArray.length; i++) {
      countryArray.push(featuresArray[i].properties.NAME)
    }
    countryArray.sort()
    setFullCountryArray(countryArray)
  }, []);

  useEffect(() => {

    const handleClickOutside = (event) => {
        if (searchbarRef.current && !searchbarRef.current.contains(event.target)) {
            setActiveSearch(false);
            if (countryInput!==countryInputStored) {
              setCountryInput(countryInputStored)
            }
        }
    };

      document.addEventListener('click', handleClickOutside, true);
      return () => {
          document.removeEventListener('click', handleClickOutside, true);
      };
  });

  const selectCountry = (newCountry) => {
    setCountryInput(newCountry)
    setCountryInputStored(newCountry)
    setActiveSearch(false)

  }

  const countrySearch = () => {
    setActiveSearch("country")
    setCountryInput("")
  }




  const onChangeHandler = event => {
    const newInputValue = event.target.value
     setCountryInput(newInputValue);

  };

  const calcActiveCountryArray = () => {
    let activeCountries = []
    for (let i=0; i<fullCountryArray.length; i++) {
      const inputLowerCase = countryInput.toLowerCase()
      const countryNameFragment = fullCountryArray[i].substring(0, inputLowerCase.length).toLowerCase();
      if (inputLowerCase===countryNameFragment) {
        activeCountries.push(fullCountryArray[i])
      }
      if (activeCountries.length>4) {
        break;
      }
    }
    return activeCountries
  }

  const [activeCountryArray, setActiveCountryArray] = React.useState(calcActiveCountryArray());


  useEffect(() => {
    setActiveCountryArray(calcActiveCountryArray())
  }, [countryInput]);






  return (

    <div class="h1vnkd0i dir dir-ltr">
      <div class="c1yo0219 dir dir-ltr">
        <div>
          <div>


            <div class="c1kn6kxw dir dir-ltr">
              <header
                class="c1kffd0v cxy853f dir dir-ltr"
              >
                <div class="cdfwt5b cqul55 dir dir-ltr">
                <div>xxx</div>
                <div ref={searchbarRef}>
                <div class="_1bu35ic3">
                <div class="_13rvbe2">

                <div class="_dd55nf9">
                  <div class="_1rwlbyy">
                    <label
                      class={props.largeNav === "location" ? "_buo7ycz" : "_f6t7o5n"}
                      htmlFor="locationInput"
                      onClick={countrySearch}
                    >
                      <div class="_16fjzef">
                        <div class="_snpd7k">Country</div>
                        <input
                          class="_1yibeas"
                          id="locationInput"
                          placeholder="Search countries"
                          type="text"
                          name="name"
                          autocomplete="off"
                          onChange={onChangeHandler}
                          value={countryInput}
                        />
                      </div>
                    </label>




                      <div class="_18zylmz" onClick={(e) => e.stopPropagation()}>

                              <button
                                class="_q1ewc8l"
                                type="button"
                                onClick={props.handleSearchButton}
                              >
                                <div class="_186q534">
                                  <div>
                                    <svg
                                      viewBox="0 0 32 32"
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="svg_search_lg"
                                      aria-hidden="true"
                                      role="presentation"
                                      focusable="false"
                                    >
                                      <g fill="none">
                                        <path d="m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 9 9"></path>
                                      </g>
                                    </svg>
                                  </div>

                                </div>
                              </button>
                      </div>





{/* <div class={props.largeNav === "location" ? "_xhcgu32" : "_yu5dnq"}> */}
                {activeSearch ?    <div class="_xhcgu32">
                      <div
                        class="c1nifi44 l16t0m55 dir dir-ltr"
                        data-testid="structured-search-input-field-query-panel"
                      >
                        <section>
                          <div class=" dir dir-ltr">

      <div class="k3s7ijn dir dir-ltr" role="listbox" aria-label="Search suggestions" id="bigsearch-query-location-listbox" tabindex="-1">
        <div class="kyy9mvs dir dir-ltr">

{activeCountryArray.length > 0 ? activeCountryArray.map((x) => (
<div role="option" tabindex="-1" id="bigsearch-query-location-suggestion-0" data-index="0" data-testid="option-0" class="_uzocf2" onClick={() => selectCountry(x)}>
  <div class="_1825a1k">
    <div class="_r1t6ga">
      {x}
    </div>
    </div>
    </div>
  )) : <div role="option" tabindex="-1" id="bigsearch-query-location-suggestion-0" data-index="0" data-testid="option-0" class="_uzocf2">
    <div class="_1825a1k">
      <div class="_r1t6ga">
        no matches
      </div>
      </div>
      </div>}




        </div>
      </div>
                          </div>
                        </section>
                      </div>
                    </div> : null }

                  </div>
                </div>

                </div>
                </div>
                </div>
                <div>zzz</div>
                </div>
              </header>
            </div>
          </div>
        </div>
      </div>
    </div>


  )


}

export default SearchMapNav;


import React, { useState, useEffect, useRef } from "react";
import LargeMap from "./largeMap";
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

  <div className={searchListStyle}>list</div>
  <div className={mapStyle}>
<LargeMap expandMapView={expandMapView} toggleMapView={toggleMapView} />
  </div>
</main>
</>


  )


}

export default SearchMap;
