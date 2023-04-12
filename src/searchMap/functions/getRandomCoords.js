import randomNumber from "./randomNumber";
import booleanPointInPolygon from "@turf/boolean-point-in-polygon";
import { randomPoint } from "@turf/random";
import bbox from "@turf/bbox";
import area from "@turf/area";

const getRandomCoords = (mapBounds, mapDimensions, mapMarginPx, activePolygons) => {

  const neCoords = mapBounds.getNorthEast(); // Coords of the northeast corner
  const swCoords = mapBounds.getSouthWest(); // Coords of the southwest corner


  /* step 1 - select random (with weightings to account for land mass) element from active land polygon array  */

  /* step 1a - calculate total land mass  */
  let totalArea = 0;
  for (let i = 0; i < activePolygons.length; i++) {
    totalArea += area(activePolygons[i]);
  }

  /* step 1b - randomly select a number bewteen zero and total area and take the polygon at that point in the distribution  */
  const randomArea = randomNumber(0, totalArea);

  let currentElement = 0;
  let areaSum = 0;
  for (let i = 0; i < activePolygons.length; i++) {
    areaSum += area(activePolygons[i]);
    if (areaSum >= randomArea) {
      break;
    } else {
      currentElement += 1;
    }
  }

  const randomLandPoly = activePolygons[currentElement];

  /* step 2 - calculate border box around selected polygon */

  const randomLandBbox = bbox(randomLandPoly);

  const marginCheck = (testPoint) => {
    let checkResult = true;

    const marginPx = mapMarginPx;
    const viewHeight = mapDimensions.height;
    const latRange = neCoords.lat() - swCoords.lat();
    const latLimit = (marginPx / viewHeight) * latRange;
    const latDistNorth = neCoords.lat() - testPoint.geometry.coordinates[1];
    const latDistSouth = testPoint.geometry.coordinates[1] - swCoords.lat();
    if (latDistNorth < latLimit || latDistSouth < latLimit) {
      checkResult = false;
    }

    const viewWidth = mapDimensions.width;

    let lngRange = neCoords.lng() - swCoords.lng();



 if (neCoords.lng()<0 && swCoords.lng()>0) {

      lngRange = Math.abs((-180 - neCoords.lng())) + (180-swCoords.lng())
    }
    if (neCoords.lng()>0 && swCoords.lng()>0 || neCoords.lng()<0 && swCoords.lng()<0) {
      if (neCoords.lng()<swCoords.lng()) {
        lngRange = 360 - (swCoords.lng() - neCoords.lng())
      }
    }

    /* if neCoords.lng() - swCoords.lng() < 0 different calculation is used
    if (neCoords.lng() - swCoords.lng() < 0) {
      console.log("ISSUE")
      lngRange = 360 - (neCoords.lng() - swCoords.lng());
      console.log("neCoords.lng(): " + neCoords.lng())
      console.log("swCoords.lng(): " + swCoords.lng())
      console.log("lngRange: " + lngRange)
    }
    */
    const lngLimit = (marginPx / viewWidth) * lngRange;

    const lngDistEast = Math.abs(neCoords.lng() - testPoint.geometry.coordinates[0]);

    const lngDistWest = Math.abs(testPoint.geometry.coordinates[0] - swCoords.lng());

    if (lngDistWest < lngLimit || lngDistEast < lngLimit) {
      checkResult = false;
    }

    return checkResult;

  };

  /* step 3 - brute force coordinate verification with loop generating new coordinate within boundary box and chancks to make sure it is inside land polygon. If it is not, a new coordinate is generated   */

  let verifiedPoint;

  for (let i = 0; i < 100; i++) {

    let newPoint = randomPoint(1, { bbox: randomLandBbox });
    newPoint = newPoint.features[0];
    if (
      booleanPointInPolygon(newPoint, randomLandPoly) &&
       marginCheck(newPoint)
    ) {
      verifiedPoint = newPoint;
      break;
    }
    if (i===99) {
      verifiedPoint = newPoint;
      break;
    }
  }



  return {
    lng: verifiedPoint.geometry.coordinates[0],
    lat: verifiedPoint.geometry.coordinates[1],
  };
};

export default getRandomCoords;
