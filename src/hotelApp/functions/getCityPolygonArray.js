import landPolygons from "../data/landPolygons.json";
import cityData from "../data/cityData.json";
import { polygon, point } from "@turf/helpers";
import intersect from "@turf/intersect";
import booleanPointInPolygon from "@turf/boolean-point-in-polygon";
import circle from "@turf/circle";
import area from "@turf/area";


const getCityPolygonArray = (outerPolygons, activeCities) => {
  console.log("getCityPolygonArray!!")
  let cityObjects = [];

  let activePolygons = [];



  for (let i = 0; i < landPolygons.features.length; i++) {
    console.log("landPolygons.features.length: " + i)
    const landPoly = polygon(landPolygons.features[i].geometry.coordinates);

    const intersection = intersect(outerPolygons, landPoly);

    if (intersection) {
      console.log("INTERSECTION!")
      activePolygons.push(intersection);
    }
  }



console.log("NEXT SATGE")
  let loopLimit = activeCities.length;
  if (loopLimit > 18) {
    loopLimit = 18;
  }

  console.log("loopLimit: " + loopLimit)

  for (let i = 0; i < loopLimit; i++) {
    const cityPoint = point(activeCities[i].geometry.coordinates);
    const cityArea = activeCities[i].properties.MAX_AREAKM;
    const cityName = activeCities[i].properties.name;
    const cityPopulation = activeCities[i].properties.pop_max;

      let polygonsOuter = [];
      let polygonsInner = [];
      let areaOuter = 0;

      let circleOuter;
      let circleInner;

      let radiusOuter = 5;
      if (cityPopulation > 250000) {
        radiusOuter = 7;
      }
      if (cityPopulation > 500000) {
        radiusOuter = 10;
      }
      if (cityPopulation > 1000000) {
        radiusOuter = 12;
      }
      if (cityPopulation > 2000000) {
        radiusOuter = 16;
      }
      if (cityPopulation > 5000000) {
        radiusOuter = 20;
      }
      if (cityPopulation > 7500000) {
        radiusOuter = 25;
      }
      if (cityPopulation > 10000000) {
        radiusOuter = 30;
      }
      if (cityPopulation > 15000000) {
        radiusOuter = 40;
      }

      let radiusInner = radiusOuter / 3;
      if (cityArea) {
        radiusOuter = Math.sqrt(cityArea / Math.PI) / 2;
        radiusInner = radiusOuter / 2;
      }

      circleOuter = circle(cityPoint, radiusOuter);
      circleInner = circle(cityPoint, radiusInner);

      for (let i = 0; i < activePolygons.length; i++) {
        const intersectionOuter = intersect(circleOuter, activePolygons[i]);
        if (intersectionOuter) {
          polygonsOuter.push(intersectionOuter);
          areaOuter = areaOuter + area(intersectionOuter) / 1000000;
        }

        const intersectionInner = intersect(circleInner, activePolygons[i]);
        if (intersectionInner) {
          polygonsInner.push(intersectionInner);
        }
      }


      const cityObject = {
        name: cityName,
        population: cityPopulation,
        polygonsOuter: polygonsOuter,
        polygonsInner: polygonsInner,
        circleOuter: circleOuter,
        areaOuter: areaOuter,
      };

      // console.log("cityObject: " + JSON.stringify(cityObject))
      cityObjects.push(cityObject);

  }

  console.log("return city objects")

  return cityObjects;
};

export default getCityPolygonArray;
