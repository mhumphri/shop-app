import getActivePolygons from "./getActivePolygons";
import getHotelNumber from "./getHotelNumber";
import generateHotelArray from "./generateHotelArray";
import getHotelsInBbox from "./getHotelsInBbox";
import getUrbanPolygons from "./getUrbanPolygons";
import getBboxCityPolygons from "./getBboxCityPolygons";
import shuffleArray from "./shuffleArray";
import calcLandArea from "./calcLandArea";
import getCityRadius from "./getCityRadius";
import bbox from "@turf/bbox";
import booleanIntersects from "@turf/boolean-intersects";
import cityData from "../data/cityData.json";
import bboxPolygon from "@turf/bbox-polygon";
import area from "@turf/area";
import distance from "@turf/distance";
import { point } from "@turf/helpers";
import booleanPointInPolygon from "@turf/boolean-point-in-polygon";
import circle from "@turf/circle";
import intersect from "@turf/intersect";

// updates search results in response to the map moving (either when there is a drag or zoom event )
const mapSearch = (
  searchKey,
  newMapParameters,
  prevHotelArray,
  searchType,
  finalPageHotels
) => {
  const zoom = newMapParameters.zoom;
  const mapBox = newMapParameters.box;

  // initialise search return variables
  let newHotelArray = [];
  let newMaxPages = 0;
  let newNumberHotels = 0;
  let newActivePage = 1;

  const bboxNorth = newMapParameters.bounds.toJSON().north;
  const bboxEast = newMapParameters.bounds.toJSON().east;
  const bboxSouth = newMapParameters.bounds.toJSON().south;
  const bboxWest = newMapParameters.bounds.toJSON().west;

  const bbox = [bboxWest, bboxSouth, bboxEast, bboxNorth];

  const bboxPoly = bboxPolygon(bbox);
  // calculate pixel area of map on screen
  const bboxAreaPx = mapBox.width * mapBox.height;
  // calculate km2 area of map on screen
  const bboxAreaKm = Math.round(area(bboxPoly) / 1000000);

  // create boundary box (with padding) for current map bounds

  // calc longitude padding
  let ewDiff =
    newMapParameters.bounds.toJSON().east -
    newMapParameters.bounds.toJSON().west;
  if (ewDiff < 0) {
    ewDiff = 360 - ewDiff;
  }
  const mapContainerWidthPx = newMapParameters.box.width;
  const lngPaddingPx = 50;
  const lngPaddingDegrees = (ewDiff * lngPaddingPx) / mapContainerWidthPx;

  // calc north padding
  let northCenterDiff =
    newMapParameters.bounds.toJSON().north - newMapParameters.center.lat();
  const halfContainerHeightPx = newMapParameters.box.height / 2;
  const latPaddingPx = 25;
  const northPaddingDegrees =
    (northCenterDiff * latPaddingPx) / halfContainerHeightPx;

  // calc south padding
  let centerSouthDiff =
    newMapParameters.center.lat() - newMapParameters.bounds.toJSON().south;
  const southPaddingDegrees =
    (centerSouthDiff * latPaddingPx) / halfContainerHeightPx;

  // boundary box with padding subtracted [W,S,E,N] - used for positioning new hotels on the map
  const paddedBbox = [
    bboxWest + lngPaddingDegrees,
    bboxSouth + southPaddingDegrees,
    bboxEast - lngPaddingDegrees,
    bboxNorth - northPaddingDegrees,
  ];

  // larger bbox (expanded by 0.4degrees, /40km) which is used to capture cities which may expand onto the bbox but bave a centre point outside the bbox
  const expandedBbox = [
    bboxWest - 0.4,
    bboxSouth - 0.4,
    bboxEast + 0.4,
    bboxNorth + 0.4,
  ];

  const expandedBboxPoly = bboxPolygon(expandedBbox);



  // !!!! need to get rid of function and add intersection to all cities, proportion, pop_max cal to all intersecting cities !!!!

  let activeCities = [];
  let totalPopulation = 0;
  for (let i = 0; i < cityData.features.length; i++) {
    const cityPoint = point(cityData.features[i].geometry.coordinates);

    if (booleanPointInPolygon(cityPoint, bboxPoly)) {
      activeCities.push(cityData.features[i]);
      const cityRadius = getCityRadius(cityData.features[i].properties.pop_max);
      const cityCircle = circle(cityPoint, cityRadius);
      if (booleanIntersects(cityCircle, bboxPoly)) {
        const intersectingArea = intersect(bboxPoly, cityCircle);
        const cityCircleKm = area(cityCircle);
        const intersectingAreaKm = area(intersectingArea);
        const proportionInside = intersectingAreaKm / cityCircleKm;
        const populationInside =
          proportionInside * cityData.features[i].properties.pop_max;
        totalPopulation = totalPopulation + populationInside;
      } else {
        totalPopulation =
          totalPopulation + cityData.features[i].properties.pop_max;
      }
    }
    if (
      booleanPointInPolygon(cityPoint, expandedBboxPoly) &&
      !booleanPointInPolygon(cityPoint, bboxPoly)
    ) {
      const cityRadius = getCityRadius(cityData.features[i].properties.pop_max);
      const cityCircle = circle(cityPoint, cityRadius);
      if (booleanIntersects(cityCircle, bboxPoly)) {
        activeCities.push(cityData.features[i]);
        const intersectingArea = intersect(bboxPoly, cityCircle);
        const cityCircleKm = area(cityCircle);
        const intersectingAreaKm = area(intersectingArea);
        const proportionInside = intersectingAreaKm / cityCircleKm;
        const populationInside =
          proportionInside * cityData.features[i].properties.pop_max;
        totalPopulation = totalPopulation + populationInside;
      }
    }
  }

  console.log("activeCities.length: " + activeCities.length);

  const cityPolygons = getBboxCityPolygons(paddedBbox, activeCities);

  console.log("cityPolygons.length: " + cityPolygons.length);

  newNumberHotels = Math.ceil(totalPopulation / 10000);

  newMaxPages = Math.ceil(newNumberHotels / 18);
  if (newMaxPages > 15) {
    newMaxPages = 15;
  }

  const activePolygons = getActivePolygons(newMapParameters.bounds);

  // gets array of hotels from previous search results which are within the map boundaries of the new search (these will remain as search results and will not be deleted from the results list / map)
  let existingHotelArray = getHotelsInBbox(prevHotelArray, paddedBbox);

  // create object which contains data on the number of existing hotels in each city
  let cityHotelNumbers = {};
  for (let i = 0; i < existingHotelArray.length; i++) {
    if (existingHotelArray[i].cityName) {
      if (cityHotelNumbers[existingHotelArray[i].cityName]) {
        cityHotelNumbers[existingHotelArray[i].cityName]++;
      } else {
        cityHotelNumbers[existingHotelArray[i].cityName] = 1;
      }
    }
  }

  if (newMapParameters && newMapParameters.prevZoom > newMapParameters.zoom) {
    existingHotelArray = [];
  }

  const existingHotels = existingHotelArray.length;

  const existingHotelsCount = existingHotelArray.length;

  if (existingHotelsCount > newNumberHotels) {
    newNumberHotels = existingHotelsCount;
  }

  newHotelArray = [...existingHotelArray];

  let newHotelsNeeded = 18 - existingHotelsCount;
  let cityOuterPolygons = [];

  let maxHotels = 18;
  if (newNumberHotels < 18) {
    maxHotels = newNumberHotels;
  }
  if (finalPageHotels) {
    maxHotels = finalPageHotels;
  }

  if (maxHotels > 0) {
    for (let i = 0; i < cityPolygons.length; i++) {

      // number of pixels on map occupied by city
      const cityPx = (cityPolygons[i].areaOuter / bboxAreaKm) * bboxAreaPx;
      // number of hotels which can be displyed on cityPx
      const totalHotelsInCity = Math.ceil(cityPx / 1500);
      // console.log("totalHotelsInCity: " + totalHotelsInCity)

      // number of hotels currently displayed on visible city polygons
      const currentHotelsInCity = cityHotelNumbers[cityPolygons[i].name]
        ? cityHotelNumbers[cityPolygons[i].name]
        : 0;
      // console.log("currentHotelsInCity: " + currentHotelsInCity)
      // number of hotels which can be displayed in addition to currently displayed hotels
      let newHotelsInCity = totalHotelsInCity - currentHotelsInCity;
      // maximum new hotels which can be added to array (18 max per page)
      let maxNewHotels = maxHotels - newHotelArray.length;
      /* if (maxHotels < 18) {
        maxNewHotels = maxHotels - newHotelArray.length;
      } */
      // console.log("maxHotels: " + maxHotels)

      if (newHotelsInCity > maxNewHotels) {
        newHotelsInCity = maxNewHotels;
      }

      const cityHotelArray = generateHotelArray(
        cityPolygons[i].name,
        newHotelArray,
        newHotelsInCity,
        cityPolygons[i].polygonsOuter,
        paddedBbox
      );
      newHotelArray.push(...cityHotelArray);

      if (newHotelArray.length >= maxHotels) {
        break;
      }
    }
  }

  let hotelShortfall = maxHotels - newHotelArray.length;

  console.log("hotelShortfall: " + hotelShortfall);

  if (hotelShortfall > 0) {
    const randomHotelArray = generateHotelArray(
      false,
      [],
      hotelShortfall,
      activePolygons,
      paddedBbox
    );
    newHotelArray.push(...randomHotelArray);
  }

  if (searchType === "updatePage") {
    newMaxPages = false;
    newNumberHotels = false;
    newActivePage = false;
    let numHotels = 18;
  }

  shuffleArray(newHotelArray);

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
