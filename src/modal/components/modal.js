import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateMainModal } from "../../redux/modals/modalsSlice";
import itemArray from "../../data/itemArray";
import modalContent from "./modalContent.js";
import "../css/modal.css";

function Modal() {

  const mainModal = useSelector((state) => state.modals.mainModal);
  const modalData = modalContent[mainModal]
  const [backdropStyle, setBackdropStyle] = useState("modal-jr6");
  const [modalStyle, setModalStyle] = useState("modal-pq2");


/*
  let getModalData = (modalRef, itemArray) => {

console.log("modalRef: " + modalRef)
console.log("itemArray: " + itemArray)

    let modalData

    for (let i=0; i<itemArray.length; i++) {
        console.log("itemArray[i].modal: " + itemArray[i].modal)
      if (modalRef===itemArray[i].modal) {

        modalData = itemArray[i]
        break;
            }
    }

    return modalData


  }


  const [modalData, setModalData] = useState(getModalData(mainModal, itemArray));

  */
  const dispatch = useDispatch();

  const closeModal = () => {
    setBackdropStyle("modal-bm0");
    setModalStyle("modal-lf8");

    setTimeout(() => {
      setBackdropStyle("modal-jr6");
      setModalStyle("modal-pq2");
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
                  {modalData.libraries ?
                    <>
                <h2 className="micsmodal-ns5">Libraries/Frameworks</h2>
                <ul className="micsmodal-bw7">
                  {modalData.libraries.map((x) => (
                    <li>{x}</li>
                  ))}
                </ul>
                </> : null}
              </div>
              <footer>
                <footer class="modal-zgc">
                  <a href={modalData.githubHref} className="micsmodal-lb9">
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
