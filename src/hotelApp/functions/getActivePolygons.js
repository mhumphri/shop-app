import landPolygons from "../data/landPolygons.json";
import { polygon } from "@turf/helpers";
import intersect from "@turf/intersect";

/* this function returns relevnt land polygons which fall within a given map boundary */

const getActivePolygons = (mapBounds) => {
  const neCoords = mapBounds.getNorthEast(); // Coords of the northeast corner
  const swCoords = mapBounds.getSouthWest(); // Coords of the southwest corner


  /* step 1 - create polygon representing map boundaries */

  const boundaryPoly = polygon([
    [
      [swCoords.lng(), swCoords.lat()],
      [neCoords.lng(), swCoords.lat()],
      [neCoords.lng(), neCoords.lat()],
      [swCoords.lng(), neCoords.lat()],
      [swCoords.lng(), swCoords.lat()],
    ],
  ]);

  /* need to split out map boundaries around longitude extremities under certain condition - see if statement below */

  const boundaryPolyA = polygon([
    [
      [swCoords.lng(), swCoords.lat()],
      [180, swCoords.lat()],
      [180, neCoords.lat()],
      [swCoords.lng(), neCoords.lat()],
      [swCoords.lng(), swCoords.lat()],
    ],
  ]);

  const boundaryPolyB = polygon([
    [
      [neCoords.lng(), neCoords.lat()],
      [-180, neCoords.lat()],
      [-180, swCoords.lat()],
      [neCoords.lng(), swCoords.lat()],
      [neCoords.lng(), neCoords.lat()],
    ],
  ]);

  /* step 2 - identify land polygons which are within the map boundaries and add to array */

  const findPolygons = (boundaryPoly) => {
    let activePolygons = [];
    for (let i = 0; i < landPolygons.features.length; i++) {
      const landPoly = polygon(landPolygons.features[i].geometry.coordinates);

      const intersection = intersect(boundaryPoly, landPoly);

      if (intersection) {
        activePolygons.push(intersection);
      }
    }
    return activePolygons;
  };

  let activePolygons;

  /* if neCoords.lng() - swCoords.lng() < 0 map is split and two arrays of land polygons are concatenated */
  if (neCoords.lng() - swCoords.lng() < 0) {
    let activePolygonsA = findPolygons(boundaryPolyA);
    let activePolygonsB = findPolygons(boundaryPolyB);

    activePolygons = activePolygonsA.concat(activePolygonsB);
  } else {
    activePolygons = findPolygons(boundaryPoly);
  }

return activePolygons

};

export default getActivePolygons;
