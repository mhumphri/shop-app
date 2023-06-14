// takes array of current hotels and new boundary box as arguments and returns an array of current hotels which are in the new boundary box

const getHotelsInBbox = (currentHotelArray, newBbox) => {

  // initialises search result array
  let newHotelArray = [];

    // range of lng and lat for new map boundary box
    const boundSouth = newBbox[1]
    const boundNorth = newBbox[3]
    const boundWest = newBbox[0]
    const boundEast = newBbox[2]
    // counts number of hotels returned by prev search which remain within the map bounds of current search (these will remain as search results)
    for (let i = 0; i < currentHotelArray.length; i++) {
      const hotelLat = currentHotelArray[i].coords.lat;
      const hotelLng = currentHotelArray[i].coords.lng;
      // identifies hotels from the previous search which fall within current search map bounds and adds them to new search results
      if (
        hotelLat > boundSouth &&
        hotelLat < boundNorth &&
        hotelLng > boundWest &&
        hotelLng < boundEast
      ) {
        newHotelArray.push(currentHotelArray[i]);
      }
    }

return newHotelArray

}

export default getHotelsInBbox
