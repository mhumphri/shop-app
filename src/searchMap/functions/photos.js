import shuffleArray from "../functions/shuffleArray";

import HouseL1 from "../images/houseL1.jpg";
import HouseL2 from "../images/houseL2.jpeg";
import HouseL3 from "../images/houseL3.webp";
import HouseL4 from "../images/houseL4.webp";
import HouseL5 from "../images/houseL5.webp";
import HouseL6 from "../images/houseL6.jpg";
import HouseL7 from "../images/houseL7.jpg";
import HouseL8 from "../images/houseL8.webp";
import HouseL9 from "../images/houseL9.webp";
import HouseL10 from "../images/houseL10.jpg";
import HouseL11 from "../images/houseL11.webp";
import HouseL12 from "../images/houseL12.jpg";
import HouseL13 from "../images/houseL13.webp";
import HouseL14 from "../images/houseL14.webp";
import HouseL15 from "../images/houseL15.jpeg";
import HouseL16 from "../images/houseL16.jpeg";
import HouseL17 from "../images/houseL17.webp";
import HouseL18 from "../images/houseL18.webp";
import HouseL19 from "../images/houseL19.webp";
import HouseL20 from "../images/houseL20.webp";

import HouseS1 from "../images/houseS1.webp";
import HouseS2 from "../images/houseS2.webp";
import HouseS3 from "../images/houseS3.webp";
import HouseS4 from "../images/houseS4.webp";
import HouseS5 from "../images/houseS5.webp";
import HouseS6 from "../images/houseS6.webp";
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

import RoomL1 from "../images/RoomL1.jpeg";
import RoomL2 from "../images/RoomL2.jpg";
import RoomL3 from "../images/RoomL3.jpg";
import RoomL4 from "../images/RoomL4.jpg";
import RoomL5 from "../images/RoomL5.jpg";
import RoomL6 from "../images/RoomL6.jpg";
import RoomL7 from "../images/RoomL7.jpg";
import RoomL8 from "../images/RoomL8.jpg";
import RoomL9 from "../images/RoomL9.jpg";
import RoomL10 from "../images/RoomL10.jpg";
import RoomL11 from "../images/RoomL11.jpg";
import RoomL12 from "../images/RoomL12.webp";



const getPhotoList = (mainPic, numPhotos) => {
const mainPics = {a0: HouseL20, a1: HouseL1, a2: HouseL2, a3: HouseL3, a4: HouseL4, a5: HouseL5, a6: HouseL6, a7: HouseL7, a8: HouseL8, a9: HouseL9, a10: HouseL10, a11: HouseL11, a12: HouseL12, a13: HouseL13, a14: HouseL14, a15: HouseL15, a16: HouseL16, a17: HouseL17, a18: HouseL18, a19: HouseL19  }

  const smallHouseArray = [HouseL1, HouseL2, HouseL3, HouseL4, HouseL5, HouseL6, HouseL7, HouseL8, HouseL9, HouseL10, HouseL11, HouseL12, HouseL13, HouseL14, HouseL15, HouseL16, HouseL17, HouseL18, HouseL19, HouseL20]
  const largeHouseArray = [HouseS1, HouseS2, HouseS3, HouseS4, HouseS5, HouseS6, HouseS7, HouseS8, HouseS9, HouseS10, HouseS11, HouseS12, HouseS13, HouseS14, HouseS15, HouseS16, HouseS17, HouseS18, HouseS19, HouseS20]
  const largeRoomArray = [RoomL1, RoomL2, RoomL3, RoomL4, RoomL5, RoomL6, RoomL7, RoomL8, RoomL9, RoomL10, RoomL11, RoomL12]
  const smallRoomArray = [RoomS1, RoomS2, RoomS3, RoomS4, RoomS5, RoomS6, RoomS7, RoomS8, RoomS9, RoomS10, RoomS11, RoomS12]

  let newPicArray = []
  newPicArray.push( { img: mainPics[mainPic], label: "mainPic", dataKey: 0 })



  let photosArray = [RoomS1, RoomS2, RoomS3, RoomS4, RoomS5, RoomS6, RoomS7, RoomS8, RoomS9, RoomS10, RoomS11, RoomS12]

  let i = photosArray.length;
  while (i >= numPhotos) {
    const random = Math.floor(Math.random() * photosArray.length);
    photosArray.splice(random, 1);

    i--;
  }

  let otherPics = []



  for (let i = 0; i < photosArray.length; i++) {
      otherPics.push({ img: photosArray[i], label: "roomPic" + i, dataKey: i+1 });
  }

  shuffleArray(otherPics)

 const mergedPicArray = newPicArray.concat(otherPics);
  return mergedPicArray
};

export default getPhotoList
