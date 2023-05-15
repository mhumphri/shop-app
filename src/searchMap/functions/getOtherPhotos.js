import shuffleArray from "./shuffleArray";
import randomNumberInRange from "./randomNumberInRange";
import Other1 from "../images/other1.jpg";
import Other2 from "../images/other2.jpg";
import Other3 from "../images/other3.jpg";
import Other4 from "../images/other4.jpg";
import Other5 from "../images/other5.jpg";
import Other6 from "../images/other6.jpg";
import Other7 from "../images/other7.jpg";
import Other8 from "../images/other8.jpg";
import Other9 from "../images/other9.jpg";
import Other10 from "../images/other10.jpg";
import Other11 from "../images/other11.jpg";
import Other12 from "../images/other12.jpg";
import Other13 from "../images/other13.jpg";
import Other14 from "../images/other14.jpg";
import Other15 from "../images/other15.jpg";
import Other16 from "../images/other16.jpg";
import Other17 from "../images/other17.jpg";
import Other18 from "../images/other18.jpg";
import Other19 from "../images/other19.jpg";
import Other20 from "../images/other20.jpg";
import Other21 from "../images/other21.jpg";
import Other22 from "../images/other22.jpg";

// fetches a random selection of photos to add to photoArray for hotel (is added on top of the main picture for a given hotel)

const getOtherPhotos = () => {

  let otherPhotosArray = [
    Other1,
    Other2,
    Other3,
    Other4,
    Other5,
    Other6,
    Other7,
    Other8,
    Other9,
    Other10,
    Other11,
    Other12,
    Other12,
    Other13,
    Other14,
    Other15,
    Other16,
    Other17,
    Other18,
    Other19,
    Other20,
    Other21,
    Other22,
  ];

  // generate random number
  const numPhotos = randomNumberInRange(8,15)

  // randomly delete photos from otherPhotos array until reach given number
  let i = otherPhotosArray.length;
  while (i >= numPhotos) {
    const random = Math.floor(Math.random() * otherPhotosArray.length);
    otherPhotosArray.splice(random, 1);
    i--;
  }

  // shuffle residual array
  shuffleArray(otherPhotosArray);

  return otherPhotosArray;
};

export default getOtherPhotos;
