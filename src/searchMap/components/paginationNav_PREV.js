import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../css/paginationNav.css";

//

function PaginationNav(props) {

  // redux hook for dispatching data
  const dispatch = useDispatch();

  // screen width (stored in redux)
  const largeView = useSelector((state) => state.deviceData.largeView);


  const [paginationRender, setPaginationRender] = useState(1);
  const [nextChevron, setNextChevron] = useState(true);
  const [prevChevron, setPrevChevron] = useState();


  /* refreshes search results when active page changes */
  useEffect(() => {

    if (props.activePage >= props.maxPages) {

      setNextChevron(false);
    } else {
      setNextChevron(true);
    }
    if (props.activePage === 1) {
      setPrevChevron(false);
    } else {
      setPrevChevron(true);
    }
  }, [props.activePage, props.maxPages]);



  /* render for the page selector input at the bottom of the search page */
  const updatePaginationRender = () => {
    let renderArray = [];
    let maxPages = Math.ceil(props.numberHotels / 18);
    if (maxPages > 15) {
      maxPages = 15;
    }

    if (maxPages <= 7) {
      for (let i = 0; i < maxPages; i++) {
        renderArray.push(i + 1);
      }
    } else {
      if (props.activePage < 4) {
        renderArray = [1, 2, 3, 4, false, maxPages];
      } else if (props.activePage > 3 && props.activePage < maxPages - 2) {
        renderArray = [
          1,
          false,
          props.activePage - 1,
          props.activePage,
          props.activePage + 1,
          false,
          maxPages,
        ];
      } else if (props.activePage > maxPages - 3) {
        renderArray = [
          1,
          false,
          maxPages - 3,
          maxPages - 2,
          maxPages - 1,
          maxPages,
        ];
      }
    }

    let newPaginationRender = [];

    for (let i = 0; i < renderArray.length; i++) {
      if (renderArray[i] && renderArray[i] === props.activePage) {
        newPaginationRender.push(
          <button
            aria-current="page"
            disabled=""
            aria-disabled="true"
            role="link"
            type="button"
            class="_u60i7ub"
            onClick={() => props.goToPage(renderArray[i])}
          >
            {renderArray[i]}
          </button>
        );
      } else if (renderArray[i] && renderArray[i] !== props.activePage) {
        newPaginationRender.push(
          <button
            class="_833p2h"
            onClick={() => props.goToPage(renderArray[i])}
          >
            {renderArray[i]}
          </button>
        );
      } else {
        newPaginationRender.push(<span class="_3bjjf5">…</span>);
      }
    }
    setPaginationRender(newPaginationRender);
  };

  /* triggers update of the render for the page selector input */
  useEffect(() => {
    updatePaginationRender();
  }, [props.activePage, props.numberHotels]);

if (largeView) {

return (
  <>


<div className="page-nav-nz3">
<nav>
<div className="page-nav-nw4">
  <button
    aria-label="Previous"
    aria-disabled="true"
    role="link"
    type="button"
    class="page-nav-zh2"
    disabled={prevChevron ? false : true}
    onClick={()=>props.goToPage(props.activePage-1)}
  >
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
      <g fill="none">
        <path d="m20 28-11.29289322-11.2928932c-.39052429-.3905243-.39052429-1.0236893 0-1.4142136l11.29289322-11.2928932"></path>
      </g>
    </svg>
  </button>

  {paginationRender}
  <button
    aria-label="Next"
    class="page-nav-pt3"
    disabled={nextChevron ? false : true}
    onClick={()=>props.goToPage(props.activePage+1)}
  >
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
      <g fill="none">
        <path d="m12 4 11.2928932 11.2928932c.3905243.3905243.3905243 1.0236893 0 1.4142136l-11.2928932 11.2928932"></path>
      </g>
    </svg>
  </button>
</div>
</nav>

</div>


  </>
)
}
else {
  return (<div className="page-nav-sj2">
  <div className="page-nav-al1">
  <div
    class="_j4dv73"
    role="navigation"
    aria-label="pagination"
  >
    <div class="_1wg991r">
      <button
        aria-disabled="true"
        aria-label="Previous page"
        type="button"
        class="_1kjng5b"
        disabled={prevChevron ? false : true}
        onClick={()=>props.goToPage(props.activePage-1)}
      >
        <span class="_3hmsj">
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
              <path d="m20 28-11.29289322-11.2928932c-.39052429-.3905243-.39052429-1.0236893 0-1.4142136l11.29289322-11.2928932"></path>
            </g>
          </svg>
        </span>
      </button>
    </div>
    <div class="_1wg991r">
      <button
        aria-disabled="false"
        aria-label="Next page"
        class="_1kjng5b"
        disabled={nextChevron ? false : true}
        onClick={()=>props.goToPage(props.activePage+1)}
      >
        <span class="_3hmsj">
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
              <path d="m12 4 11.2928932 11.2928932c.3905243.3905243.3905243 1.0236893 0 1.4142136l-11.2928932 11.2928932"></path>
            </g>
          </svg>
        </span>
      </button>
    </div>
  </div>
  </div>
  </div>)
}

}

export default PaginationNav;
