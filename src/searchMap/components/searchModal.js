import React, { useState } from "react";
import "../css/searchModal.css";


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
                <div class="_pa35zs">
                  <button
                    aria-label="Close"
                    type="button"
                    class="_oda838"
                    onClick={closeModal}
                  >
                    <span class="_e296pg">
                      <svg
                        viewBox="0 0 18 18"
                        role="presentation"
                        aria-hidden="true"
                        focusable="false"
                        style={{
                          height: "16px",
                          width: "16px",
                          display: "block",
                          fill: "currentcolor",
                        }}
                      >
                        <path
                          d="m13.7 16.29a1 1 0 1 1 -1.42 1.41l-8-8a1 1 0 0 1 0-1.41l8-8a1 1 0 1 1 1.42 1.41l-7.29 7.29z"
                          fill-rule="evenodd"
                        ></path>
                      </svg>
                    </span>
                  </button>
                </div>
                <div class="_awnduw" aria-hidden="true"></div>

                <div class="_17itzz4">
                  <div style={{ padding: "16px 0px 0px" }}>
                    <div tabindex="0" class="_x0votz">
                      <div class="_1a5fl1v">
                        <div class="_3hmsj">
                          <div
                            style={{
                              display: "contents",
                              "--dls19-brand-color": "var(--f-k-smk-x)",
                            }}
                          >
                            <div class="_le6wlg">
                              <div
                                style={{ maxWidth: "1120px" }}
                                class="plmw1e5 mq5rv0q dir dir-ltr"
                              >
                                <section>
                                  <div class="_1byskwn">
                                    <div class="_1lwleztw">
                                      <div class="_1axz042">
                                        <div class="_m5uolq">
                                          <h2
                                            tabindex="-1"
                                            class="_14i3z6h"
                                            elementtiming="LCP-target"
                                          >
                                            What this place offers
                                          </h2>
                                        </div>
                                      </div>
                                    </div>
                                    <div class="_1q2ge3br">
                                    <div class="c1guygdh dir dir-ltr">
                                      <div class="iv6icr7 dir dir-ltr">
                                        <div>
                                          <form
                                            class="f1w3ezqn dir dir-ltr"
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
                                                    placeholder="Search destinations"
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
                                        </div>
                                      </div>
                                    </div>
                                    </div>
                                  </div>
                                </section>
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
