// calcs degrees of difference between two points of longitude
export const calcLngDiff = (lngWest,lngEast) => {

  let lngDiff = lngEast - lngWest

  if (lngDiff<0) {
    lngDiff = (lngEast+180) + (180-lngWest)
  }

  return lngDiff
};
