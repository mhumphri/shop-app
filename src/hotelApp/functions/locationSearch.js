import getCountryPolygons from "./getCountryPolygons";
import getCityPolygon from "./getCityPolygon";
import getHotelNumber from "./getHotelNumber";
import generateHotelArray from "./generateHotelArray";
import bbox from "@turf/bbox";

// updates search results in response to the map moving (either when there is a drag or zoom event )
const locationSearch = (searchData) => {
  // initialise search return variables
  let newHotelArray = [];
  let newMaxPages = 15;
  let newNumberHotels = 1000;
  let locationBbox = false;

  let locationPolygons = []

  if (searchData.location.type==="city") {
    console.log("city search")
const cityPolygons = getCityPolygon(searchData.location.name);
console.log("cityPolygon: " + JSON.stringify(cityPolygons))
locationBbox = bbox(cityPolygons.circleOuter);
console.log("locationBbox: " + JSON.stringify(locationBbox))
const newHotelArrayOuter = generateHotelArray([], 6, cityPolygons.polygonsOuter, locationBbox, true)
const newHotelArrayInner = generateHotelArray([], 12, cityPolygons.polygonsInner, locationBbox, true)
newHotelArray = newHotelArrayOuter.concat(newHotelArrayInner);


  }
  else if (searchData.location.type==="country") {
    console.log("country search")
    // get polygons for country
    const locationPolygons = getCountryPolygons(searchData.location.name);
    console.log("locationPolygons COUNTRY: " + JSON.stringify(locationPolygons))
    // get bbox for country
    locationBbox = bbox(locationPolygons);



    console.log("locationBbox: " + JSON.stringify(locationBbox))
    //


    console.log("newHotelArray: " + JSON.stringify(newHotelArray))

    //

newHotelArray = generateHotelArray([], 18, [locationPolygons], locationBbox, true)
//  shuffleArray(newHotelArray);

  }








  let newSearchData = {
    hotelArray: newHotelArray,
    mapBbox: locationBbox,
    numberHotels: newNumberHotels,
    maxPages: newMaxPages,
  };

  return newSearchData;
};

export default locationSearch;
