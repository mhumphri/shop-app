import area from "@turf/area";


const calcLandArea = (activePolygons) => {

let totalArea = 0;
for (let i = 0; i < activePolygons.length; i++) {
  totalArea += area(activePolygons[i]);
}

return totalArea

}

export default calcLandArea;
