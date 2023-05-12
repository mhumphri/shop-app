const scrollPos = dropdownRef.current.scrollTop
let newScrollPos = scrollPos - 64;
if (newScrollPos<0) {
  newScrollPos = 0
}
dropdownRef.current.scrollTop = newScrollPos


if (activeKey.keyCode===9 || activeKey.keyCode===40) {
  console.log("downKey")
  if (typeof highlightedDdOption !== "number") {
    console.log("downKey3")
    setHighlightedDdOption(0)
    activeCountryArrayRef.current[0].classList.add("highlighted");
  }
  else {
      console.log("downKey1")
      const nextOption = highlightedDdOption + 1
      if (nextOption<activeCountryArray.length) {
        console.log("downKey2")
        activeCountryArrayRef.current[highlightedDdOption].classList.remove("highlighted");
        activeCountryArrayRef.current[nextOption].classList.add("highlighted");
        setHighlightedDdOption(nextOption)
    }
  }
}


// holds index of country in dropdown list which is currently highlighted (as a result of keyboard controls)
// const [highlightedCountry, setHighlightedCountry] = React.useState();

const activeCountryArrayRef = useRef([]);
    // you can access the elements with itemsRef.current[n]

    useEffect(() => {
      if (activeCountryArray) {
    activeCountryArrayRef.current = activeCountryArrayRef.current.slice(0, activeCountryArray.length);
  }
    }, [activeCountryArray]);



// keyDown even listener && controls for tab, enter, up and down buttons
useEffect(() => {
  let highlightedCountry = false
  let activeSearchLocal = false
  function handleKeyDown(e) {

    console.log(e.keyCode);
    // 9=tab, 14=enter, 38=up, 40=down
    if (e.keyCode===9 || e.keyCode===14 || e.keyCode===38 || e.keyCode===40) {
      console.log("e.preventDefault()")
      e.preventDefault()
      // if tab key is pressed and search dro
      if (!activeSearchLocal ) {
        console.log("key0: " + activeSearch)
        if (e.keyCode===9 ) {
        setActiveSearch(true)
        activeSearchLocal = true
      }
      }
       else {
         console.log("key1")
      if (e.keyCode===9 || e.keyCode===40) {
        console.log("key2")
        if (!highlightedCountry) {
          // setHighlightedCountry(0)
          console.log("key3")
          highlightedCountry = 1
          activeCountryArrayRef.current[0].classList.add("highlighted");
        }
        else {
          console.log("key4")
          if (highlightedCountry<activeCountryArray.length-1) {
            console.log("key5")
            const nextIndex = highlightedCountry;
            activeCountryArrayRef.current[highlightedCountry-1].classList.remove("highlighted");
            activeCountryArrayRef.current[nextIndex].classList.add("highlighted");
            highlightedCountry = nextIndex + 1
          }
        }

      }
    }

    }
  }

document.addEventListener('keydown', handleKeyDown);

// Don't forget to clean up
return function cleanup() {
  document.removeEventListener('keydown', handleKeyDown);
}
}, [activeCountryArray]);


<div
  key={i}
  ref={el => activeCountryArrayRef.current[i] = el}
  role="option"
  tabindex="-1"
  id="bigsearch-query-location-suggestion-0"
  data-index="0"
  data-testid="option-0"
  class="search-map-nav-uzo"
  onClick={() => selectCountry(x)}
>

///////

