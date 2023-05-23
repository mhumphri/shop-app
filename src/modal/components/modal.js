import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateMainModal } from "../../redux/modals/modalsSlice";
import modalContent from "./modalContent.js";
import "../css/modal.css";

// modal which is used to display portfolio item info

function Modal() {
  // current state for mainModal - either false or the name of the portfolio item (e.g. renge-slider). Stored in redux.
  const mainModal = useSelector((state) => state.modals.mainModal);
  // content data object for current modal state (All data stored in modal content object)
  const modalData = modalContent[mainModal];
  // modal backdrop CSS style - changes for animation
  const [backdropStyle, setBackdropStyle] = useState("modal-jr6");
  // modal outer container CSS setMapStyle - changes for animation
  const [modalStyle, setModalStyle] = useState("modal-pq2");
  //
  const dispatch = useDispatch();

  // disables scrolling when the modal opens (component loads)
  useEffect(() => {
    // will add this back in when I have resolved map bounds / search update issue
    /*
    document.body.style.overflow = "hidden";
    document.body.style.position = "relative";
    */
  }, []);

  const closeModal = () => {
    // close modal
    setBackdropStyle("modal-bm0");
    setModalStyle("modal-lf8");

    // reset initial modal styles (after animation completes)
    setTimeout(() => {
      setBackdropStyle("modal-jr6");
      setModalStyle("modal-pq2");
      // enables scrolling when modal is closed
      // will add this back in when I have resolved map bounds / search update issue
      /*
      document.body.style.overflow = "auto";
      document.body.style.position = "static";
      */
      dispatch(updateMainModal(false));
    }, "400");
  };

  return (
    <div>
      <div className={backdropStyle}></div>
      <div onClick={closeModal} className="modal-ke7">
        <div
          className={modalStyle}
          style={{ position: "relative" }}
          onClick={(e) => e.stopPropagation()}
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
              <header className="micsmodal-sj7">
                <div className="micsmodal-lw2">{modalData.name}</div>
              </header>
              <div class="micsmodal-bz3">
                <h2 className="micsmodal-ns5">Description</h2>

                {modalData.description.map((x) => (
                  <p className="micsmodal-gt0">{x}</p>
                ))}
                {modalData.libraries ? (
                  <>
                    <h2 className="micsmodal-ns5">Libraries/Frameworks</h2>
                    <ul className="micsmodal-bw7">
                      {modalData.libraries.map((x) => (
                        <li>{x}</li>
                      ))}
                    </ul>
                  </>
                ) : null}
              </div>
              <footer>
                <footer class="modal-zgc">
                  <a
                    className="micsmodal-lb9"
                    href={modalData.githubHref}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      alt="GitHub Logomark"
                      class="micsmodal-ek4"
                      src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
                      width="40"
                      height="40"
                    />
                    <div className="micsmodal-nw7">view code</div>
                  </a>
                </footer>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
