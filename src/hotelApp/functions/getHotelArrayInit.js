// generates mock hotelArray data for initial render (so that list results list appears greyed out on load)
const getHotelArrayInit = () => {
  let hotelArrayInit = [];
  for (let i = 0; i < 18; i++) {
    // generates data from new hotel and adds to search results array
    const newHotel = {
      name: "accomodation name",
      key: "ABCDEFGHIJKL",
      coords: { lat: 48.6, lng: 0 },
      country: "country name",
      price: 150,
      photos: [],
      rating: 3.8,
      numReviews: 122,
      locationName: "city in country",
    };
    hotelArrayInit.push(newHotel);
  }
  return hotelArrayInit;
};

export default getHotelArrayInit
