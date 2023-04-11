import React, { useState, useEffect, useRef } from "react";
import IndListItem from "./indListItem";
import PageNav from "./pageNav";
import "../css/resultsList.css";

//

function ResultsList(props) {



return (
  <>
  <div className="results-list-yt6">268 results</div>
  <div className="results-list-na8">
  <div ref={props.listContainerRef} className="results-list-lq1">
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
