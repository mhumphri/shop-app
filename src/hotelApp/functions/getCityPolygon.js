import cityPoints from "../data/cityPoints.json";
import landPolygons from "../data/landPolygons.json";
import bbox from "@turf/bbox";
import circle from "@turf/circle";
import intersect from "@turf/intersect";
import { polygon } from "@turf/helpers";

/* this function returns relevnt land polygons which fall within a given map boundary */

const getCityPolygon = (cityName) => {

console.log("COUNTRY NAME: " + cityName)


let polygonsOuter = []
let polygonsInner = []
let circleOuter
let circleInner

let cityPoint
let cityArea

for (let i=0; i<cityPoints.features.length; i++) {

  const elementCityName = cityPoints.features[i].properties.NAME + ", " + cityPoints.features[i].properties.ADM0NAME
    if (cityName===elementCityName) {
      /* place inside array brackets so can be processed in getRandomCoordinates() */
      cityPoint=cityPoints.features[i].geometry.coordinates;
      cityArea=cityPoints.features[i].properties.MAX_AREAKM;
      console.log("cityArea: " + cityArea)
      break;
    }

}

console.log("cityPoint: " + cityPoint)
if (cityPoint) {
  let radiusOuter = 15
  let radiusInner = radiusOuter/3
  if (cityArea) {
    console.log("cityArea: " + cityArea);
    radiusOuter = Math.sqrt(cityArea / Math.PI);
    radiusInner = radiusOuter/3;
  }

  circleOuter = circle(cityPoint, radiusOuter);
  circleInner = circle(cityPoint, radiusInner);

  for (let i = 0; i < landPolygons.features.length; i++) {
    const landPoly = polygon(landPolygons.features[i].geometry.coordinates);

    const intersectionOuter = intersect(circleOuter, landPoly);
    if (intersectionOuter) {
      polygonsOuter.push(intersectionOuter);
    }

    const intersectionInner = intersect(circleInner, landPoly);
    if (intersectionInner) {
      polygonsInner.push(intersectionInner);
    }
  }


}







return {
  polygonsOuter: polygonsOuter,
  polygonsInner: polygonsInner,
  circleOuter: circleOuter,
}


};

export default getCityPolygon;
