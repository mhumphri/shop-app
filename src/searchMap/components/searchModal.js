import React, { useState } from "react";



function SearchModal(props) {


  const [modalStyle, setModalStyle] = useState("_ojerypf");



  const closeModal = () => {
    console.log("closeModal")
    setModalStyle("_1iw81xea");

    setTimeout(() => {
      setModalStyle("_ojerypf");
      props.closeModal()
    }, "400");
  };

  return (
    <div dir="ltr">
      <section>
        <div class="_j292vx" data-testid="modal-container">
          <div class="_z4lmgp">
            <div class="_b21f4g" aria-hidden="true" tabindex="0"></div>
            <div class="_z4lmgp">
              <div
                role="dialog"
                aria-label="About this space"
                aria-modal="true"
                class={modalStyle}
                style={{ position: "relative" }}
              >



              <div className="modal-pa3">
                <button
                  aria-label="Close"
                  type="button"
                  class="modal-oda"
                  onClick={closeModal}
                >
                  <span class="modal-e29">
                    <svg
                      viewBox="0 0 32 32"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{
                        display: "block",
                        fill: "none",
                        height: "16px",
                        width: "16px",
                        stroke: "currentcolor",
                        strokeWidth: "3px",
                        overflow: "visible",
                      }}
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

              <div class="modal-z4l">
                <div class="micsmodal-ka7">
                  <header className="search-modal-sj7">

                  </header>
                  <div>


<section className="search-modal-po4">
                        <h2
                          tabindex="-1"
                          class="search-modal-we5"
                          elementtiming="LCP-target"
                        >
                          Select a country
                        </h2>



                  <form
                    className="search-modal-f1w"
                    action="/s/homes"
                    method="get"
                    role="search"
                  >
                    <div dir="ltr">
                      <div class="_1258d0t">
                        <label for="/homes-1-input" class="_1dr9xf9">
                          <span class="_krjbj">Location</span>
                          <div class="_vjvlr2">
                            <svg
                              viewBox="0 0 32 32"
                              xmlns="http://www.w3.org/2000/svg"
                              style={{
                                display: "block",
                                fill: "none",
                                height: "16px",
                                width: "16px",
                                stroke: "currentcolor",
                                strokeWidth: "4px",
                                overflow: "visible",
                              }}
                              aria-hidden="true"
                              role="presentation"
                              focusable="false"
                            >
                              <g fill="none">
                                <path d="m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 9 9"></path>
                              </g>
                            </svg>
                          </div>
                          <input
                            class="_1l1dhfh"
                            data-testid="search_query_input"
                            autocomplete="off"
                            id="/homes-1-input"
                            placeholder="Search countries"
                            aria-autocomplete="none"
                            autocorrect="off"

                            spellcheck="false"
                            name="query"
                            theme="[object Object]"
                            value={props.localLocation}
                            onChange={(e) =>
                              props.setLocalLocation(e.target.value)
                            }
                          />
                        </label>
                      </div>
                    </div>
                  </form>
</section>


                  </div>


                  <div class="search-modal-bz3">


                  <div
                    role="listbox"
                    aria-label="Search suggestions"
                    id="/homes-1-listbox"
                    tabindex="-1"
                    className="search-modal-r1n"
                    style={{height: "100%"}}
                  >


                {props.activeCountryArray.map((x) => (
                    <div
                      role="option"
                      tabindex="-1"
                      id="/homes-1-suggestion-0"
                      data-index="0"
                      data-testid="option-0"
                      class="_uzocf2"
                    >
                    <div class="_bi8puq">
                      <svg
                        viewBox="0 0 32 32"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{display: "block", height: "22px", width: "22px", fill: "currentcolor"}}
                        aria-hidden="true"
                        role="presentation"
                        focusable="false"
                      >
                        <path d="m15.9999.33325c6.4433664 0 11.6667 5.22332687 11.6667 11.66665 0 .395185-.0196984.7942624-.0585936 1.1970109-.3656031 3.7857147-2.3760434 7.7525726-5.487905 11.7201691-1.1932825 1.5214248-2.4696691 2.9382012-3.7464266 4.2149447l-.264609.2625401-.2565836.2505683-.4871024.4643445-.3377669.3126669-.2592315.2338445-.7684829.6644749-.6531219-.5633124-.7123549-.6476755-.4871002-.4643445c-.1682693-.1630063-.3422204-.3341398-.5211901-.5131084-1.2767516-1.2767436-2.5531323-2.69352-3.74640918-4.2149449-3.11184685-3.9675963-5.12227757-7.9344539-5.48787896-11.7201677-.03889501-.4027484-.05859326-.8018256-.05859326-1.1970105 0-6.44329813 5.22335863-11.66665 11.66665-11.66665zm0 2c-5.3387224 0-9.66665 4.32792195-9.66665 9.66665 0 .3301812.01653349.665142.04933146 1.004757.32161647 3.3302606 2.17313947 6.9835713 5.07084634 10.6781398.9771881 1.2459122 2.0157692 2.4217661 3.0628871 3.5026159l.5240256.5323924.4974749.4897834.4621846.4404115.2257179-.2133444.4810251-.4660964.252726-.2507558c1.2232503-1.2232369 2.4468714-2.5814442 3.5869296-4.0350084 2.8977203-3.6945683 4.7492518-7.3478787 5.0708697-10.6781384.0327981-.3396149.0493317-.6745755.0493317-1.0047566 0-5.33875305-4.3279026-9.66665-9.6667-9.66665zm.0001 4.66675c2.7614237 0 5 2.23857625 5 5 0 2.7614237-2.2385763 5-5 5s-5-2.2385763-5-5c0-2.76142375 2.2385763-5 5-5zm0 2c-1.6568542 0-3 1.3431458-3 3s1.3431458 3 3 3 3-1.3431458 3-3-1.3431458-3-3-3z"></path>
                      </svg>
                    </div>

                      <div class="_1825a1k">
                        <div class="_r1t6ga">{x}</div>
                      </div>
                    </div> ))}





                    </div>


                  </div>
                  <footer>
                    <footer class="modal-zgc">
                      <button className="micsmodal-lb9">
                        <img
                          alt="GitHub Logomark"
                          class="micsmodal-ek4"
                          src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
                          width="40"
                          height="40"
                        />
                        <div className="micsmodal-nw7">view code</div>
                      </button>

                    </footer>
                  </footer>
                </div>
              </div>




              </div>
            </div>
            <div class="_b21f4g" aria-hidden="true" tabindex="0"></div>
          </div>
        </div>
      </section>
      <div class="_b21f4g">
        <div aria-live="polite" aria-atomic="true"></div>
        <div aria-live="assertive" aria-atomic="true"></div>
      </div>
    </div>
  );
}

export default SearchModal;
