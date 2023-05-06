import React, { useState, useEffect, useRef } from "react";
import IndListItem from "./indListItem";
import PaginationNav from "./paginationNav";
import "../css/resultsList.css";

// top level component for search results list view - contains logic for controlling mock "data loading" styles

function ResultsList(props) {
  // generates mock hotelArray data for initial render (so that list results list appears greyed out on load)
  const getHotelArrayInit = () => {
    let hotelArrayInit = [];
    for (let i = 0; i < 18; i++) {
      // generates data from new hotel and adds to search results array
      const newHotel = {
        name: "accomodation name",
        key: "ABCDEFGHIJKL",
        coords: { lat: 48.6, lng: 0 },
        country: "country name",
        price: 150,
        photos: [],
        rating: 3.8,
        numReviews: 122,
      };
      hotelArrayInit.push(newHotel);
    }
    return hotelArrayInit;
  };

  // local copies of hotel data etc which are used to introduce delay, giving the appearance of data being loaded from server
  const [numberHotelsLocal, setNumberHotelsLocal] = useState(1000);
  const [hotelArrayLocal, setHotelArrayLocal] = useState(getHotelArrayInit());
  const [dataLoadingLocal, setDataLoadingLocal] = useState(true);
  // boolean which indicates if list item data is currently in loading state - used to control css (grey blocked out html elements) that indicate data is loading from server
  const [listItemLoading, setListItemLoading] = useState(true);

  // controls local store of hotelArray, and numberhotels. Numbers are updated when props.dataLoading boolean updates to false
  useEffect(() => {
    if (!props.firstLoad) {
      if (!props.dataLoading) {
        setNumberHotelsLocal(props.numberHotels);
        setHotelArrayLocal(props.hotelArray);
        setDataLoadingLocal(false);
        setListItemLoading(false);
      } else {
        setDataLoadingLocal(true);
        setListItemLoading(true);
        // scrolls back to top of resultsList when dataLoading is set to true
          window.scrollTo(0, 0);
      }
    }
  }, [props.dataLoading]);

  // controls local store of hotelArray but not numberhotels. This reflects hotelArray update reulting from paginationNav (which doesn't refresh overall search). Numbers are updated when props.pageLoading boolean updates to false
  useEffect(() => {
    if (!props.firstLoad) {
      if (!props.pageLoading) {
        setListItemLoading(false);
        setHotelArrayLocal(props.hotelArray);
      } else {
        setListItemLoading(true);
        // scrolls back to top of resultsList when pageLoading is set to true
          window.scrollTo(0, 0);
      }
    }
  }, [props.pageLoading]);


  // controls local store of hotelArray but not numberhotels. This reflects hotelArray update reulting from paginationNav (which doesn't refresh overall search). Numbers are updated when props.pageLoading boolean updates to false
  useEffect(() => {
    if (props.smallSearchModalOpen) {
      setHotelArrayLocal([]);
    }
    else {
      setHotelArrayLocal(props.hotelArray);
    }
  }, [props.smallSearchModalOpen]);


  return (
    <>
      <div className="results-list-yt6">
        <span className={dataLoadingLocal ? "results-list-kb8" : ""}>
          {numberHotelsLocal > 999 ? "1,000+" : numberHotelsLocal} results
        </span>
      </div>
      <div className="results-list-na8">
        <div ref={props.listContainerRef} className="results-list-lq1">
          {hotelArrayLocal.map((x, index) => (
            <IndListItem
              listItemLoading={listItemLoading}
              key={index}
              itemId={index}
              hotelData={x}
              setActiveLink={props.setActiveLink}
              hoverHotel={props.hoverHotel}
              setHoverHotel={props.setHoverHotel}
            />
          ))}
        </div>

        <PaginationNav
          activePage={props.activePage}
          maxPages={props.maxPages}
          goToPage={props.goToPage}
          numberHotels={props.numberHotels}
        />
      </div>
    </>
  );
}

export default ResultsList;
