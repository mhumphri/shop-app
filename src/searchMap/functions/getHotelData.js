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
import MainPic13 from "../../images/birds/bird1.jpg";
import MainPic14 from "../../images/birds/bird2.jpg";
import MainPic15 from "../../images/birds/bird3.jpg";
import MainPic16 from "../../images/birds/bird4.jpg";
import MainPic17 from "../../images/birds/bird5.jpg";
import MainPic18 from "../../images/birds/bird6.jpg";
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

const mainPicArray = [MainPic0, MainPic1, MainPic2, MainPic3, MainPic4, MainPic5, MainPic6, MainPic7, MainPic8, MainPic9, MainPic10, MainPic11, MainPic12, MainPic13, MainPic14, MainPic15, MainPic16, MainPic17, MainPic18, MainPic19, MainPic20, MainPic21, MainPic22, MainPic23, MainPic24, MainPic25, MainPic26, MainPic27, MainPic28, MainPic29]

const getHotelData = () => {
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

  let hotelKeyArray = [];
  let hotelObject = {}

  const getOtherPhotos = () => {
    const numPhotos = randomNumberInRange(4,12)

    let i = otherPhotosArray.length;
    while (i >= numPhotos) {
      const random = Math.floor(Math.random() * otherPhotosArray.length);
      otherPhotosArray.splice(random, 1);

      i--;
    }

    shuffleArray(otherPhotosArray);

    return otherPhotosArray;
  }

  for (let i=0; i<mainPicArray.length; i++) {
    const newKey = generateKey()
    hotelKeyArray.push(newKey)
    let photoArray = [mainPicArray[i]];
    const otherPhotoArray = getOtherPhotos()
    const mergedPhotoArray = photoArray.concat(otherPhotoArray);
    hotelObject[newKey] = {photoArray: mergedPhotoArray};
  }


return {hotelObject: hotelObject, hotelKeyArray: hotelKeyArray};


};

export default getHotelData;