else {
  if (highlightedCountry<activeCountryArray.length-1) {
    const nextIndex = highlightedCountry + 1;
    // activeCountryArrayRef.current[highlightedCountry].classList.remove("highlighted");
    activeCountryArrayRef.current[nextIndex].classList.add("highlighted");
    setHighlightedCountry(nextIndex)
  }
}


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
  // holds index of country in dropdown list which is currently highlighted (as a result of keyboard controls)
  const [highlightedCountry, setHighlightedCountry] = React.useState("");

  const searchbarRef = useRef(null);
  const textInputRef = useRef(null);

  useEffect(() => {
    if (activeSearch && !largeView) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "relative";
    } else {
      document.body.style.overflow = "auto";
      document.body.style.position = "static";
    }
  }, [activeSearch, largeView]);

  useEffect(() => {
    setCountryInput(props.searchLocation);
  }, [props.searchLocation]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      console.log("HANDLECLICKOUTSDIE");
      if (
        searchbarRef.current &&
        !searchbarRef.current.contains(event.target)
      ) {
        setActiveSearch(false);
        if (countryInput !== props.searchLocation) {
          setCountryInput(props.searchLocation);
        }
      }
    };

    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

  const selectCountry = (newCountry) => {
    setCountryInput(newCountry);
    props.updateSearchLocation(newCountry);
    setActiveSearch(false);
  };

  const countrySearch = () => {
    if (props.searchLocation === "map area") {
      setCountryInput("");
    }
    setActiveSearch("country");
  };

  const onChangeHandler = (event) => {
    const newInputValue = event.target.value;
    setCountryInput(newInputValue);
  };

  const crossButtonHandler = (e) => {
    e.stopPropagation();
    console.log("crossButtonHandler");
    setCountryInput("");
    textInputRef.current.focus();
  };

  const calcActiveCountryArray = () => {
    let activeCountries = [];
    for (let i = 0; i < fullCountryArray.length; i++) {
      const inputLowerCase = countryInput.toLowerCase();
      const countryNameFragment = fullCountryArray[i]
        .substring(0, inputLowerCase.length)
        .toLowerCase();
      if (inputLowerCase === countryNameFragment) {
        activeCountries.push(fullCountryArray[i]);
      }
    }
    return activeCountries;
  };

  const [activeCountryArray, setActiveCountryArray] = React.useState();

  useEffect(() => {
    setActiveCountryArray(calcActiveCountryArray());
  }, [countryInput]);

  useEffect(() => {
    const featuresArray = countryPolygons.features;
    let countryArray = [];
    for (let i = 0; i < featuresArray.length; i++) {
      countryArray.push(featuresArray[i].properties.NAME);
    }
    countryArray.sort();
    setFullCountryArray(countryArray);
    // sets dropdown country list to all countries on load
    setActiveCountryArray(countryArray);
  }, []);

  const closeSearchModal = () => {
    if (countryInput !== props.searchLocation) {
      setCountryInput(props.searchLocation);
    }
    setActiveSearch(false);
  };

  // keyDown even listener && controls for tab, enter, up and down buttons
  useEffect(() => {
  function handleKeyDown(e) {

    console.log(e.keyCode);
    // 9=tab, 14=enter, 38=up, 40=down
    if (e.keyCode===9 || e.keyCode===14 || e.keyCode===38 || e.keyCode===40) {
      console.log("e.preventDefault()")
      e.preventDefault()
      // if tab key is pressed and search dro
      if (!activeSearch && e.keyCode===9 ) {
        setActiveSearch(true)
      }

    }
  }

  document.addEventListener('keydown', handleKeyDown);

  // Don't forget to clean up
  return function cleanup() {
    document.removeEventListener('keydown', handleKeyDown);
  }
}, []);

//

const activeCountryArrayRef = useRef([]);
    // you can access the elements with itemsRef.current[n]

