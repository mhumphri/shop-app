import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateMainModal } from "../../redux/modals/modalsSlice";
import SearchModal from "./searchModal";
import crossButton from "./crossButton";
import countryPolygons from "../data/countryPolygons.json";
import "../css/searchMapNav.css";

//

function SearchMapNav(props) {

  // redux hook for dispatching data
  const dispatch = useDispatch();

  // screen width (stored in redux)
  const largeView = useSelector((state) => state.deviceData.largeView);

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


if (largeView) {

  return (
    <>
    <div class="h1vnkd0i dir dir-ltr">
      <div class="c1yo0219 dir dir-ltr">
        <div>
          <div>


            <div class="c1kn6kxw dir dir-ltr">
              <header
                class="c1kffd0v cxy853f dir dir-ltr"
              >
                <div class="cdfwt5b cqul55 dir dir-ltr">
                <div class="c1xntsbd dir dir-ltr"><a href="/"className="topnav-jk9">mic's portfolio</a></div>
                <div class="c7eo6tu dir dir-ltr" ref={searchbarRef}>
                <div class="_1bu35ic3">
                <div class="_13rvbe2">

                <div class="_dd55nf9">
                  <div class="_1rwlbyy">
                    <label
                      class="_f6t7o5n"
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
                <div class="c1kbjhzw dir dir-ltr">            <button
                              className="topnav-ly8"
onClick={() => dispatch(updateMainModal("rangeSlider"))}
                            >
                              item info
                            </button></div>
                </div>
              </header>
            </div>
          </div>
        </div>
      </div>
    </div>

</>
  )
}
else {
  return (
    <>
        <div class="h1vnkd0i dir dir-ltr">
    <div class="_y0r5kt">
      <div class="_1lvtkaw">
        <div class="_1x0jb4k">
          <div class="nj62o6b dir dir-ltr">
            {/* REMOVED - style="" */}
            <div class="c1yo0219 dir dir-ltr">
              {/* REMOVED - style="--gp-section-max-width: 1120px;" */}
              <div>
                <div
                  data-plugin-in-point-id="FLEXIBLE_DESTINATIONS_SEARCH_BAR_V2"
                  data-section-id="FLEXIBLE_DESTINATIONS_SEARCH_BAR_V2"
                >
                  <div class="coxzsxx dir dir-ltr">
                    <div class="ilrd0ld dir dir-ltr">
                      <div class="c109ki4m e11vjh0i dir dir-ltr">
                        <div class="ljicvoc dir dir-ltr">
                          <button
                            aria-label="Search"
                            type="button"
                            class="_1et6785v"
                            onClick={()=>setActiveSearch("country")}
                          >
                            <div class="l1762013 dir dir-ltr">
                              <svg
                                viewBox="0 0 32 32"
                                xmlns="http://www.w3.org/2000/svg"
                                style={{
                                  display: "block",
                                  height: "16px",
                                  width: "16px",
                                  fill: "currentcolor",
                                }}
                                aria-hidden="true"
                                role="presentation"
                                focusable="false"
                              >
                                <path
                                  d="M13 0c7.18 0 13 5.82 13 13 0 2.868-.929 5.519-2.502 7.669l7.916 7.917-2.828 2.828-7.917-7.916A12.942 12.942 0 0 1 13 26C5.82 26 0 20.18 0 13S5.82 0 13 0zm0 4a9 9 0 1 0 0 18 9 9 0 0 0 0-18z"
                                  opacity=".8"
                                ></path>
                              </svg>
                            </div>

                            <div class="cfpmckc_v2 fw09vnz_v2 dir dir-ltr">
                              <div class="p1uhuw2g_v2 fw09vnz_v2 dir dir-ltr">
                                <div class="i1hupcay_v2 dir dir-ltr">
                                  <span class="c120lmsc_v2 dir dir-ltr">
                            Where to?
                                  </span>
                                </div>
                              </div>

                            </div>
                          </button>
                        </div>

                        <div class="r15cp21x dir dir-ltr">
                          <button
                            aria-label="Show filters"
                            type="button"
                            class="_njezmzv"
                            onClick={() => dispatch(updateMainModal("map-search"))}
                          >
                            <div
                              class="fw09vnz dir dir-ltr"
                            >
                              <div
                                class="_1vd92pv"
                              >
                                <svg
                                  viewBox="0 0 16 16"
                                  xmlns="http://www.w3.org/2000/svg"
                                  style={{
                                    display: "block",
                                    height: "16px",
                                    width: "16px",
                                    fill: "rgb(34, 34, 34)",
                                  }}
                                  aria-hidden="true"
                                  role="presentation"
                                  focusable="false"
                                >
                                  <path d="M 7,0 C 5.895431,0 5,0.895431 5,2 5,3.104569 5.895431,4 7,4 8.104569,4 9,3.104569 9,2 9,0.895431 8.104569,0 7,0 z m -4,5 0,2 2,0 0,5 -2,0 0,2 8,0 0,-2 -2,0 0,-7 -6,0 z"></path>
                                </svg>
                              </div>
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {activeSearch ? <SearchModal closeModal={()=>setActiveSearch(false)} /> : null }
    </>
  )
}


}

export default SearchMapNav;
