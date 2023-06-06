import urbanPolygons from "../data/urbanAreaPolygons";
import { polygon } from "@turf/helpers";
import intersect from "@turf/intersect";
import bboxPolygon from "@turf/bbox-polygon";

const getUrbanPolygons = (bbox) => {

let intersectingPolygons = []
console.log("bbox: " + bbox)

const bboxPoly = bboxPolygon(bbox)

console.log("bboxPoly: " + bboxPoly)


for (let i = 0; i < urbanPolygons.features.length; i++) {
  const urbanPoly = polygon(urbanPolygons.features[i].geometry.coordinates);

  const intersection = intersect(bboxPoly, urbanPoly);

  if (intersection) {
    intersectingPolygons.push(intersection);
  }
}


return intersectingPolygons

}

export default getUrbanPolygons
