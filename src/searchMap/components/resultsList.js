import React, { useState, useEffect, useRef } from "react";
import IndListItem from "./indListItem";
import PaginationNav from "./paginationNav";
import "../css/resultsList.css";

//

function ResultsList(props) {

const [numberHotelsLocal, setNumberHotelsLocal] = useState(1000);
const [hotelArrayLocal, setHotelArrayLocal] = useState(props.hotelArray);
const [dataLoadingLocal, setDataLoadingLocal] = useState(true);
const [listItemLoading, setListItemLoading] = useState(true);



//
useEffect(() => {
if (!props.dataLoading) {
  setNumberHotelsLocal(props.numberHotels)
  setHotelArrayLocal(props.hotelArray)
  setDataLoadingLocal(false)
  setListItemLoading(false)
}
else {
  setDataLoadingLocal(true)
  setListItemLoading(true)
}
}, [props.dataLoading]);


//
useEffect(() => {
if (!props.pageLoading) {
  setListItemLoading(false)
  setHotelArrayLocal(props.hotelArray)
}
else {
  setListItemLoading(true)
}
}, [props.pageLoading]);

return (
  <>
  <div className="results-list-yt6"><span className={dataLoadingLocal ? "results-list-kb8" : ""}>{numberHotelsLocal > 999 ? "1,000+" : numberHotelsLocal} results</span></div>
  <div className="results-list-na8">
  <div ref={props.listContainerRef} className="results-list-lq1">
{hotelArrayLocal.map((x, index) => (
<IndListItem listItemLoading={listItemLoading} key={index} itemId={index} hotelData={x} setActiveLink={props.setActiveLink} hoverHotel={props.hoverHotel} setHoverHotel={props.setHoverHotel}  />
))}

  </div>

<PaginationNav activePage={props.activePage} maxPages={props.maxPages} goToPage={props.goToPage} numberHotels={props.numberHotels} />

  </div>

  </>
)

}

export default ResultsList;
