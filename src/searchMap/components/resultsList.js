import React, { useState, useEffect, useRef } from "react";
import IndListItem from "./indListItem";
import PageNav from "./pageNav";
import "../css/resultsList.css";

//

function ResultsList(props) {

const [numberHotelsLocal, setNumberHotelsLocal] = useState(1000);
const [dataLoadingLocal, setDataLoadingLocal] = useState(true);

/* listens for screen re-size and updates screen width variable */
useEffect(() => {
if (!props.dataLoading) {
  setNumberHotelsLocal(props.numberHotels)
  setDataLoadingLocal(false)
}
else {
  setDataLoadingLocal(true)
}
}, [props.dataLoading]);

return (
  <>
  <div className="results-list-yt6"><span className={dataLoadingLocal ? "results-list-kb8" : ""}>{numberHotelsLocal > 999 ? "1,000+" : numberHotelsLocal} results</span></div>
  <div className="results-list-na8">
  <div ref={props.listContainerRef} className="results-list-lq1">
{[1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9].map((x) => (
<IndListItem />
))}

  </div>

<PageNav activePage={props.activePage} maxPages={props.maxPages} goToPage={props.goToPage} numberHotels={props.numberHotels} />

  </div>

  </>
)

}

export default ResultsList;
