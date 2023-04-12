import countryPolygons from "../data/countryPolygons.json";
import { polygon } from "@turf/helpers";
import intersect from "@turf/intersect";

/* this function returns relevnt land polygons which fall within a given map boundary */

const getCountryPolygons = (countryName) => {

console.log("COUNTRY NAME: " + countryName)


let countryPolygon

for (let i=0; i<countryPolygons.features.length; i++) {

    if (countryName===countryPolygons.features[i].properties.NAME) {
      /* place inside array brackets so can be processed in getRandomCoordinates() */
      countryPolygon=countryPolygons.features[i];
      break;
    }

}







return countryPolygon


};

export default getCountryPolygons;
