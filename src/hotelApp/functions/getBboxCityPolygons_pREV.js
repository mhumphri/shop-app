import landPolygons from "../data/landPolygons.json";
import cityPoints from "../data/cityPoints.json";
import { polygon, point } from "@turf/helpers";
import intersect from "@turf/intersect";
import bboxPolygon from "@turf/bbox-polygon";
import booleanPointInPolygon from "@turf/boolean-point-in-polygon";
import circle from "@turf/circle";

const getBboxCityPolygons = (bbox) => {

  let cityObjects = []

  const bboxPoly = bboxPolygon(bbox);




  let activePolygons = [];
  for (let i = 0; i < landPolygons.features.length; i++) {
    const landPoly = polygon(landPolygons.features[i].geometry.coordinates);

    const intersection = intersect(bboxPoly, landPoly);

    if (intersection) {
      activePolygons.push(intersection);
    }
  }

//  console.log("activePolygons: " + JSON.stringify(activePolygons))




for (let i=0; i<cityPoints.features.length; i++) {
const cityPoint = point(cityPoints.features[i].geometry.coordinates)
const cityArea=cityPoints.features[i].properties.MAX_AREAKM;
const cityPopulation=cityPoints.features[i].properties.POP_MAX;

if (booleanPointInPolygon(cityPoint, bboxPoly)) {
  // console.log("Match: " + cityPoints.features[i].properties.NAME)

  let polygonsOuter = []
  let polygonsInner = []
  let circleOuter
  let circleInner


  let radiusOuter = 15
  let radiusInner = radiusOuter/3
  if (cityArea) {
    // console.log("cityArea: " + cityArea);
    radiusOuter = Math.sqrt(cityArea / Math.PI)/2
    radiusInner = radiusOuter/2;
  }

  circleOuter = circle(cityPoint, radiusOuter);
  circleInner = circle(cityPoint, radiusInner);

  for (let i = 0; i < activePolygons.length; i++) {

    const intersectionOuter = intersect(circleOuter, activePolygons[i]);
    if (intersectionOuter) {
      polygonsOuter.push(intersectionOuter);
    }

    const intersectionInner = intersect(circleInner, activePolygons[i]);
    if (intersectionInner) {
      polygonsInner.push(intersectionInner);
    }
  }


const cityObject = {
  polygonsOuter: polygonsOuter,
  polygonsInner: polygonsInner,
  circleOuter: circleOuter,
  population: cityPopulation,
}

// console.log("cityObject: " + JSON.stringify(cityObject))
cityObjects.push(cityObject)

}

}



return cityObjects

}

export default getBboxCityPolygons
