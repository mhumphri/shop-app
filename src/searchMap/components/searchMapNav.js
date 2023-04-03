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
                {/* activeSearch ?    <div class="_xhcgu32">
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
      </div> */}




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
