import getCountryPolygons from "./getCountryPolygons";
import landPolygons from "../data/landPolygons.json";
import getCityPolygon from "./getCityPolygon";
import generateHotelArray from "./generateHotelArray";
import getCityRadius from "./getCityRadius";
import mapSearch from "./mapSearch";
import area from "@turf/area";
import bbox from "@turf/bbox";
import { point } from "@turf/helpers";
import intersect from "@turf/intersect";
import booleanPointInPolygon from "@turf/boolean-point-in-polygon";
import bboxPolygon from "@turf/bbox-polygon";
import circle from "@turf/circle";
import cityData from "../data/cityData.json";
import countryPolygons from "../data/countryPolygons.json";

// updates search results in response to the map moving (either when there is a drag or zoom event )
const locationSearch = (searchKey, locationData, mapData, searchType, finalPageHotels) => {

console.log("mapData: " + JSON.stringify(mapData))

  // initialise search return variables
  let newHotelArray = [];
  let newMaxPages = 0;
  let newNumberHotels = 0;
  let locationBbox = false;
  let newActivePage = 1

  let locationPolygons = []


console.log("locationData: " + JSON.stringify(locationData))

  if (locationData.type==="city") {
    console.log("city search")
const cityPolygons = getCityPolygon(locationData.name);
console.log("cityPolygon: " + JSON.stringify(cityPolygons))
locationBbox = bbox(cityPolygons.circleOuter);
// get total number of hotels in city
const population = cityPolygons.population
newNumberHotels = 106

if (population) {
  newNumberHotels = Math.round(population/10000)
}
console.log("population: " + population)
console.log("newNumberHotels: " + newNumberHotels)

newMaxPages = Math.ceil(newNumberHotels / 18);
if (newMaxPages > 15) {
  newMaxPages = 15;
}

let numberHotelsInner = 12
let numberHotelsOuter = 6



if (newNumberHotels<18) {
  numberHotelsInner = Math.round(newNumberHotels*2/3)
  numberHotelsOuter = newNumberHotels - numberHotelsInner
}
console.log("loacationSearchAA")
console.log("newMaxPages: " + newMaxPages)

// if search is returning results for last page this calculates and sets the number of search results that will appear (possibly less than the default 18)
if (finalPageHotels) {

  numberHotelsInner = Math.round(finalPageHotels*2/3)
  numberHotelsOuter = finalPageHotels - numberHotelsInner
}

console.log("locationBbox: " + JSON.stringify(locationBbox))
console.log("cityPolygons.name: " + cityPolygons.name)
const newHotelArrayOuter = generateHotelArray(cityPolygons.name, [], numberHotelsOuter, cityPolygons.polygonsOuter, locationBbox, true)
const newHotelArrayInner = generateHotelArray(cityPolygons.name, [], numberHotelsInner, cityPolygons.polygonsInner, locationBbox, true)
newHotelArray = newHotelArrayOuter.concat(newHotelArrayInner);


  }
  else if (locationData.type==="country") {
    console.log("country search")

    //const countrySearchData = mapSearch(searchKey, {}, [], false, false, "countrySearch")
    // console.log("countrySearchData: " + JSON.stringify(countrySearchData))
    // mapSearch(searchKey, newMapParameters, prevHotelArray, searchType, finalPageHotels, countrySearch)

    // step 1 get the country polygons

    const countryPolygons = getCountryPolygons(locationData.name);
    locationBbox = bbox(countryPolygons);
    const locationBboxPoly = bboxPolygon(locationBbox);
    console.log("countryPolygons: " + JSON.stringify(countryPolygons))
    console.log("locationBbox: " + JSON.stringify(locationBbox))

    // calculate pixel area of map on screen
    const mapBox = mapData.box;
    console.log("mapBox: " + mapBox)
    const bboxAreaPx = mapBox.width * mapBox.height;
    console.log("bboxAreaPx: " + bboxAreaPx)
    // calculate km2 area of map on screen
    const bboxAreaKm = Math.round(area(locationBboxPoly) / 1000000);
    console.log("bboxAreaKm: " + bboxAreaKm)


    // step 2 - determine what cities are inside the country polygons

    let activeCityArray = [];
    let totalPopulation = 0;
    for (let i = 0; i < cityData.features.length; i++) {
      const cityPoint = point(cityData.features[i].geometry.coordinates);

      if (booleanPointInPolygon(cityPoint, countryPolygons)) {

        const cityRadius = getCityRadius(cityData.features[i].properties.pop_max);
        const cityCircle = circle(cityPoint, cityRadius);
        const areaOuter = area(cityCircle) / 1000000;

          totalPopulation =
            totalPopulation + cityData.features[i].properties.pop_max;


            const newCity = {
              name: cityData.features[i].properties.name,
              polygonsOuter: cityCircle,
              areaOuter: areaOuter,
            };
            activeCityArray.push(newCity);
      }
    }

    console.log("activeCityArray: " + JSON.stringify(activeCityArray))



    // step 3 - calculate number of hotels and max page number for population identified in activeCityArray

    newNumberHotels = Math.ceil(totalPopulation / 10000);

    console.log("newNumberHotels: " + newNumberHotels);

    newMaxPages = Math.ceil(newNumberHotels / 18);
    if (newMaxPages > 15) {
      newMaxPages = 15;
    }

    console.log("newMaxPages: " + newMaxPages);


    // step 4

    let maxHotels = 18

    for (let i = 0; i < activeCityArray.length; i++) {


      // number of pixels on map occupied by city
      const cityPx = (activeCityArray[i].areaOuter / bboxAreaKm) * bboxAreaPx;
      console.log("cityPx: " + cityPx)
      // number of hotels which can be displyed on cityPx
      const totalHotelsInCity = Math.ceil(cityPx / 1500);

  console.log("totalHotelsInCity: " + totalHotelsInCity)


      const cityHotelArray = generateHotelArray(activeCityArray[i].name, newHotelArray, totalHotelsInCity, [activeCityArray[i].polygonsOuter], locationBbox, true)

      newHotelArray.push(...cityHotelArray);

      console.log("newHotelArray: " + JSON.stringify(newHotelArray))

      if (newHotelArray.length >= maxHotels) {
        break;
      }
    }

    /*
    // get polygons for country
    const locationPolygons = getCountryPolygons(locationData.name);
    console.log("locationPolygons COUNTRY: " + JSON.stringify(locationPolygons))
    // get bbox for country
    locationBbox = bbox(locationPolygons);



    console.log("locationBbox: " + JSON.stringify(locationBbox))
    //


    console.log("newHotelArray: " + JSON.stringify(newHotelArray))

    //

newHotelArray = generateHotelArray("cityName", [], 18, [locationPolygons], locationBbox, true)
//  shuffleArray(newHotelArray);
*/

  }



  if (searchType==="updatePage") {
    newMaxPages = false;
    newNumberHotels = false;
    locationBbox = false;
    newActivePage = false;
  }




  let newSearchData = {
    searchKey: searchKey,
    hotelArray: newHotelArray,
    mapBbox: locationBbox,
    numberHotels: newNumberHotels,
    maxPages: newMaxPages,
    activePage: newActivePage,
  };

  return newSearchData;
};

export default locationSearch;
