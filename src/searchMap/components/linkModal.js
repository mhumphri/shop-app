import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateMainModal } from "../../redux/modals/modalsSlice";
import itemArray from "../../data/itemArray";
import "../css/linkModal.css";

function LinkModal(props) {



  const [backdropStyle, setBackdropStyle] = useState("modal-jr6");
  const [modalStyle, setModalStyle] = useState("modal-pq2");



  const closeModal = () => {
    setBackdropStyle("modal-bm0");
    setModalStyle("modal-lf8");

    setTimeout(() => {
      setBackdropStyle("modal-jr6");
      setModalStyle("modal-pq2");
      props.setActiveLink(false);
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
                <div className="micsmodal-lw2">link clicked</div>
              </header>
              <div class="link-modal-hs6">
link to {props.activeLink}

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LinkModal;
