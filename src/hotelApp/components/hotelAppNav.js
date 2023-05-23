import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateMainModal } from "../../redux/modals/modalsSlice";
import SearchModal from "./searchModal";
import countryPolygons from "../data/countryPolygons.json";
import "../css/hotelAppNav.css";

// header, nav and controls for hotel app - both large and small view
function HotelAppNav(props) {
  // redux hook for dispatching data
  const dispatch = useDispatch();
  // screen width (stored in redux)
  const largeView = useSelector((state) => state.deviceData.largeView);
  // stores array of all country names
  const [fullCountryArray, setFullCountryArray] = React.useState([]);
  // stores array of country names which currently appear as dropdown/search modal options (i.e. have not need filteredt out by text input search)
  const [activeCountryArray, setActiveCountryArray] = React.useState();
  // stores local text input (distinct from props.searchLocation which is the final inputted and validated value (taken from country array) used for the search)
  const [countryInput, setCountryInput] = React.useState("");
  // logs keydown (for tab, enter, up arrow and down arrow) when props.activeSearch is true. Used to control dropdown menu
  const [activeKey, setActiveKey] = React.useState();
  // stores highlighted dropdown option (highlighted as a reult of keyboard controls being used). large view only
  const [highlightedDdOption, setHighlightedDdOption] = React.useState();

  const searchbarRef = useRef(null);
  const textInputRef = useRef(null);
  const dropdownRef = useRef(null);
  // array of refs for active dropdown / search modal option list
  const activeCountryArrayRef = useRef([]);


  // prevents scrolling when search modal is open
  useEffect(() => {
    // if activeSearch is true and in small view (i.e. search modal is open) scrolling of search result list is disabled
    if (props.activeSearch && !largeView) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "relative";
    }
    // else if not in expanded map view scrolling of search result list is enabled
    else if (!props.expandMapView) {
      document.body.style.overflow = "auto";
      document.body.style.position = "static";
    }

  }, [props.activeSearch, props.expandMapView, largeView]);

  // updates text input value when an input value is selected from the dropdown (large view) / seach modal (small view) list
  useEffect(() => {
    setCountryInput(props.searchLocation);
  }, [props.searchLocation]);

  // click event listener which closes dropdown menu if user clicks outside searchnav / dropdown list (large view only)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchbarRef.current &&
        !searchbarRef.current.contains(event.target)
      ) {
        props.setActiveSearch(false);
        setHighlightedDdOption(false);
        textInputRef.current.blur();

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

  // updates searchLocation (stored country variable), countryInput (text input variable), closes dropdown (large view) / seachModal (small view) and deactivates text input when user selects a country from option list
  const selectCountry = (newCountry) => {
    setCountryInput(newCountry);
    props.updateSearchLocation(newCountry);
    props.setActiveSearch(false);
    textInputRef.current.blur();
  };

  // opens dropdown (large view) / searchModal (small view) and clears text input value if stored search value is set to "map area"
  const countrySearch = () => {
    if (props.searchLocation === "map area") {
      setCountryInput("");
    }
    props.setActiveSearch("country");
  };

  // updates text input value when user inputs text
  const onChangeHandler = (event) => {
    const newInputValue = event.target.value;
    setCountryInput(newInputValue);
  };

  // deletes text input value when user inputs clicks on cross button
  const crossButtonHandler = (e) => {
    e.stopPropagation();
    setCountryInput("");
    textInputRef.current.focus();
  };



  // triggers setActiveCountryArray() when country input is updated
  useEffect(() => {

    // filters out countries (from fullCountryArray) which don't match user inputted text string and returns array of remaining countries
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

    setActiveCountryArray(calcActiveCountryArray());
  }, [countryInput, fullCountryArray]);

  // populates fullCountryArray (full list) and activeCountryArray (currently active list of dropdown/search modal options) when page loads. Takes list of country names from larger geoJSON dataset
  useEffect(() => {
    const featuresArray = countryPolygons.features;
    let countryArray = [];
    for (let i = 0; i < featuresArray.length; i++) {
      countryArray.push(featuresArray[i].properties.NAME);
    }
    // sorts list alphabetically
    countryArray.sort();
    setFullCountryArray(countryArray);
    setActiveCountryArray(countryArray);
  }, []);

  // closes search modal (small view) / dropdown menu (large view) and resets text input value if it doesn't match stored seearch value
  const closeSearchModal = () => {
    if (countryInput !== props.searchLocation) {
      setCountryInput(props.searchLocation);
    }
    props.setActiveSearch(false);
  };

  // keyDown event listener (controls dropdown menu for keyboard inputs) - added and removed when component loads/closes and when props.activeSearch updates
  useEffect(() => {
    // highlighted dropdown option (highlighted as a reult of keyboard controls being used) is reset every time the dropdown menu is opened or closed
    setHighlightedDdOption(false);

    // handles key down event
    function handleKeyDown(e) {
      if (largeView) {
      if (props.activeSearch) {
        // 9=tab, 13=return, 14=enter, 27=escape, 38=up, 40=down
        // if key is tab, return, enter, up arrow or down arrow - activeKey is updated which triggers code inside useEffect below (useEffect is used rather than directly including a fucntion as current state can't be accessed inside the event listener)
        if (
          e.keyCode === 9 ||
          e.keyCode === 13 ||
          e.keyCode === 14 ||
          e.keyCode === 38 ||
          e.keyCode === 40
        ) {
          e.preventDefault();
          const newKeyObject = {
            keyCode: e.keyCode,
            timeStamp: Date.now(),
          };
          setActiveKey(newKeyObject);
        }
        // if key is  escape is pressed while dd is open, dd is closed (props.activeSearch is set to false) and text input is made inactive
        else if (e.keyCode === 27) {
          e.preventDefault();
          props.setActiveSearch(false);
          textInputRef.current.blur();
        }
      } else {
        // if key is tab (and dd is closed), dd is opened (activesearch is set to true) and text input is made active
        if (e.keyCode === 9) {
          e.preventDefault();
          props.setActiveSearch(true);
          textInputRef.current.focus();
        }
      }
    }
    }

    // add key down event listener when props.activeSearch loads or component closes
    document.addEventListener("keydown", handleKeyDown);

    return function cleanup() {
      // add key down event listener when props.activeSearch updates or component closes
      document.removeEventListener("keydown", handleKeyDown);
    };

  }, [props.activeSearch, largeView, props]);

  // useEffect which is trggered when activeKey updates (controls dropdown menu for keyboard inputs)
  useEffect(() => {
    // if activeKey has a value and dropdown options are greater than 0, code is triggered
    if (activeKey && activeCountryArray.length > 0) {
      // checks if currently highlighted option is visible on the dropdown menu (i.e. user may have used mouse to scroll through options rather than keyboard, which would mean that the highlighted option would be out of view)
      const checkScrollPosition = () => {
        const ddHeight = dropdownRef.current.getBoundingClientRect().height;
        const visibleOptions = ddHeight / 64;
        const scrollMin = (highlightedDdOption - (visibleOptions - 1)) * 64;
        const scrollMax = scrollMin + ddHeight;
        const scrollPosition = dropdownRef.current.scrollTop;
        if (scrollPosition > scrollMin && scrollPosition < scrollMax) {
          return true;
        } else {
          return false;
        }
      };

      // adjusts scroll position so that highlighted option is visible (if it is currently out of view - see checkScrollPosition() for test)
      const fixScrollPosition = () => {
        const ddHeight = dropdownRef.current.getBoundingClientRect().height;
        const visibleOptions = ddHeight / 64;
        const scrollMin = (highlightedDdOption + 1 - visibleOptions) * 64;
        const scrollMax = scrollMin + ddHeight;
        const scrollPosition = dropdownRef.current.scrollTop;
        if (scrollPosition < scrollMin) {
          dropdownRef.current.scrollTop = scrollMin + ddHeight / 2;
        } else if (scrollPosition > scrollMax) {
          dropdownRef.current.scrollTop = scrollMin + ddHeight / 2;
        }
      };

      // calculates scroll value for midpoint of currently visible dropdown menu (used to update scroll when user navigates up and down through dropdown options using keyboard controls)
      const getScrollMidpoint = () => {
        const ddHeight = dropdownRef.current.getBoundingClientRect().height;
        const scrollMin = dropdownRef.current.scrollTop;
        const scrollMax = scrollMin + ddHeight;
        const scrollMidPoint = (scrollMin + scrollMax) / 2;
        return scrollMidPoint;
      };

      // if key is tab or down arrow highlight the next option (below) and remove highlight from prev highlighted option
      if (activeKey.keyCode === 9 || activeKey.keyCode === 40) {
        // if highlightedDdOption set to false, the first item in dropdown option list is highlighted
        if (typeof highlightedDdOption !== "number") {
          setHighlightedDdOption(0);
          activeCountryArrayRef.current[0].classList.add("highlighted");
        }
        // if highlightedDdOption already set to a number (and the next option does not excedd the length of the array), the highlighted option is increment by one and previous option highlighting removed
        else {
          const nextOption = highlightedDdOption + 1;
          if (nextOption < activeCountryArray.length) {
            activeCountryArrayRef.current[highlightedDdOption].classList.remove(
              "highlighted"
            );
            activeCountryArrayRef.current[nextOption].classList.add(
              "highlighted"
            );
            setHighlightedDdOption(nextOption);
            // updates scroll position, checking first to ensure that user hasn't scrolled away from previously highlighted option
            if (checkScrollPosition()) {
              // scrolls down by 64px if the position of the next highlighted option is more than halfway down the visible section of the  dropdown list
              const scrollMidPoint = getScrollMidpoint();
              const nextDdOptionPos = (highlightedDdOption + 1) * 64;
              if (nextDdOptionPos > scrollMidPoint) {
                dropdownRef.current.scrollTop =
                  dropdownRef.current.scrollTop + 64;
              }
            }
            // if prev highlighted option is not in the visible section of the dropdown list (as a result of the user scrolling with the mouse), scroll position is updated to bring it back into visible space
            else {
              fixScrollPosition();
            }
          }
        }
      }
      // if key is up arrow highlight the next option (above) and remove highlight from prev highlighted option
      else if (activeKey.keyCode === 38) {
        // if highlighted option array position is greater than 0 (i.e. at least second on the list), code for moving up the list is triggered
        if (highlightedDdOption > 0) {
          // new option highlighted, prev option unhighlighted and new option stored in state
          const nextOption = highlightedDdOption - 1;
          activeCountryArrayRef.current[highlightedDdOption].classList.remove(
            "highlighted"
          );
          activeCountryArrayRef.current[nextOption].classList.add(
            "highlighted"
          );
          setHighlightedDdOption(nextOption);
          // updates scroll position, checking first to ensure that user hasn't scrolled away from previously highlighted option
          if (checkScrollPosition()) {
            // scrolls up by 64px if the position of the next highlighted option is more than halfway up the visible section of the  dropdown list
            const scrollMidPoint = getScrollMidpoint();
            const nextDdOptionPos = highlightedDdOption * 64;
            if (nextDdOptionPos < scrollMidPoint) {
              dropdownRef.current.scrollTop =
                dropdownRef.current.scrollTop - 64;
            }
          } else {
            fixScrollPosition();
          }
        }
      }
      // if key is enter or return. currently highlighted option is selected and highlighted option, active key and text input are reset
      else if (activeKey.keyCode === 13 || activeKey.keyCode === 14) {
        if (typeof highlightedDdOption === "number") {
          selectCountry(activeCountryArray[highlightedDdOption]);
          setHighlightedDdOption(false);
          setActiveKey(false);
          textInputRef.current.blur();
        }
      }
    }
  }, [activeKey, activeCountryArray]);


  // when activeCountryArray (active list of dropdown/seachmodal options) updates, refs for options list are updated, highlighted option and activeKey are reset and scroll back to top of options list
  useEffect(() => {
    if (activeCountryArray) {
      activeCountryArrayRef.current = activeCountryArrayRef.current.slice(
        0,
        activeCountryArray.length
      );
      setHighlightedDdOption(false);
      setActiveKey(false);
      if (dropdownRef.current) {
        dropdownRef.current.scrollTop = 0;
      }
    }
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
              <label class="search-map-nav-f6t" htmlFor="locationInput">
                <div>
                  <div class="search-map-nav-snp">Country</div>
                  <input
                    class="search-map-nav-1yi"
                    id="locationInput"
                    placeholder="Search countries"
                    type="text"
                    name="name"
                    autoComplete="off"
                    onChange={onChangeHandler}
                    value={countryInput}
                    ref={textInputRef}
                  />
                </div>
              </label>
              <div
                className={
                  props.activeSearch && countryInput.length > 0
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
                onClick={() => props.handleNavSearchClick()}
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
            {props.activeSearch ? (
              <>
              <div className="search-map-nav-mm2" onClick={()=>props.setActiveSearch(false)} />
              <div class="search-map-nav-xhc">
                <div className="search-map-nav-ue3" ref={dropdownRef}>
                  <div
                    class="search-map-nav-k3s"
                    role="listbox"
                    aria-label="Search suggestions"
                    tabindex="-1"
                  >
                    {activeCountryArray.length > 0 ? (
                      activeCountryArray.map((x, i) => (
                        <div
                          key={x + i + activeCountryArray.length}
                          ref={(el) => (activeCountryArrayRef.current[i] = el)}
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
                        class="search-map-nav-jp4"
                      >
                        <div class="search-map-nav-182">no matches</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              </>
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
      {/* fix for scroll bounce on firefox iOS -  white block added at top of page to prevent overscroll showing overflow content underneath  */}
        <div className="search-map-nav-cc7" />
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
        {props.activeSearch ? (
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


export default HotelAppNav;
