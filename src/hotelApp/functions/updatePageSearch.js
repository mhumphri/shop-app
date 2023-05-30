import mapSearch from "./mapSearch";
import locationSearch from "./locationSearch";


// updates search results in response to the map moving (either when there is a drag or zoom event )
const updatePageSearch = (searchKey, searchLocation, mapData, finalPageHotels) => {

console.log("updatePageSearch1: " + searchLocation)

let searchResults

  if (!searchLocation.name || searchLocation.name==="map area") {
    console.log("updatePageSearch2")
    searchResults = mapSearch(searchKey, mapData, [], "updatePage", finalPageHotels)
  }
  else {
    console.log("updatePageSearch3")
    console.log("finalPageHotels: " + finalPageHotels)

    searchResults = locationSearch(searchKey, searchLocation, "updatePage", finalPageHotels)
  }

  console.log("updatePageSearch4")

return searchResults

}

export default updatePageSearch
