



// number of hotels from previous search which have been retained for current search (as they fall within current search map bounds)
const currentArrayLength = newHotelArray.length;

// !!!NEED AN EXTRA STEP HERE TO ACCOUNT FOR PHTOS RETAINED FROM PREV SEARCH!!!!
// generates array with numbers 0 to 19 - used to select unique photo from list of stock photos
let indexArray = [];
for (let i = 0; i < 26; i++) {
  indexArray.push(i);
}

// adds new hotels to make up difference between the number of hotels retained frok previous search and number required for this search
for (let i = currentArrayLength; i < numHotels; i++) {
  // randomly selects an index value from indexArray
  const mainPicIndex = Math.floor(Math.random() * indexArray.length);
  // sets value (number between 0 and 19) to identify main photo
  const mainPic = indexArray[mainPicIndex];
  // main pic value is deleted from index array, so it cannot be selected again
  indexArray.splice(mainPicIndex, 1);
  //!! NEED TO SEE WHAT'S GOING ON WITH BOX AND MARGIN!!
  // generates location coords and country using mapboounds, mapbox, margin and active polygons as arguments
  const location = getRandomLocation(
    mapParameters.bounds,
    mapParameters.box,
    50,
    activePolygons
  );

  // generates data from new hotel and adds to search results array
  const newHotel = {
    name: "accomodation name",
    key: generateKey(12),
    coords: location.coords,
    country: location.country,
    price: randomNumberInRange(30, 450),
    photos: getPhotos(mainPic),
    rating: randomNumberInRange(30, 50) / 10,
    numReviews: randomNumberInRange(5, 200),
  };
  newHotelArray.push(newHotel);
}


//////////////////

{props.itemLoading ? null : (
  <div class="swipeable-gallery-o1q">
    <div />



    <div class="swipeable-gallery-b1t">
      <div class="swipeable-gallery-byc"></div>
      <div class="swipeable-gallery-bal">
        <div
          role="img"
          class="swipeable-gallery-r75"
        >
          <div class="swipeable-gallery-szn">
            {dotsRender(currentPhoto)}
          </div>
        </div>
      </div>
      <div class="swipeable-gallery-b18"></div>
    </div>
  </div>
)}

/////////

const allowUpdate = () => {
  let allowUpdate = true
  // calcs time interval since last screen resize (if below 500ms it is assumed that change in map bounds results from screen resize and new search is aborted)
  const msSinceResize = Date.now() - resize;

  if (msSinceResize < 500) {
    allowUpdate = false
  }

  if (lastViewToggle) {
    const msSinceLastViewToggle = Date.now() - lastViewToggle;
    console.log("msSinceLastViewToggleX: " + msSinceLastViewToggle)
    console.log("expandMapView: " + expandMapView)
    if (largeView && !expandMapView && msSinceLastViewToggle < 1500) {
      allowUpdate = false
    }
    if (largeView && expandMapView && msSinceLastViewToggle < 500) {
      allowUpdate = false
    }
    if (!largeView && msSinceLastViewToggle < 500) {
      allowUpdate = false
    }
  }

  if (lastSearchModalEvent) {
    const msSinceLastSearchModalEvent = Date.now() - lastSearchModalEvent;
    console.log("msSinceLastSearchModalEvent: " + msSinceLastSearchModalEvent)
    if (msSinceLastSearchModalEvent<500) {
      allowUpdate = false
    }
  }
  return allowUpdate
}

console.log("allowUpdate(): " + allowUpdate())
