const allowUpdate = () => {
  let allowUpdate = true
  // calcs time interval since last screen resize (if below 500ms it is assumed that change in map bounds results from screen resize and new search is aborted)
  const msSinceResize = Date.now() - resize;

  if (msSinceResize < 500) {
    allowUpdate = false
  }

  if (lastViewToggle) {
    const msSinceLastViewToggle = Date.now() - lastViewToggle;
    console.log("msSinceLastViewToggleX: " + msSinceLastViewToggle)
    console.log("expandMapView: " + expandMapView)
    if (largeView && !expandMapView && msSinceLastViewToggle < 1500) {
      allowUpdate = false
    }
    if (largeView && expandMapView && msSinceLastViewToggle < 500) {
      allowUpdate = false
    }
    if (!largeView && msSinceLastViewToggle < 500) {
      allowUpdate = false
    }
  }

  if (lastSearchModalEvent) {
    const msSinceLastSearchModalEvent = Date.now() - lastSearchModalEvent;
    console.log("msSinceLastSearchModalEvent: " + msSinceLastSearchModalEvent)
    if (msSinceLastSearchModalEvent<500) {
      allowUpdate = false
    }
  }
  return allowUpdate
}

console.log("allowUpdate(): " + allowUpdate())
