const dayjs = require("dayjs");

// creates string for stay link href based on search input variables
const getHref = (roomKey, searchData) => {

let newHref = "/hotel-app/hotels/" + roomKey

/*
let newHref = "/rooms/" + roomKey + "?"

let localDates = searchData.dates
let localCoords

// if date values haven't been inputted by user, default values are used

  for (let i=0; i<searchData.roomArray.length; i++) {
    if (searchData.roomArray[i].key===roomKey) {
      if (!localDates.checkin) {
      localDates = searchData.roomArray[i].defaultDates
    }
      localCoords = searchData.roomArray[i].coords
    }
  }


  if (searchData.guests.Adults>0) {
    newHref += "adults=" + searchData.guests.Adults
  if (searchData.guests.Children>0) {
    newHref += "&children=" + searchData.guests.Children
  }
  if (searchData.guests.Infants>0) {
    newHref += "&infants=" + searchData.guests.Infants
  }
  if (searchData.guests.Pets>0) {
    newHref += "&pets=" + searchData.guests.Pets
  }
  if (localDates.checkin) {
    newHref += "&check_in=" + dayjs(localDates.checkin).format('YYYY-MM-DD')
  }
}
if (localDates.checkin && !searchData.guests.Adults>0) {
  newHref += "check_in=" + dayjs(localDates.checkin).format('YYYY-MM-DD')
}
  if (localDates.checkout) {
    newHref += "&check_out=" + dayjs(localDates.checkout).format('YYYY-MM-DD')
  }
  if (localCoords) {
      newHref += "&lat=" + localCoords.lat + "&lng=" + localCoords.lng
  }
  */


  return newHref

}

export default getHref
