import React, { useState, useEffect, useRef } from "react";
import IndListItem from "./indListItem";
import PageNav from "./pageNav";
import "../css/resultsList.css";

//

function ResultsList(props) {

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
  <div className="results-list-yt6">268 hotels</div>
  <div className="results-list-na8">
  <div className="results-list-lq1">
{[1,2,3,4,5,6,7,8,9].map((x) => (
<IndListItem />
))}

  </div>

<PageNav />

  </div>

  </>
)

}

export default ResultsList;
