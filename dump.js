const nextPage = () => {
  let activePolygons = getActivePolygons(mapParameters.bounds);
  if (searchLocation!=="map area" && searchLocation!=="") {
    activePolygons = [getCountryPolygons(searchLocation)];
  }

  let numberPages = Math.ceil(numberHotels/18)
  if (numberPages>14) {
    numberPages=15
  }

  let newActivePage = activePage + 1
  let hotelsInArray = 18
  if (newActivePage<=numberPages) {
    if (newActivePage===numberPages) {
      hotelsInArray = numberHotels - (numberPages-1)*18
    }

    triggerDataLoading()
    setActivePage(newActivePage)
    setHotelArray(generateHotelArray(hotelsInArray, activePolygons, true))
  }



};
