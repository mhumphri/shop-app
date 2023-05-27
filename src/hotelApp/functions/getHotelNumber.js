import calcLandArea from "./calcLandArea";
import randomNumberInRange from "./randomNumberInRange";

// generates number of hotels based on land area implied by active map bounds (more land in scope = more hotels)
const getHotelNumber = (activePolygons) => {
  const landArea = calcLandArea(activePolygons);
  return Math.round((landArea / 10000000) * randomNumberInRange(5, 30));
};

export default getHotelNumber
