import shuffleArray from "./shuffleArray";
import randomNumberInRange from "./randomNumberInRange";
import generateKey from "./generateKey";

import HouseS1 from "../images/main1.jpg";
import HouseS2 from "../images/main2.jpg";
import HouseS3 from "../images/main3.jpg";
import HouseS4 from "../images/main4.jpg";
import HouseS5 from "../images/main5.jpg";
import HouseS6 from "../images/main6.jpg";
import HouseS7 from "../images/main7.jpg";
import HouseS8 from "../images/main8.jpg";
import HouseS9 from "../images/main9.jpg";
import HouseS10 from "../images/main10.jpg";
import HouseS11 from "../images/main11.jpg";
import HouseS12 from "../images/main12.jpg";
import HouseS13 from "../images/main13.jpg";
import HouseS14 from "../images/main14.jpg";
import HouseS15 from "../images/main15.jpg";
import HouseS16 from "../images/main16.jpg";
import HouseS17 from "../images/main17.jpg";
import HouseS18 from "../images/main18.jpg";
import HouseS19 from "../images/main19.jpg";
import HouseS20 from "../images/main20.jpg";
import HouseS21 from "../images/main21.jpg";
import HouseS22 from "../images/main22.jpg";
import HouseS23 from "../images/main23.jpg";
import HouseS24 from "../images/main24.jpg";
import HouseS25 from "../images/main25.jpg";
import HouseS26 from "../images/main26.jpg";


import RoomS1 from "../images/other1.jpg";
import RoomS2 from "../images/other2.jpg";
import RoomS3 from "../images/other3.jpg";
import RoomS4 from "../images/other4.jpg";
import RoomS5 from "../images/other5.jpg";
import RoomS6 from "../images/other6.jpg";
import RoomS7 from "../images/other7.jpg";
import RoomS8 from "../images/other8.jpg";
import RoomS9 from "../images/other9.jpg";
import RoomS10 from "../images/other10.jpg";
import RoomS11 from "../images/other11.jpg";
import RoomS12 from "../images/other12.jpg";
import RoomS13 from "../images/other13.jpg";
import RoomS14 from "../images/other14.jpg";
import RoomS15 from "../images/other15.jpg";
import RoomS16 from "../images/other16.jpg";
import RoomS17 from "../images/other17.jpg";
import RoomS18 from "../images/other18.jpg";
import RoomS19 from "../images/other19.jpg";
import RoomS20 from "../images/other20.jpg";
import RoomS21 from "../images/other21.jpg";
import RoomS22 from "../images/other22.jpg";

import MainPic0 from "../images/main11.jpg";
import MainPic1 from "../images/main11.jpg";
import MainPic2 from "../images/main12.jpg";
import MainPic3 from "../../images/birds/bird1.jpg";
import MainPic4 from "../../images/birds/bird2.jpg";
import MainPic5 from "../../images/birds/bird3.jpg";
import MainPic6 from "../../images/birds/bird4.jpg";
import MainPic7 from "../../images/birds/bird5.jpg";
import MainPic8 from "../../images/birds/bird6.jpg";
import MainPic9 from "../../images/birds/bird5.jpg";
import MainPic10 from "../images/main11.jpg";
import MainPic11 from "../images/main11.jpg";
import MainPic12 from "../images/main12.jpg";
import MainPic13 from "../images/main13.jpg";
import MainPic14 from "../images/main14.jpg";
import MainPic15 from "../images/main15.jpg";
import MainPic16 from "../images/main16.jpg";
import MainPic17 from "../images/main17.jpg";
import MainPic18 from "../images/main18.jpg";
import MainPic19 from "../../images/birds/bird5.jpg";
import MainPic20 from "../images/main11.jpg";
import MainPic21 from "../images/main11.jpg";
import MainPic22 from "../images/main12.jpg";
import MainPic23 from "../../images/birds/bird1.jpg";
import MainPic24 from "../../images/birds/bird2.jpg";
import MainPic25 from "../../images/birds/bird3.jpg";
import MainPic26 from "../../images/birds/bird4.jpg";
import MainPic27 from "../../images/birds/bird5.jpg";
import MainPic28 from "../../images/birds/bird6.jpg";
import MainPic29 from "../../images/birds/bird5.jpg";

// const mainPicArray = [MainPic0, MainPic1, MainPic2, MainPic3, MainPic4, MainPic5, MainPic6, MainPic7, MainPic8, MainPic9, MainPic10, MainPic11, MainPic12, MainPic13, MainPic14, MainPic15, MainPic16, MainPic17, MainPic18, MainPic19, MainPic20, MainPic21, MainPic22, MainPic23, MainPic24, MainPic25, MainPic26, MainPic27, MainPic28, MainPic29]

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
    HouseS21,
    HouseS22,
    HouseS23,
    HouseS24,
    HouseS25,
    HouseS26,
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
    RoomS13,
    RoomS14,
    RoomS15,
    RoomS16,
    RoomS17,
    RoomS18,
    RoomS19,
    RoomS20,
    RoomS21,
    RoomS22,
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
    RoomS12,
    RoomS13,
    RoomS14,
    RoomS15,
    RoomS16,
    RoomS17,
    RoomS18,
    RoomS19,
    RoomS20,
    RoomS21,
    RoomS22,
  ];












  const numPhotos = randomNumberInRange(8,15)

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
