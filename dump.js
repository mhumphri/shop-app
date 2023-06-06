///////////////

const zoom = newMapParameters.zoom
const existingHotels = existingHotelArray.length

if (zoom<7 && urbanPolygons.length>0) {
    newHotelArray = generateHotelArray(existingHotelArray, 18, urbanPolygons, paddedBbox)
}
else if (zoom>6 && cityPolygons.length>0) {

if (cityPolygons.length<urbanPolygons.length) {
// find and delete urban polygons which intersect with city polygons

let residualUrbanPolygons = [ ...urbanPolygons]
console.log("residualUrbanPolygons: " + JSON.stringify(residualUrbanPolygons))

/*
let i = residualUrbanPolygons.length;
while (i >= 0) {
  console.log("residualUrbanPolygons: " + JSON.stringify(residualUrbanPolygons[i]))
    i--;
}
*/

}

else {
console.log("cityPolygons[0]: " + JSON.stringify(cityPolygons[0]))
const locationBbox = bbox(cityPolygons[0].circleOuter);
const requiredHotels = 18 - existingHotels
const numberHotelsInner = Math.round(requiredHotels*2/3)
const numberHotelsOuter = requiredHotels - numberHotelsInner
const newHotelArrayOuter = generateHotelArray([], numberHotelsOuter, cityPolygons[0].polygonsOuter, locationBbox, true)
const newHotelArrayInner = generateHotelArray([], numberHotelsInner, cityPolygons[0].polygonsInner, locationBbox, true)
const currentCityArray = newHotelArrayOuter.concat(newHotelArrayInner);
newHotelArray = existingHotelArray.concat(currentCityArray);

}
}
else if (urbanPolygons.length>0) {
  newHotelArray = generateHotelArray(existingHotelArray, 18, urbanPolygons, paddedBbox)
}
else {
  newHotelArray = []
}


// number of hotels returned >0 search results are generated an stored in hotelArray state
/* if (activePolygons.length > 0) {



  newHotelArray = generateHotelArray(existingHotelArray, numberHotelsInArray, urbanPolygons, paddedBbox)

} */



/////////////

if (cityPolygons.length<urbanPolygons.length) {
  // find and delete urban polygons which intersect with city polygons

  let residualUrbanPolygons = [ ...urbanPolygons]

  let i = residualUrbanPolygons.length;
  while (i >= 0) {
    for (let j=0; j<cityPolygons.length; j++) {
      if (booleanIntersects(residualUrbanPolygons[i], cityPolygons[j])) {
        console.log("booleanIntersects!!!")
      }
    }
    /* const random = Math.floor(Math.random() * otherPhotosArray.length);
    otherPhotosArray.splice(random, 1); */
    i--;
  }

}



// randomly delete photos from otherPhotos array until reach given number
let i = otherPhotosArray.length;
while (i >= numPhotos) {
  const random = Math.floor(Math.random() * otherPhotosArray.length);
  otherPhotosArray.splice(random, 1);
  i--;
}
