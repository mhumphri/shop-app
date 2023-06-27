import hotelData from "../data/hotelData";
import getOtherPhotos from "./getOtherPhotos";
import getRandomLocation from "./getRandomLocation";
import randomNumberInRange from "./randomNumberInRange";
import generateKey from "./generateKey";
import countryPolygons from "../data/countryPolygons.json";

// generates data for hotels returned by search. Takes numbers of hotels, active land polygons and refresh (deleted all prev results if true) as arguments
const generateHotelArray = (
  cityName,
  existingHotelArray,
  numHotels,
  activePolygons,
  paddedBbox,
  locationSearch
) => {
  let newHotelData = { ...hotelData };

  // deletes properties from newHotelData, if those hotels are present in existingHotelArray (so that hotels do not appear more than once in the search results)
  for (let i = 0; i < existingHotelArray.length; i++) {
    if (newHotelData[existingHotelArray[i].hotelDataKey]) {
      delete newHotelData[existingHotelArray[i].hotelDataKey];
    }
  }

  // function for randomly selecting hotel from object
  const getRandomHotel = (obj) => {
    var keys = Object.keys(obj);
    return obj[keys[(keys.length * Math.random()) << 0]];
  };

  let newHotelArray = [];

  // adds new hotels to make up difference between the number of hotels retained frok previous search and number required for this search
  for (let i = 0; i < numHotels; i++) {
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
      activePolygons,
      paddedBbox,
      locationSearch
    );

    let locationName = "somewhere in " + location.country
    let locationNameShort = location.country
    if (cityName) {
      locationName = cityName + ", " + location.country
      locationNameShort = cityName
    }

    let countryIncomeLevel = 4

    for (let i=0; i<countryPolygons.features.length; i++) {

        if (location.country===countryPolygons.features[i].properties.NAME) {
          /* place inside array brackets so can be processed in getRandomCoordinates() */
          countryIncomeLevel=Number(countryPolygons.features[i].properties.INCOME_GRP.substring(0, 1));
          break;
        }

    }

    // generates data from new hotel and adds to search results array
    const newHotel = {
      name: randomHotel.name,
      key: generateKey(12),
      hotelDataKey: randomHotel.key,
      coords: location.coords,
      country: location.country,
      price: Math.ceil(randomNumberInRange(50, 350)/countryIncomeLevel),
      photos: mergedPhotoArray,
      rating: randomNumberInRange(30, 50) / 10,
      numReviews: randomNumberInRange(5, 200),
      cityName: cityName,
      locationName: locationName,
      locationNameShort: locationNameShort,
    };

    newHotelArray.push(newHotel);
  }

  return newHotelArray;
};

export default generateHotelArray;
