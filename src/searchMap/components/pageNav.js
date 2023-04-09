import React, { useState, useEffect, useRef } from "react";
import "../css/pageNav.css";

//

function PageNav(props) {

  const [paginationRender, setPaginationRender] = useState(1);
  const [nextChevron, setNextChevron] = useState(true);
  const [prevChevron, setPrevChevron] = useState();

  /* handles click of next chevron */
  const nextPage = () => {
    // dispatch(updateActivePage(activePage + 1));
  };

  /* handles click of prev chevron */
  const prevPage = () => {
  //  dispatch(updateActivePage(activePage - 1));
  };

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
    onClick={prevPage}
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
    onClick={nextPage}
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

export default PageNav;
