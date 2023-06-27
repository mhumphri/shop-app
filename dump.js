{"bounds":{"south":34.4474080493929,"west":-28.125,"north":59.66479446051232,"east":28.125},"center":{"lat":48.6,"lng":0},"zoom":5,"box":{"x":1280,"y":85,"width":1280,"height":866,"top":85,"right":2560,"bottom":951,"left":1280}} hotelApp.js:295

// location serach
console.log("GETCOUNTRYDATA2: " + mapData.box)
let bboxAreaPx
if (mapBox) {
    bboxAreaPx = mapBox.width * mapBox.height;
  }
  else {
    if (window.innerWidth<768) {
    bboxAreaPx = window.innerWidth * window.innerHeight;
  }
  else {
    bboxAreaPx = (window.innerWidth * window.innerHeight)/2;
  }
  }

// hotalApp

console.log("searchParams.get_city : " + searchParams.get("city"))
const searchCity = searchParams.get("city")
const searchCountry = searchParams.get("country")
console.log("searchParams.get_country : " + searchParams.get("country"))
console.log("firstLoad : " + firstLoad)

if (searchCountry) {
  const locationObject = {"name":searchCountry,"type":"country"}
  makeServerCall("location", locationObject);
}
if (searchCity) {
  const locationObject = {"name":searchCity,"type":"city"}
  makeServerCall("location", locationObject);
}
