import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Summary from "./summary";
import Description from "./description";
import Amenities from "./amenities";
import LocationMap from "./locationMap";
import DateInput from "./dateInput";
import Reviews from "./reviews";
import FloatingFooter from "./floatingFooter";
import ImageGallery from "./imageGallery";
import "../../css/hotelPage/hotelPage.css";

// homepage component for hotelApp - contains jsx for homepage and search/server comms logic

const roomData = {reviews: {rating: 4.6, list: [
    {
      "userName": "Philippe",
      "date": "January 2022",
      "text": [
        "The stay was perfect, the location is amazing with view of surrounding mountains and an included Whirlpool. The apartment is ideal for a big group. The communication with the host was good and on-site support was given for any questions. Would definitely book it again!"
      ],
      },
    {
      "userName": "Nicolette",
      "date": "March 2022",
      "text": [
        "Our stay was okay but for future travelers wanted to point out some major considerations for renting this place. The host was responsive and communicated well with recommendations and information for the area. They were also very accommodating with regards to storing luggage at check in and check out.",
        false,
        false,
        "My biggest disappointment is for the price I would have expected a much nicer rental. The chalet was very funky. It has many rooms and bathrooms so if you don’t care about staying somewhere nice it can work well for a group (if you don’t mind paper thin walls and the sound traveling). The beds were absolutely horrible. There was only a single roll of toilet paper in the house upon arrival. Only enough towels for the seven of us and not enough to have a second towel for the hot tub. No dish towels which made it hard to cook and clean in the kitchen. There were a lot of bugs.",
        false,
        false,
        "Lastly if you don’t plan to rent a car you will have to walk up a huge hill to get from the bus to the house. Also you’ll have to walk the garbage and recycling down to the center of town. If you have a car then these won’t be issues."
      ],
        },
    {
      "userName": "Jonas",
      "date": "August 2022",
      "text": [
        "Very friendly host and welcoming, the perfect stay for our honeymoon trip!"
      ],
      },
    null,
    {
      "userName": "Alina",
      "date": "May 2022",
      "text": [
        "Totally Amazing!",
        false,
        "We had wonderful days in this location!",
        false,
        "The service was great, friendly and reliable. you have a great view and the location is very clean and so beautiful! It’s definitely worth it!"
      ]}

    ]}}

function HotelPage(props) {
  // large view (boolean indicating if app currently in large view) and screen height (stored in redux)
  const largeView = useSelector((state) => state.deviceData.largeView);
  const screenWidth = useSelector((state) => state.deviceData.screenWidth);

  // checkin/out values stored locally (in practice could be stored elsewhere e.g. in parent component or redux)
  const [checkinDate, setCheckinDate] = useState();
  const [checkoutDate, setCheckoutDate] = useState();


  // refs used to find position of divs for scrolling to
  const photosRef = useRef(null);
  const amenitiesRef = useRef(null);
  const reviewsRef = useRef(null);
  const locationRef = useRef(null);
  const sidebarRef = useRef(null);
  const middleContentBox = useRef(null);
  const floatingSearchInner = useRef(null);
    const datePickerRef = useRef(null)

  const navigateHome = () => {
    console.log("navigateHome")
  }

  const scrollTo = () => {
    console.log("scrollTo")
  }

if (largeView) {
  return (
    <main>HotelPage - large View</main>
  )
}
else {
  return (

<main className="hotel-page-rt7">
  <ImageGallery />
<Summary />
<Description />
 <Amenities />
  {/*<LocationMap /> */}
  <LocationMap />
<DateInput screenWidth={screenWidth}  />
<Reviews />
 <FloatingFooter navigateHome={navigateHome} storedCheckin={checkinDate} storedCheckout={checkoutDate} data={roomData.reviews} scrollToDatePicker={()=> scrollTo(datePickerRef)} />
</main>
  )
}


}

export default HotelPage;
