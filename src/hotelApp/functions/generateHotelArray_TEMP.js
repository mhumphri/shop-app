import hotelData from "../data/hotelData";
import getOtherPhotos from "./getOtherPhotos";
import getRandomLocation from "./getRandomLocation";
import randomNumberInRange from "./randomNumberInRange";
import generateKey from "./generateKey";

// generates data for hotels returned by search. Takes numbers of hotels, active land polygons and refresh (deleted all prev results if true) as arguments
const generateHotelArray = (
  prevHotelArray,
  numHotels,
  activePolygons,
  newMapParameters,
  refresh
) => {


  // initialises search result array
  let newHotelArray = [];

  // if refresh set to false this code identifies hotels from the previous search which fall within current search map bounds and adds them to new search results
  if (!refresh) {
    // range of lng and lat for current map
    const boundsLatLo = JSON.stringify(
      newMapParameters.bounds.toJSON().south
    );
    const boundsLatHi = JSON.stringify(
      newMapParameters.bounds.toJSON().north
    );
    const boundsLngLo = JSON.stringify(newMapParameters.bounds.toJSON().west);
    const boundsLngHi = JSON.stringify(newMapParameters.bounds.toJSON().east);
    // counts number of hotels returned by prev search which remain within the map bounds of current search (these will remain as search results)
    for (let i = 0; i < prevHotelArray.length; i++) {
      const hotelLat = prevHotelArray[i].coords.lat;
      const hotelLng = prevHotelArray[i].coords.lng;
      // identifies hotels from the previous search which fall within current search map bounds and adds them to new search results
      if (
        hotelLat > boundsLatLo &&
        hotelLat < boundsLatHi &&
        hotelLng > boundsLngLo &&
        hotelLng < boundsLngHi
      ) {
        newHotelArray.push(prevHotelArray[i]);
      }
    }
  }

  // number of hotels from previous search which have been retained for current search (as they fall within current search map bounds)
  const currentArrayLength = newHotelArray.length;

  let newHotelData = { ...hotelData };

  // deletes properties from newHotelData, if those hotels are present in newHotelArray (so that hotels do not appear more than once in the search results)
  for (let i = 0; i < newHotelArray.length; i++) {
    if (newHotelData[newHotelArray[i].hotelDataKey]) {
      delete newHotelData[newHotelArray[i].hotelDataKey];
    }
  }

  // function for randomly selecting hotel from object
  const getRandomHotel = (obj) => {
    var keys = Object.keys(obj);
    return obj[keys[(keys.length * Math.random()) << 0]];
  };

  // adds new hotels to make up difference between the number of hotels retained frok previous search and number required for this search
  for (let i = currentArrayLength; i < numHotels; i++) {
    // randomly selects hotel from newHotelData object
    const randomHotel = getRandomHotel(newHotelData);
    // deletes selected hotel from newHotelData object (so that it cannot appear twice in the search results)
    delete newHotelData[randomHotel.key];
    // takes main hotel photo from randomHotel object
    let photoArray = [randomHotel.pic];
    // gets a random selection of other photos for the hotel
    const otherPhotoArray = getOtherPhotos();
    // merges both arrays so that there is a unique, hotel-specific photo as the fist array element, followed by a random selection of other photos
    const mergedPhotoArray = photoArray.concat(otherPhotoArray);
    // generates location coords and country using mapboounds, mapbox, margin and active polygons as arguments
    const location = getRandomLocation(
      newMapParameters.bounds,
      newMapParameters.box,
      50,
      activePolygons
    );

    // generates data from new hotel and adds to search results array
    const newHotel = {
      name: randomHotel.name,
      key: generateKey(12),
      hotelDataKey: randomHotel.key,
      coords: location.coords,
      country: location.country,
      price: randomNumberInRange(30, 450),
      photos: mergedPhotoArray,
      rating: randomNumberInRange(30, 50) / 10,
      numReviews: randomNumberInRange(5, 200),
    };
    newHotelArray.push(newHotel);
  }

  return newHotelArray;

};

export default generateHotelArray
