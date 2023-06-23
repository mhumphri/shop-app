gmp-click
console.log("markers.length: "  + markers.length)

//// - wrong
if (navigateAway) {
  for (let i = 0; i < markers.length; i++) {
    markers[1].marker.map = null;
    markers.splice(i, 1);
  }
}

let j = markers.length;
while (j--) {
  if (!keysObject[markers[j].markerData.key] || navigateAway) {
    markers[j].marker.map = null;
    markers.splice(j, 1);
  }
}

if (navigateAway) {
  console.log("NAVIGATE AWAY DELETE MARKERS")
  let j = markers.length;
  while (j--) {
      markers[j].marker.map = null;
  }
  markers = []

}