useEffect(() => {
activeCountryArrayRef.current = activeCountryArrayRef.current.slice(0, activeCountryArray.length);
}, [activeCountryArray]);





  if (largeView) {
    return (
      <header class="search-map-nav-h1v">
        <div class="search-map-nav-c1x">
          <a href="/" className="search-map-nav-jk9">
            mic's portfolio
          </a>
        </div>
        <div class="search-map-nav-c7e" ref={searchbarRef}>
          <nav className="search-map-nav-pl4">
            <div className="search-map-nav-ga1" onClick={countrySearch}>
              <label
                class="search-map-nav-f6t"
                htmlFor="locationInput"

              >
                <div>
                  <div class="search-map-nav-snp">Country</div>
                  <input
                    class="search-map-nav-1yi"
                    id="locationInput"
                    placeholder="Search countries"
                    type="text"
                    name="name"
                    autocomplete="off"
                    onChange={onChangeHandler}
                    value={countryInput}
                    ref={textInputRef}
                    tabindex="0"
                  />
                </div>
              </label>
              <div
                className={
                  activeSearch && countryInput.length > 0
                    ? "search-map-nav-gs1"
                    : "search-map-nav-gs2"
                }
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  aria-label="Clear Input"
                  type="button"
                  class="cross_button_10r"
                  onClick={(e) => crossButtonHandler(e)}
                >
                  <svg
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                    className="cross_button_fa3"
                    aria-hidden="true"
                    role="presentation"
                    focusable="false"
                  >
                    <path d="m6 6 20 20"></path>
                    <path d="m26 6-20 20"></path>
                  </svg>
                </button>
              </div>
            </div>
            <div className="search-map-nav-ll9">
              <button
                class="search-map-nav-q1e"
                type="button"
                onClick={() => props.setSearchRefresh(!props.searchRefresh)}
                tabindex="1"
              >
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
              </button>
            </div>
            {activeSearch ? (
              <div class="search-map-nav-xhc">
                <div className="search-map-nav-ue3">
                  <div
                    class="search-map-nav-k3s"
                    role="listbox"
                    aria-label="Search suggestions"
                    id="bigsearch-query-location-listbox"
                    tabindex="-1"
                  >
                    {activeCountryArray.length > 0 ? (
                      activeCountryArray.map((x, i) => (
                        <div
                          key={i}
                          ref={el => activeCountryArrayRef.current[i] = el}
                          role="option"
                          tabindex="-1"
                          class="search-map-nav-uzo"
                          onClick={() => selectCountry(x)}
                        >
                          <div class="search-map-nav-bi8">
                            <svg
                              className="search-map-nav-iu5"
                              viewBox="0 0 32 32"
                              xmlns="http://www.w3.org/2000/svg"
                              aria-hidden="true"
                              role="presentation"
                              focusable="false"
                            >
                              <path d="m15.9999.33325c6.4433664 0 11.6667 5.22332687 11.6667 11.66665 0 .395185-.0196984.7942624-.0585936 1.1970109-.3656031 3.7857147-2.3760434 7.7525726-5.487905 11.7201691-1.1932825 1.5214248-2.4696691 2.9382012-3.7464266 4.2149447l-.264609.2625401-.2565836.2505683-.4871024.4643445-.3377669.3126669-.2592315.2338445-.7684829.6644749-.6531219-.5633124-.7123549-.6476755-.4871002-.4643445c-.1682693-.1630063-.3422204-.3341398-.5211901-.5131084-1.2767516-1.2767436-2.5531323-2.69352-3.74640918-4.2149449-3.11184685-3.9675963-5.12227757-7.9344539-5.48787896-11.7201677-.03889501-.4027484-.05859326-.8018256-.05859326-1.1970105 0-6.44329813 5.22335863-11.66665 11.66665-11.66665zm0 2c-5.3387224 0-9.66665 4.32792195-9.66665 9.66665 0 .3301812.01653349.665142.04933146 1.004757.32161647 3.3302606 2.17313947 6.9835713 5.07084634 10.6781398.9771881 1.2459122 2.0157692 2.4217661 3.0628871 3.5026159l.5240256.5323924.4974749.4897834.4621846.4404115.2257179-.2133444.4810251-.4660964.252726-.2507558c1.2232503-1.2232369 2.4468714-2.5814442 3.5869296-4.0350084 2.8977203-3.6945683 4.7492518-7.3478787 5.0708697-10.6781384.0327981-.3396149.0493317-.6745755.0493317-1.0047566 0-5.33875305-4.3279026-9.66665-9.6667-9.66665zm.0001 4.66675c2.7614237 0 5 2.23857625 5 5 0 2.7614237-2.2385763 5-5 5s-5-2.2385763-5-5c0-2.76142375 2.2385763-5 5-5zm0 2c-1.6568542 0-3 1.3431458-3 3s1.3431458 3 3 3 3-1.3431458 3-3-1.3431458-3-3-3z"></path>
                            </svg>
                          </div>
                          <div class="search-map-nav-182">{x}</div>
                        </div>
                      ))
                    ) : (
                      <div
                        role="option"
                        tabindex="-1"
                        id="bigsearch-query-location-suggestion-0"
                        data-index="0"
                        data-testid="option-0"
                        class="search-map-nav-jp4"
                      >
                        <div class="search-map-nav-182">no matches</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : null}
          </nav>
        </div>
        <div class="search-map-nav-c1kb">
          {" "}
          <button
            className="search-map-nav-ly8"
            onClick={() => dispatch(updateMainModal("hotelApp"))}
          >
            item info
          </button>
        </div>
      </header>
    );
  } else {
    return (
      <>
        <header class="search-map-nav-h1v">
          <nav className="search-map-nav-sd3" onClick={countrySearch}>
            <div className="search-map-nav-ie1">
              <label class="search-map-nav-f6t">
                <div>
                  <div class="search-map-nav-snp">Country</div>
                  <div class="search-map-nav-1yi">
                    {props.searchLocation.length > 0 ? (
                      props.searchLocation
                    ) : (
                      <span className="search-map-nav-ds1">
                        Search countries
                      </span>
                    )}{" "}
                  </div>
                </div>
              </label>
            </div>
            <div className="search-map-nav-ll9">
              <div class="search-map-nav-ah2">
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
          </nav>
        </header>
        {activeSearch ? (
          <SearchModal
            closeModal={closeSearchModal}
            activeCountryArray={activeCountryArray}
            onChangeHandler={onChangeHandler}
            selectCountry={selectCountry}
            countryInput={countryInput}
            setCountryInput={setCountryInput}
            textInputRef={textInputRef}
          />
        ) : null}
      </>
    );
  }
}

export default SearchMapNav;
