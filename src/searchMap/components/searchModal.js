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
                            placeholder="Search countriesXX"
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


    [results list]





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
