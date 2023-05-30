import mapSearch from "./mapSearch";
import locationSearch from "./locationSearch";


// updates search results in response to the map moving (either when there is a drag or zoom event )
const searchRefreshSearch = (searchKey, searchLocation, mapData) => {

let searchResults

  if (!searchLocation || searchLocation==="map area") {
    searchResults = mapSearch(searchKey, mapData, [], "searchRefresh")
  }
  else {
    searchResults = locationSearch(searchKey, searchLocation, "searchRefresh")
  }

return searchResults

}

export default searchRefreshSearch
