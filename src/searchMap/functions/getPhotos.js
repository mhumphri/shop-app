import shuffleArray from "./shuffleArray";
import randomNumberInRange from "./randomNumberInRange";

/*
import HouseS1 from "../images/houseS1.webp";
import HouseS2 from "../images/houseS2.webp";
import HouseS3 from "../images/houseS3.webp";
import HouseS4 from "../images/houseS4.webp";
import HouseS5 from "../images/houseS5.webp";
import HouseS6 from "../images/houseS6.webp";
import HouseS7 from "../images/houseS7.webp";
import HouseS7 from "../images/houseS7.webp";
import HouseS8 from "../images/houseS8.webp";
import HouseS9 from "../images/houseS9.webp";
import HouseS10 from "../images/houseS10.webp";
import HouseS11 from "../images/houseS11.webp";
import HouseS12 from "../images/houseS12.webp";
import HouseS13 from "../images/houseS13.webp";
import HouseS14 from "../images/houseS14.webp";
import HouseS15 from "../images/houseS15.webp";
import HouseS16 from "../images/houseS16.webp";
import HouseS17 from "../images/houseS17.webp";
import HouseS18 from "../images/houseS18.webp";
import HouseS19 from "../images/houseS19.webp";
import HouseS20 from "../images/houseS20.webp";

import RoomS1 from "../images/RoomS1.webp";
import RoomS2 from "../images/RoomS2.webp";
import RoomS3 from "../images/RoomS3.webp";
import RoomS4 from "../images/RoomS4.webp";
import RoomS5 from "../images/RoomS5.webp";
import RoomS6 from "../images/RoomS6.webp";
import RoomS7 from "../images/RoomS7.webp";
import RoomS8 from "../images/RoomS8.webp";
import RoomS9 from "../images/RoomS9.webp";
import RoomS10 from "../images/RoomS10.webp";
import RoomS11 from "../images/RoomS11.webp";
import RoomS12 from "../images/RoomS12.webp";

*/
import HouseS1 from "../images/main1.jpeg";
import HouseS2 from "../images/main2.jpeg";
import HouseS3 from "../images/main3.jpeg";
import HouseS4 from "../images/main4.jpeg";
import HouseS5 from "../images/main5.jpeg";
import HouseS6 from "../images/main6.jpeg";
import HouseS7 from "../images/main7.jpeg";
import HouseS8 from "../images/main8.jpeg";
import HouseS9 from "../images/main9.jpeg";
import HouseS10 from "../images/main10.jpeg";
import HouseS11 from "../images/main11.jpeg";
import HouseS12 from "../images/main12.jpeg";
import HouseS13 from "../../images/birds/bird1.jpg";
import HouseS14 from "../../images/birds/bird2.jpg";
import HouseS15 from "../../images/birds/bird3.jpg";
import HouseS16 from "../../images/birds/bird4.jpg";
import HouseS17 from "../../images/birds/bird5.jpg";
import HouseS18 from "../../images/birds/bird6.jpg";
import HouseS19 from "../../images/birds/bird5.jpg";
import HouseS20 from "../../images/birds/bird6.jpg";


import RoomS1 from "../../images/birds/bird1.jpg";
import RoomS2 from "../../images/birds/bird2.jpg";
import RoomS3 from "../../images/birds/bird3.jpg";
import RoomS4 from "../../images/birds/bird4.jpg";
import RoomS5 from "../../images/birds/bird5.jpg";
import RoomS6 from "../../images/birds/bird6.jpg";
import RoomS7 from "../../images/birds/bird1.jpg";
import RoomS8 from "../../images/birds/bird2.jpg";
import RoomS9 from "../../images/birds/bird3.jpg";
import RoomS10 from "../../images/birds/bird4.jpg";
import RoomS11 from "../../images/birds/bird5.jpg";
import RoomS12 from "../../images/birds/bird6.jpg";

const getPhotos = (mainPic) => {
  const mainPicArray = [
    HouseS1,
    HouseS2,
    HouseS3,
    HouseS4,
    HouseS5,
    HouseS6,
    HouseS7,
    HouseS8,
    HouseS9,
    HouseS10,
    HouseS11,
    HouseS12,
    HouseS13,
    HouseS14,
    HouseS15,
    HouseS16,
    HouseS17,
    HouseS18,
    HouseS19,
    HouseS20,
  ];
  const roomArray = [
    RoomS1,
    RoomS2,
    RoomS3,
    RoomS4,
    RoomS5,
    RoomS6,
    RoomS7,
    RoomS8,
    RoomS9,
    RoomS10,
    RoomS11,
    RoomS12,
  ];

  let newPicArray = [];
  newPicArray.push(mainPicArray[mainPic]);

  let otherPhotosArray = [
    RoomS1,
    RoomS2,
    RoomS3,
    RoomS4,
    RoomS5,
    RoomS6,
    RoomS7,
    RoomS8,
    RoomS9,
    RoomS10,
    RoomS11,
    RoomS12,
  ];

  const numPhotos = randomNumberInRange(4,12)

  let i = otherPhotosArray.length;
  while (i >= numPhotos) {
    const random = Math.floor(Math.random() * otherPhotosArray.length);
    otherPhotosArray.splice(random, 1);

    i--;
  }

  shuffleArray(otherPhotosArray);

  const mergedPhotoArray = newPicArray.concat(otherPhotosArray);
  return mergedPhotoArray;
};

export default getPhotos;
