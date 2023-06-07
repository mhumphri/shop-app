import getCountryPolygons from "./getCountryPolygons";
import getCityPolygon from "./getCityPolygon";
import generateHotelArray from "./generateHotelArray";
import getCityRadius from "./getCityRadius";
import area from "@turf/area";
import bbox from "@turf/bbox";
import { point } from "@turf/helpers";
import booleanPointInPolygon from "@turf/boolean-point-in-polygon";
import bboxPolygon from "@turf/bbox-polygon";
import circle from "@turf/circle";
import cityData from "../data/cityData.json";

// updates search results in response to the map moving (either when there is a drag or zoom event )
const locationSearch = (
  searchKey,
  locationData,
  mapData,
  searchType,
  finalPageHotels
) => {

  // initialise search return variables
  let newHotelArray = [];
  let newMaxPages = 0;
  let newNumberHotels = 0;
  let locationBbox = false;
  let newActivePage = 1;

  // code for city search
  if (locationData.type === "city") {
    // returns map polygons and other summary data for city
    const cityPolygons = getCityPolygon(locationData.name);
    // returns map boundary box for city map polygons
    locationBbox = bbox(cityPolygons.circleOuter);
    // calculates number of hotels returned by search - one for each 10,000 city population
    const population = cityPolygons.population;
    if (population) {
      newNumberHotels = Math.round(population / 10000);
    }
    // calculates number of pages returned by search - 18 hotels per page, capped at 15 pages
    newMaxPages = Math.ceil(newNumberHotels / 18);
    if (newMaxPages > 15) {
      newMaxPages = 15;
    }
    // sets number of hotels to be returned from inner city and outer city - idea is to concentrate hotels returned in city centre
    let numberHotelsInner = 12;
    let numberHotelsOuter = 6;
    // if total number of hotles returnd by search is less than default 18, inner/outer city numbers are pro-rated
    if (newNumberHotels < 18) {
      numberHotelsInner = Math.round((newNumberHotels * 2) / 3);
      numberHotelsOuter = newNumberHotels - numberHotelsInner;
    }
    // if search is returning results for last page this calculates and sets the number of search results that will appear (possibly less than the default 18)
    if (finalPageHotels) {
      numberHotelsInner = Math.round((finalPageHotels * 2) / 3);
      numberHotelsOuter = finalPageHotels - numberHotelsInner;
    }
    // generates array of hotels for outer city
    const newHotelArrayOuter = generateHotelArray(
      cityPolygons.name,
      [],
      numberHotelsOuter,
      cityPolygons.polygonsOuter,
      locationBbox,
      true
    );
    // generates array of hotels for inner city
    const newHotelArrayInner = generateHotelArray(
      cityPolygons.name,
      [],
      numberHotelsInner,
      cityPolygons.polygonsInner,
      locationBbox,
      true
    );
    // arrays for inner/outer city are merged
    newHotelArray = newHotelArrayOuter.concat(newHotelArrayInner);
  }
    // code for country search
  else if (locationData.type === "country") {

    // step 1 get map polygons and boundary box for country
    const countryPolygons = getCountryPolygons(locationData.name);
    locationBbox = bbox(countryPolygons);
    // generate a turf polygon represenataion of country boundary box
    const locationBboxPoly = bboxPolygon(locationBbox);

    // calculate pixel area of map on screen
    const mapBox = mapData.box;
    const bboxAreaPx = mapBox.width * mapBox.height;
    // calculate km2 area of map on screen
    const bboxAreaKm = Math.round(area(locationBboxPoly) / 1000000);

    // step 2.1 - identifies and generates array of cities which fall inside the country polygon(s)
    // step 2.2 - calculates total population of cities which fall inside the country polygon(s)
    let activeCityArray = [];
    let totalPopulation = 0;
    for (let i = 0; i < cityData.features.length; i++) {
      const cityPoint = point(cityData.features[i].geometry.coordinates);
      // if city coords are inside map boundary box: (1) city is added to array; (2) population is added to total population
      if (booleanPointInPolygon(cityPoint, countryPolygons)) {
        const cityRadius = getCityRadius(
          cityData.features[i].properties.pop_max
        );
        const cityCircle = circle(cityPoint, cityRadius);
        const areaOuter = area(cityCircle) / 1000000;

        totalPopulation = totalPopulation + cityData.features[i].properties.pop_max;
        // object is created for city with summary data and added to activeCityArray
        const newCity = {
          name: cityData.features[i].properties.name,
          polygonsOuter: cityCircle,
          areaOuter: areaOuter,
        };
        activeCityArray.push(newCity);
      }
    }

    // step 3 - calculate number of hotels and max page number for population identified in activeCityArray
    // calculates number of hotels returned by search - one for each 10,000 city population
    newNumberHotels = Math.ceil(totalPopulation / 10000);
    // calculates number of pages returned by search - 18 hotels per page, capped at 15 pages
    newMaxPages = Math.ceil(newNumberHotels / 18);
    if (newMaxPages > 15) {
      newMaxPages = 15;
    }

    // step 4 - array of hotels is generated for each city in activeCityArray and added to newHotels array (which is returned by search)
    let maxHotels = 18;
    for (let i = 0; i < activeCityArray.length; i++) {
      // number of pixels on map occupied by city
      const cityPx = (activeCityArray[i].areaOuter / bboxAreaKm) * bboxAreaPx;
      // number of hotels which can be displyed on cityPx (one per 1500px)
      const totalHotelsInCity = Math.ceil(cityPx / 1500);
      // generates array of new hotels for city
      const cityHotelArray = generateHotelArray(
        activeCityArray[i].name,
        newHotelArray,
        totalHotelsInCity,
        [activeCityArray[i].polygonsOuter],
        locationBbox,
        true
      );
      // array of new hotels added to array of hotels to be returned by search
      newHotelArray.push(...cityHotelArray);
      // if newHotelArray equals or exceeds max hotel number looping is stopped
      if (newHotelArray.length >= maxHotels) {
        break;
      }
    }

    // ADD SHORTFALL CODE !!!

    
  }

  // if search typs is "update page" newMaxPages, newNumberHotels, newActivePage are set to false as these values do not need to be updated
  if (searchType === "updatePage") {
    newMaxPages = false;
    newNumberHotels = false;
    locationBbox = false;
    newActivePage = false;
  }
  // search data object to be returned
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
