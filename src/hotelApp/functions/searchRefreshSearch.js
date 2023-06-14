import mapSearch from "./mapSearch";
import locationSearch from "./locationSearch";


// updates search results in response to the map moving (either when there is a drag or zoom event )
const searchRefreshSearch = (searchKey, searchLocation, mapData) => {

let searchResults
console.log("search refesh 1")
  if (!searchLocation.name || searchLocation.name==="map area") {
    console.log("search refesh map area")
    searchResults = mapSearch(searchKey, mapData, [], "searchRefresh")
  }
  else {
    searchResults = locationSearch(searchKey, searchLocation, "searchRefresh")
  }

return searchResults

}

export default searchRefreshSearch
