// function which returns a radius (km) for a city for a given popualtion argument

const getCityRadius = (cityPopulation) => {
  let radiusOuter = 5;
  if (cityPopulation > 250000) {
    radiusOuter = 7;
  }
  if (cityPopulation > 500000) {
    radiusOuter = 10;
  }
  if (cityPopulation > 1000000) {
    radiusOuter = 12;
  }
  if (cityPopulation > 2000000) {
    radiusOuter = 16;
  }
  if (cityPopulation > 5000000) {
    radiusOuter = 20;
  }
  if (cityPopulation > 7500000) {
    radiusOuter = 25;
  }
  if (cityPopulation > 10000000) {
    radiusOuter = 30;
  }
  if (cityPopulation > 15000000) {
    radiusOuter = 40;
  }
  return radiusOuter;
};

export default getCityRadius
