import React, { useState, useRef, useEffect } from "react";
import crossButton from "./crossButton";
import "../css/searchModal.css";

// soft ios keyboard scrolling issue - https://stackoverflow.com/questions/56351216/ios-safari-unwanted-scroll-when-keyboard-is-opened-and-body-scroll-is-disabled
// soft ios keyboard scrolling issue - https://stackoverflow.com/questions/58997163/keyboard-and-scroll-problems-on-forms-in-ios

// modal which displays country options and also text input for filtering. Used in samll view only. Performs same function as dropdown in large view. In contrast to dropdown the number of options can be limited to prevent scrolling and avoid a conflict with the soft keyboard when text input is active.

function SearchModal(props) {
  // css style for modal conatiner - changes due to animated open/close
  const [modalStyle, setModalStyle] = useState("search-modal-oje");
  // local store of array of country names which currently appear as dropdown/search modal options (i.e. not filtered out by text input search) - different from full list as can be cropped for "more results" button
  const [activeCountryArrayLocal, setActiveCountryArrayLocal] = useState([]);
  // boolean which is true when "more results" button is enabled
  const [reducedOptionsActive, setReducedOptionsActive] = useState();
  // boolean which is true when modal first loads - used to delay height calculations whivh are affected by position of modal
  const [firstLoad, setFirstLoad] = useState(true);
  // boolean which is true when text input is in focus
  const [textInputFocus, setTextInputFocus] = useState();

  // init refs for text input and scrolling options container
  const textInputRef = useRef(null);
  const scrollContainerRef = useRef(null);

  // generates shortened array of options which are needed when "more results" button is active (and therefore scrolling through options is disabled). The shorter array is needed to prevent a scrolling conflict when text input is active and the soft keyboard is open
  const initReducedOptionsSet = () => {
    // screen position of top of options scrolling container
    const scrollBoxTop = scrollContainerRef.current.getBoundingClientRect().top;
    // total height of screen
    const screenHeight = window.innerHeight;
    // max height of scrolling container
    const scrollHeight = screenHeight - scrollBoxTop;
    // max visible options in scrolling container (height of container divided by height of option, rounded down)
    const maxVisibleOptions = Math.floor(scrollHeight / 64);
    // length of reduced options array (1 subtracted to allow space for "more results button")
    const reducedOptionSet = maxVisibleOptions - 1;
    // initialise shortened search options array
    let reducedCountryArray = [];
    // if full options array shorter than reduced options array, then no changes are made
    if (props.activeCountryArray.length < reducedOptionSet) {
      reducedCountryArray = props.activeCountryArray;
      // controls visibility of  "more results" button
      setReducedOptionsActive(false);
    }
    // if full options array is longer than reduced options array, the first x options are taken
    else {
      for (let i = 0; i < reducedOptionSet; i++) {
        reducedCountryArray.push(props.activeCountryArray[i]);
      }
      // controls visibility of  "more results" button
      setReducedOptionsActive(true);
    }
    // reduced options array stored (to be used for render)
    setActiveCountryArrayLocal(reducedCountryArray);
  };

  // when props.activeCountryArray, shortened array of country options  with "more results" button is generated (if full list requires scrolling. if not the array of options is left unchanged)
  useEffect(() => {
    // if first load of search modal a delay is introduced to account for slide in animation (which affects scroll container height calcs)
    if (firstLoad) {
      setTimeout(() => {
        initReducedOptionsSet();
        setFirstLoad(false);
      }, "400");
    } else {
      initReducedOptionsSet();
    }
  }, [props.activeCountryArray]);

  // when text input becomes active, reduced options list (with "more results" button) is genertated. This to prevent a scrolling conflict when text input is active and the soft keyboard is open
  useEffect(() => {
    if (textInputFocus) {
      initReducedOptionsSet();
    }
  }, [textInputFocus]);

  // if "more results" button is clicked, the full array of options is displayed (with scrolling allowed). Clicking the button automatically blurs text input, so there is no scrolling conflict
  const showAllOptions = () => {
    setActiveCountryArrayLocal(props.activeCountryArray);
    setReducedOptionsActive(false);
  };

  const closeModal = () => {
    // stores time of search modal close - used to prevent search being updated in response to changes in map bounds (which can come from scroll bar appearing in windows browsers)
    props.setLastSearchModalClose(Date.now())
    // close modal
    setModalStyle("search-modal-1iw");
    // reset initial modal styles (after animation completes)
    setTimeout(() => {
      setModalStyle("search-modal-oje");
      props.closeModal();
    }, "400");
  };

  // deletes text input value when user inputs clicks on cross button
  const crossButtonHandler = () => {
    props.setCountryInput("");
    textInputRef.current.focus();
  };

  return (
    <>
      <section>
        <div class="search-modal-j29">
          <div class={modalStyle}>
            <div className="search-modal-pa3">
              <button
                aria-label="Close search"
                type="button"
                class="search-modal-oda"
                onClick={closeModal}
              >
                <span class="search-modal-e29">
                  <svg
                    class="search-modal-ka0"
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    role="presentation"
                    focusable="false"
                  >
                    <path d="m6 6 20 20"></path>
                    <path d="m26 6-20 20"></path>
                  </svg>
                </span>
              </button>
            </div>

            <div class="search-modal-z4l">
              <header className="search-modal-sj7" />
              <section className="search-modal-po4">
                <h2 class="search-modal-we5">Select a country</h2>

                <form className="search-modal-f1w">
                  <label for="country-input-small" class="search-modal-1dr">
                    <div class="search-modal-vjv">
                      <svg
                        viewBox="0 0 32 32"
                        xmlns="http://www.w3.org/2000/svg"
                        className="search-modal-bw4"
                      >
                        <g fill="none">
                          <path d="m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 9 9"></path>
                        </g>
                      </svg>
                    </div>
                    <input
                      class="search-modal-1l1"
                      placeholder="Search countries"
                      value={props.countryInput}
                      onChange={props.onChangeHandler}
                      ref={textInputRef}
                      onFocus={() => setTextInputFocus(true)}
                      onBlur={() => setTextInputFocus(false)}
                    />
                    {props.countryInput.length > 0
                      ? crossButton(crossButtonHandler)
                      : null}
                  </label>
                </form>
              </section>

              <div class="search-modal-bz3" ref={scrollContainerRef}>
                {!firstLoad ? (
                  <>
                    {activeCountryArrayLocal.length > 0 ? (
                      activeCountryArrayLocal.map((x) => (
                        <div
                          class="search-modal-uzo"
                          onClick={() => props.selectCountry(x)}
                        >
                          <div class="search-modal-bi8">
                            <svg
                              className="search-modal-zp3"
                              viewBox="0 0 32 32"
                              xmlns="http://www.w3.org/2000/svg"
                              aria-hidden="true"
                              role="presentation"
                            >
                              <path d="m15.9999.33325c6.4433664 0 11.6667 5.22332687 11.6667 11.66665 0 .395185-.0196984.7942624-.0585936 1.1970109-.3656031 3.7857147-2.3760434 7.7525726-5.487905 11.7201691-1.1932825 1.5214248-2.4696691 2.9382012-3.7464266 4.2149447l-.264609.2625401-.2565836.2505683-.4871024.4643445-.3377669.3126669-.2592315.2338445-.7684829.6644749-.6531219-.5633124-.7123549-.6476755-.4871002-.4643445c-.1682693-.1630063-.3422204-.3341398-.5211901-.5131084-1.2767516-1.2767436-2.5531323-2.69352-3.74640918-4.2149449-3.11184685-3.9675963-5.12227757-7.9344539-5.48787896-11.7201677-.03889501-.4027484-.05859326-.8018256-.05859326-1.1970105 0-6.44329813 5.22335863-11.66665 11.66665-11.66665zm0 2c-5.3387224 0-9.66665 4.32792195-9.66665 9.66665 0 .3301812.01653349.665142.04933146 1.004757.32161647 3.3302606 2.17313947 6.9835713 5.07084634 10.6781398.9771881 1.2459122 2.0157692 2.4217661 3.0628871 3.5026159l.5240256.5323924.4974749.4897834.4621846.4404115.2257179-.2133444.4810251-.4660964.252726-.2507558c1.2232503-1.2232369 2.4468714-2.5814442 3.5869296-4.0350084 2.8977203-3.6945683 4.7492518-7.3478787 5.0708697-10.6781384.0327981-.3396149.0493317-.6745755.0493317-1.0047566 0-5.33875305-4.3279026-9.66665-9.6667-9.66665zm.0001 4.66675c2.7614237 0 5 2.23857625 5 5 0 2.7614237-2.2385763 5-5 5s-5-2.2385763-5-5c0-2.76142375 2.2385763-5 5-5zm0 2c-1.6568542 0-3 1.3431458-3 3s1.3431458 3 3 3 3-1.3431458 3-3-1.3431458-3-3-3z"></path>
                            </svg>
                          </div>
                          <div class="search-modal-182">{x}</div>
                        </div>
                      ))
                    ) : (
                      <div class="search-modal-jp4">
                        <div class="search-modal-ha1">no matches</div>
                      </div>
                    )}
                    {reducedOptionsActive ? (
                      <div class="search-modal-mv4">
                        <button
                          onClick={showAllOptions}
                          class="search-modal-tt5"
                        >
                          more results
                        </button>
                      </div>
                    ) : null}
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default SearchModal;
