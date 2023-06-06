import getActivePolygons from "./getActivePolygons";
import getHotelNumber from "./getHotelNumber";
import generateHotelArray from "./generateHotelArray";
import getHotelsInBbox from "./getHotelsInBbox";
import getUrbanPolygons from "./getUrbanPolygons";
import getBboxCityPolygons from "./getBboxCityPolygons";
import calcLandArea from "./calcLandArea";
import bbox from "@turf/bbox";
import booleanIntersects from "@turf/boolean-intersects";
import cityData from "../data/cityData.json";

// updates search results in response to the map moving (either when there is a drag or zoom event )
const mapSearch = (searchKey, newMapParameters, prevHotelArray, searchType, finalPageHotels) => {
/*
let cityArray = cityData.features

let cityArrayReduced = []
for (let i=0; i<cityArray.length; i++) {
  if (cityArray[i].properties.pop_max>50000) {
    cityArrayReduced.push(cityArray[i])
  }
}

console.log("cityArrayReduced: " + cityArrayReduced.length)


cityArrayReduced.sort((a,b) => b.properties.pop_max - a.properties.pop_max)
console.log("cityArrayReduced: " + JSON.stringify(cityArrayReduced))
*/

console.log("newMapParameters.ZOOM: " + newMapParameters.zoom)


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


const zoom = newMapParameters.zoom
const existingHotels = existingHotelArray.length

const existingHotelsCount = existingHotelArray.length


// identifies urban area polygons in the current bbox
const urbanPolygons = getUrbanPolygons(paddedBbox)
 console.log("urbanPolygons: " + JSON.stringify(urbanPolygons))
// console.log("urbanPolygons_length: " + urbanPolygons.length)
const cityPolygons = getBboxCityPolygons(paddedBbox);
console.log("cityPolygons: " + JSON.stringify(cityPolygons))
console.log("cityPolygons_length: " + cityPolygons.length)


  console.log("OUTPUTFCN1")
  let newHotelsNeeded = 18 - existingHotelsCount;
  let cityOuterPolygons = []
  let totalPopulation = 0
  for (let i=0; i<cityPolygons.length; i++) {
    totalPopulation = totalPopulation + cityPolygons[i].population
    console.log("cityPolygons[i].population: " + cityPolygons[i].population)
    console.log("totalPopulation" + totalPopulation)
  }

  const maxProportions = {
    1: 1,
    2: 0.75,
    3: 0.6,
    4: 0.5,
    5: 0.45,
    6: 0.4,
    7: 0.35,
    8: 0.3,
    9: 0.3,
    10: 0.3,
    11: 0.3,
    12: 0.3,
    13: 0.3,
    14: 0.3,
    15: 0.3,
    16: 0.3,
    17: 0.3,
    18: 0.3,
  }

 let residualPopulation = totalPopulation
 let additionalHotelArray = []
 let netNewHotelsNeeded = newHotelsNeeded
 let bigCityOverflow
 let topUp = 1

  for (let i=0; i<cityPolygons.length; i++) {

// console.log("cityPolygons[i]: " + JSON.stringify(cityPolygons[i]))

    let populationProportion = cityPolygons[i].population / totalPopulation
    console.log("populationProportion" + populationProportion)



    let numberHotelsInCity = Math.round(populationProportion * newHotelsNeeded) + topUp

    const maxProportion = maxProportions[cityPolygons.length]
    console.log("maxProportion" + maxProportion)
    if (populationProportion>maxProportion) {
      const maxNumberHotelsInCity = Math.round(maxProportion * newHotelsNeeded)

      bigCityOverflow = numberHotelsInCity - maxNumberHotelsInCity
      const remainingCities = cityPolygons.length - i - 1
      topUp = topUp + Math.ceil(bigCityOverflow/remainingCities)
      numberHotelsInCity = maxNumberHotelsInCity
    }

    if (numberHotelsInCity>netNewHotelsNeeded) {
      numberHotelsInCity = netNewHotelsNeeded
    }
    console.log("numberHotelsInCity: " + numberHotelsInCity)


    const cityHotelArray = generateHotelArray([], numberHotelsInCity, cityPolygons[i].polygonsOuter, paddedBbox)
    console.log("cityHotelArray: " + JSON.stringify(cityHotelArray))
    additionalHotelArray.push(...cityHotelArray)
    console.log("additionalHotelArray: " + JSON.stringify(additionalHotelArray))
    console.log("additionalHotelArray.length: " + JSON.stringify(additionalHotelArray.length))
    residualPopulation = residualPopulation - cityPolygons[i].population
    console.log("residualPopulation" + residualPopulation)

    netNewHotelsNeeded = netNewHotelsNeeded - numberHotelsInCity
    console.log("netNewHotelsNeeded: " + netNewHotelsNeeded)
    if (netNewHotelsNeeded<1) {
      break;
    }

  }







  // newHotelArray = existingHotels.concat(additionalHotelArray)
  newHotelArray = additionalHotelArray


console.log("newHotelArray: " + JSON.stringify(newHotelArray))



/*
if (urbanPolygons.length>6) {
  newHotelArray = generateHotelArray(existingHotelArray, 18, urbanPolygons, paddedBbox)
}
*/



/*

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
  */

  let newSearchData = {
    searchKey: searchKey,
    hotelArray: newHotelArray,
    mapBbox: false,
    numberHotels: newNumberHotels,
    maxPages: newMaxPages,
    activePage: newActivePage,
  };


console.log("newSearchData: " + JSON.stringify(newSearchData))

  return newSearchData;
};

export default mapSearch;
