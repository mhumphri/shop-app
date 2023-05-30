import getActivePolygons from "./getActivePolygons";
import getHotelNumber from "./getHotelNumber";
import generateHotelArray from "./generateHotelArray";
import getHotelsInBbox from "./getHotelsInBbox";

// updates search results in response to the map moving (either when there is a drag or zoom event )
const mapSearch = (searchKey, newMapParameters, prevHotelArray, searchType, finalPageHotels) => {

  // initialise search return variables
  let newHotelArray = [];
  let newMaxPages = 0;
  let newNumberHotels = 0;
  let newActivePage = 1

  // create boundary box (with padding) for current map bounds


  // calc longitude padding
  let ewDiff = newMapParameters.bounds.toJSON().east - newMapParameters.bounds.toJSON().west
  if (ewDiff<0) {
    ewDiff = 360 - ewDiff
  }
  const mapContainerWidthPx = newMapParameters.box.width
  const lngPaddingPx = 50;
  const lngPaddingDegrees = ewDiff * lngPaddingPx / mapContainerWidthPx



  // calc north padding
  let northCenterDiff = newMapParameters.bounds.toJSON().north - newMapParameters.center.lat()
  const halfContainerHeightPx = newMapParameters.box.height/2
  const latPaddingPx = 25;
  const northPaddingDegrees = northCenterDiff * latPaddingPx / halfContainerHeightPx

  // calc south padding
  let centerSouthDiff = newMapParameters.center.lat() - newMapParameters.bounds.toJSON().south
  const southPaddingDegrees = centerSouthDiff * latPaddingPx / halfContainerHeightPx

  // boundary box with padding [W,S,E,N]
  const paddedBbox = [newMapParameters.bounds.toJSON().west+lngPaddingDegrees, newMapParameters.bounds.toJSON().south+southPaddingDegrees, newMapParameters.bounds.toJSON().east-lngPaddingDegrees, newMapParameters.bounds.toJSON().north-northPaddingDegrees]



  const activePolygons = getActivePolygons(newMapParameters.bounds);

// gets array of hotels from previous search results which are within the map boundaries of the new search (these will remain as search results and will not be deleted from the results list / map)
let existingHotelArray = getHotelsInBbox(prevHotelArray, paddedBbox)


if (newMapParameters && newMapParameters.prevZoom>newMapParameters.zoom ) {
  existingHotelArray = []
}

const existingHotelsCount = existingHotelArray.length



  // calcs number of hotels based on land area implied by active map bounds
  const additionalHotels = getHotelNumber(activePolygons);
  // adds on exisitng hotels from prev search (this is to make sure that the hotel number is >= to hotels currently on map for the search area. This is a fail safe as getHotelNumber() may return a v low number when we zoom down to very small search areas )
  newNumberHotels = existingHotelsCount + additionalHotels;

  newMaxPages = Math.ceil(newNumberHotels / 18);
  if (newMaxPages > 15) {
    newMaxPages = 15;
  }

  // sets number of hotels returned by search - default is 18 per page but can be lower if total numer returned by search is less than 18 (i.e. the search area is very small)
  let numberHotelsInArray = 18;
  if (newNumberHotels < 18) {
    numberHotelsInArray = newNumberHotels;
  }

  // number of hotels returned >0 search results are generated an stored in hotelArray state
  if (activePolygons.length > 0) {



    newHotelArray = generateHotelArray(existingHotelArray, numberHotelsInArray, activePolygons, paddedBbox)

  }

  if (searchType==="updatePage") {
    newMaxPages = false;
    newNumberHotels = false;
    newActivePage = false;
    let numHotels = 18
    if (finalPageHotels) {
      numHotels = finalPageHotels
    }
    console.log("numHotels: " + numHotels)
    newHotelArray = generateHotelArray([], numHotels, activePolygons, paddedBbox)
    console.log("newHotelArray: " + JSON.stringify(newHotelArray))
  }

  let newSearchData = {
    searchKey: searchKey,
    hotelArray: newHotelArray,
    mapBbox: false,
    numberHotels: newNumberHotels,
    maxPages: newMaxPages,
    activePage: newActivePage,
  };


  return newSearchData;
};

export default mapSearch;
