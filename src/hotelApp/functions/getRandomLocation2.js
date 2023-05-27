import countryPolygons from "../data/countryPolygons.json";
import randomNumberInRange from "./randomNumberInRange";
import booleanPointInPolygon from "@turf/boolean-point-in-polygon";
import { randomPoint } from "@turf/random";
import bbox from "@turf/bbox";
import { multiPolygon, polygon } from "@turf/helpers";
import area from "@turf/area";
import circle from "@turf/circle";
import intersect from "@turf/intersect";

const getRandomCoords = (
  mapBbox,
  mapContainer,
  mapMarginPx,
  activePolygons
) => {

/*
  return {
    coords: {
      lng: verifiedPoint.geometry.coordinates[0],
      lat: verifiedPoint.geometry.coordinates[1],
    },
    country: countryName,
  };
  */
};

export default getRandomCoords;
