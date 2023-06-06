import cityPoints from "../data/cityPoints.json";
import cityData from "../data/cityData.json";
import landPolygons from "../data/landPolygons.json";
import getCityRadius from "./getCityRadius";
import bbox from "@turf/bbox";
import circle from "@turf/circle";
import intersect from "@turf/intersect";
import { polygon } from "@turf/helpers";
import area from "@turf/area";

// this function returns geographic data for a given city

const getCityPolygon = (cityName, activePolygons) => {
  let polygonsOuter = [];
  let polygonsInner = [];
  let areaOuter = 0;
  let circleOuter;
  let circleInner;

  let cityPoint;
  let cityArea;
  let cityPopulation;
  let cityNameOnly

  for (let i = 0; i < cityData.features.length; i++) {
    cityNameOnly = cityData.features[i].properties.name
    const elementCityName =
      cityData.features[i].properties.name +
      ", " +
      cityData.features[i].properties.adm0name;
    if (cityName === elementCityName) {
      /* place inside array brackets so can be processed in getRandomCoordinates() */
      cityPoint = cityData.features[i].geometry.coordinates;
      // cityArea=cityPoints.features[i].properties.MAX_AREAKM;
      cityPopulation = cityData.features[i].properties.pop_max;
      // const cityName = cityData.features[i].properties.name;
      let radiusOuter = getCityRadius(cityData.features[i].properties.pop_max);
      let radiusInner = radiusOuter / 3;

      circleOuter = circle(cityPoint, radiusOuter);
      circleInner = circle(cityPoint, radiusInner);

      console.log();

      if (activePolygons) {
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
      } else {
        for (let i = 0; i < landPolygons.features.length; i++) {
          const landPoly = polygon(
            landPolygons.features[i].geometry.coordinates
          );

          const intersectionOuter = intersect(circleOuter, landPoly);
          if (intersectionOuter) {
            polygonsOuter.push(intersectionOuter);
            areaOuter = areaOuter + area(intersectionOuter) / 1000000;
          }

          const intersectionInner = intersect(circleInner, landPoly);
          if (intersectionInner) {
            polygonsInner.push(intersectionInner);
          }
        }
      }

      break;
    }
  }

  return {
    name: cityNameOnly,
    population: cityPopulation,
    polygonsOuter: polygonsOuter,
    polygonsInner: polygonsInner,
    circleOuter: circleOuter,
    areaOuter: areaOuter,
  };
};

export default getCityPolygon;
