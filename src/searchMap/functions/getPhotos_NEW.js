import shuffleArray from "./shuffleArray";
import randomNumberInRange from "./randomNumberInRange";


import Main1 from "../images/main1.png";
import Main2 from "../images/main2.png";
import Main3 from "../images/main3.png";
import Main4 from "../images/main4.png";
import Main5 from "../images/main5.png";
import Main6 from "../images/main6.png";
import Main7 from "../images/main7.png";
import Main8 from "../images/main8.png";
import Main9 from "../images/main8.png";
import Other1 from "../images/other1.png";
import Other2 from "../images/other2.png";
import Other3 from "../images/other3.png";
import Other4 from "../images/other4.png";
import Other5 from "../images/other5.png";
import Other6 from "../images/other6.png";
import Other7 from "../images/other7.png";
import Other8 from "../images/other8.png";
import Other9 from "../images/other9.png";
import Other10 from "../images/other10.png";


const getPhotos = (hotelIndex) => {
  console.log("hotelIndex: " + hotelIndex)
/*  let mainPicArray
for (let i=1; i<21; i++) {
  const newPicName = "Main" + 1
  let newPic = [newPicName]
  mainPicArray.push(newPic)
} */

 const photoKeyArray = [
    { key: "MBIWhwWtXmIA", photo: Main1 },
    { key: "MBIWhwWtXmIB", photo: Main2 },
    { key: "MBIWhwWtXmIC", photo: Main3 },
    { key: "MBIWhwWtXmID", photo: Main4 },
    { key: "MBIWhwWtXmIE", photo: Main5 },
    { key: "MBIWhwWtXmIF", photo: Main6 },
    { key: "MBIWhwWtXmIG", photo: Main7 },
    { key: "MBIWhwWtXmIH", photo: Main8 },
    { key: "MBIWhwWtXmII", photo: Main9 },
    { key: "MBIWhwWtXmIJ", photo: Main9 },
    { key: "MBIWhwWtXmIK", photo: Main1 },
    { key: "MBIWhwWtXmIL", photo: Main2 },
    { key: "MBIWhwWtXmIM", photo: Main3 },
    { key: "MBIWhwWtXmIN", photo: Main4 },
    { key: "MBIWhwWtXmIO", photo: Main5 },
    { key: "MBIWhwWtXmIP", photo: Main6 },
    { key: "MBIWhwWtXmIQ", photo: Main7 },
    { key: "MBIWhwWtXmIR", photo: Main8 },
    { key: "MBIWhwWtXmIS", photo: Main9 },
    { key: "MBIWhwWtXmIT", photo: Main9 },
  ];



  let newHotelObject = {};
  newHotelObject.key = photoKeyArray[hotelIndex].key
  let photoArray = [photoKeyArray[hotelIndex].photo]


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
  ];

  const numPhotos = randomNumberInRange(4,12)

  let i = otherPhotosArray.length;
  while (i >= numPhotos) {
    const random = Math.floor(Math.random() * otherPhotosArray.length);
    otherPhotosArray.splice(random, 1);

    i--;
  }

  shuffleArray(otherPhotosArray);


  const mergedPhotoArray = photoArray.concat(otherPhotosArray);


  newHotelObject.photos = mergedPhotoArray

  return newHotelObject;
};

export default getPhotos;
