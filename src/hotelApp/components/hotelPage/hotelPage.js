import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Summary from "./summary";
import Description from "./description";
import Amenities from "./amenities";
import LocationMap from "./locationMap";
import DateInput from "./dateInput";
import Reviews from "./reviews";
import FloatingFooter from "./floatingFooter";
import ImageGallery from "./imageGallery";
import HotelAppNav from "../hotelAppNav";
import ScrollNav from "./scrollNav";
import FloatingSearchbox from "./floatingSearchbox";
import Footer from "../footer/footer";
import hotelData2 from "../../data/hotelData2";
import hotelDataset from "../../data/hotelData2";
import getOtherPhotos from "../../functions/getOtherPhotos";
import "../../css/hotelPage/hotelPage.css";

// homepage component for hotelApp - contains jsx for homepage and search/server comms logic

const roomData = {
  reviews: {
    rating: 4.6,
    list: [
      {
        userName: "Philippe",
        date: "January 2022",
        text: [
          "The stay was perfect, the location is amazing with view of surrounding mountains and an included Whirlpool. The apartment is ideal for a big group. The communication with the host was good and on-site support was given for any questions. Would definitely book it again!",
        ],
      },
      {
        userName: "Nicolette",
        date: "March 2022",
        text: [
          "Our stay was okay but for future travelers wanted to point out some major considerations for renting this place. The host was responsive and communicated well with recommendations and information for the area. They were also very accommodating with regards to storing luggage at check in and check out.",
          false,
          false,
          "My biggest disappointment is for the price I would have expected a much nicer rental. The chalet was very funky. It has many rooms and bathrooms so if you don’t care about staying somewhere nice it can work well for a group (if you don’t mind paper thin walls and the sound traveling). The beds were absolutely horrible. There was only a single roll of toilet paper in the house upon arrival. Only enough towels for the seven of us and not enough to have a second towel for the hot tub. No dish towels which made it hard to cook and clean in the kitchen. There were a lot of bugs.",
          false,
          false,
          "Lastly if you don’t plan to rent a car you will have to walk up a huge hill to get from the bus to the house. Also you’ll have to walk the garbage and recycling down to the center of town. If you have a car then these won’t be issues.",
        ],
      },
      {
        userName: "Jonas",
        date: "August 2022",
        text: [
          "Very friendly host and welcoming, the perfect stay for our honeymoon trip!",
        ],
      },
      null,
      {
        userName: "Alina",
        date: "May 2022",
        text: [
          "Totally Amazing!",
          false,
          "We had wonderful days in this location!",
          false,
          "The service was great, friendly and reliable. you have a great view and the location is very clean and so beautiful! It’s definitely worth it!",
        ],
      },
    ],
  },
};

function HotelPage(props) {
  // placeholder
  const roomRate = 100;

  // react router hook for url params
  let params = useParams();

  let hotelArray = useSelector((state) => state.hotelApp.hotelArray);
  // large view (boolean indicating if app currently in large view) and screen height (stored in redux)
  const largeView = useSelector((state) => state.deviceData.largeView);
  const screenWidth = useSelector((state) => state.deviceData.screenWidth);

  // XYX
  const [hotelData, setHotelData] = useState();
  // XYX
  const [hotelPhotos, setHotelPhotos] = useState();

  // logs with of LHS panel - used to size datepicker
  const [lhsPanelWidth, setLhsPanelWidth] = useState(0);

  // checkin/out values stored locally (in practice could be stored elsewhere e.g. in parent component or redux)
  const [checkinDate, setCheckinDate] = useState();
  const [checkoutDate, setCheckoutDate] = useState();

  const [guestsData, setGuestsData] = useState({
    Adults: 2,
    Children: 0,
    Infants: 0,
  });

  // object which contains roomCost, taxCost and totalCost for current date inputs
  const [costs, setCosts] = useState({
    roomRate: 0,
    numberNights: 0,
    roomCost: 0,
    taxCost: 0,
    totalCost: 0,
    avePerNight: 0,
  });

  // boolean which indicates if text input / dropdown(large view) / search modal(small view) are open
  const [activeSearch, setActiveSearch] = useState();
  // current stored search location (either country name or "map area")
  const [searchLocation, setSearchLocation] = useState({ name: "" });

  // refs used to find position of divs for scrolling to
  const photosRef = useRef(null);
  const amenitiesRef = useRef(null);
  const reviewsRef = useRef(null);
  const locationRef = useRef(null);
  const sidebarRef = useRef(null);
  const middleContentBox = useRef(null);
  const floatingSearchInner = useRef(null);
  const datepickerRef = useRef(null);

  // used for measuring with of LHS panel - used to size datepicker
  const lhsPanelRef = useRef(null);

  // loads hotel data for specified id
  useEffect(() => {
    let newHotelData;

    for (let i = 0; i < hotelArray.length; i++) {
      if (hotelArray[i].hotelDataKey === params.hotelId) {
        newHotelData = hotelArray[i];
        break;
      }
    }

    if (newHotelData) {
      setHotelData(newHotelData);
      const randomHotel = hotelDataset[params.hotelId];
    } else {
      setHotelData({
        name: "Peaceful Garden Hotel",
        key: "TNLYMRBqWEfT",
        hotelDataKey: "JwhHyJenNaRU",
        coords: {
          lng: 9.9745625200506,
          lat: 53.608286610157016,
        },
        country: "Germany",
        price: 297,
        photos: [
          "/static/media/main10.8f3b95ae7693db747ba8.jpg",
          "/static/media/other1.e122534b79a8aa50c26f.jpg",
          "/static/media/other12.50cd6dac4bbc153d44c2.jpg",
          "/static/media/other21.348665915f3e5ec66853.jpg",
          "/static/media/other16.3bd88d639dbfb857ea9e.jpg",
          "/static/media/other19.7e7e416cac594a8fb755.jpg",
          "/static/media/other14.cbc6fee4c7acb93dda05.jpg",
          "/static/media/other12.50cd6dac4bbc153d44c2.jpg",
          "/static/media/other22.151f87dcc9f27b910a72.jpg",
          "/static/media/other6.67a420a5d6a92d6ff6a7.jpg",
          "/static/media/other18.748fc418d458700428b0.jpg",
          "/static/media/other2.fa57e8801fb7ca73318d.jpg",
        ],
        rating: 3.2,
        numReviews: 151,
        cityName: "Hamburg",
        locationName: "Hamburg, Germany",
        locationNameShort: "Hamburg"
      });
    }
  }, []);

  // this loads the data for the current room into redux using the room ID param from the URL and enables scrolling on page load
  useEffect(() => {
    if (lhsPanelRef.current)
      if (largeView) {
        setLhsPanelWidth(lhsPanelRef.current.getBoundingClientRect().width);
      }
  }, [screenWidth, hotelData]);

  // calculates costs (in reality would be done on server)
  const calcCosts = (checkinDate, checkoutDate, roomRate, guestsData) => {
    let newRoomCost = 0;
    let newTaxCost = 0;
    let newTotalCost = 0;
    let newAvePerNight = 0;
    let newNumberNights = 0;

    if (checkinDate && checkoutDate) {
      const numberNights = (checkoutDate - checkinDate) / (1000 * 60 * 60 * 24);
      console.log("numberNights: " + numberNights);
      let totalGuests = guestsData.Children * 0.5 + guestsData.Adults;
      if (totalGuests > 2) {
        roomRate = (roomRate * totalGuests) / 2;
      }
      newNumberNights = numberNights;
      newRoomCost = roomRate * numberNights;
      newTaxCost = 25 + newRoomCost * 0.03;
      newTotalCost = newRoomCost + newTaxCost;
      newAvePerNight = newTotalCost / numberNights;
    }
    return {
      roomRate: Math.round(roomRate).toLocaleString("en-US"),
      numberNights: newNumberNights,
      roomCost: Math.round(newRoomCost).toLocaleString("en-US"),
      taxCost: Math.round(newTaxCost).toLocaleString("en-US"),
      totalCost: Math.round(newTotalCost).toLocaleString("en-US"),
      avePerNight: Math.round(newAvePerNight).toLocaleString("en-US"),
    };
  };

  const updateCheckinDate = (newDate) => {
    setCheckinDate(newDate);
    const newCosts = calcCosts(newDate, checkoutDate, roomRate, guestsData);
    setCosts(newCosts);
  };

  const updateCheckoutDate = (newDate) => {
    setCheckoutDate(newDate);
    const newCosts = calcCosts(checkinDate, newDate, roomRate, guestsData);
    setCosts(newCosts);
  };

  const updateGuestsData = (newGuestsData) => {
    setGuestsData(newGuestsData);
    const newCosts = calcCosts(
      checkinDate,
      checkoutDate,
      roomRate,
      newGuestsData
    );
    setCosts(newCosts);
  };

  // updates searchLocation in response to user input and sets searchLocationUpdate boolean to true
  const updateSearchLocation = (newLocation) => {
    // setSearchLocation(newLocation);
    // makeServerCall("location", newLocation);
  };

  // handles user click on nav search icon - makes srver call to refresh search
  const handleNavSearchClick = () => {
    // makeServerCall("searchRefresh");
  };



  const navigateHome = () => {

    window.location.href ="/hotel-app"

  }

  // scrolls to selected ref
  const scrollTo = (scrollRef) => {
    console.log("scrollRef" + scrollRef);
    const refName = scrollRef + "Ref";
    var element = scrollRef.current;
    let headerOffset = -2;
    if (largeView) {
      headerOffset = 78;
    }
    var elementPosition = element.getBoundingClientRect().top;

    var offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    const currentPosition = window.pageYOffset;

    // if the page is already in the correct potion, this generates a little scroll bounce to direct users attention
    if (
      currentPosition > offsetPosition - 1 &&
      currentPosition < offsetPosition + 1
    ) {
      window.scrollTo({
        top: offsetPosition + 20,
        behavior: "smooth",
      });
      setTimeout(() => {
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }, "150");
    } else {
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  if (largeView) {
    return (
      <>
        <HotelAppNav
          hotelPage={true}
          largeView={true}
          searchLocation={searchLocation}
          updateSearchLocation={updateSearchLocation}
          handleNavSearchClick={handleNavSearchClick}
          activeSearch={activeSearch}
          setActiveSearch={setActiveSearch}
          narrow={true}
        />
        {hotelData ? (
          <div class="hotel-page-16g">
            <main>
              <div>
                <div ref={photosRef} />
                <Summary hotelData={hotelData} />
                <ImageGallery
                  largeView={largeView}
                  hotelData={hotelData}
                  hotelPhotos={hotelPhotos}
                />
              </div>
              <ScrollNav
                middleContentBox={middleContentBox}
                scrollTo={scrollTo}
                photosRef={photosRef}
                amenitiesRef={amenitiesRef}
                reviewsRef={reviewsRef}
                locationRef={locationRef}
                checkinDate={checkinDate}
                checkoutDate={checkoutDate}
                costs={costs}
                floatingSearchInner={floatingSearchInner}
                scrollToDatepicker={() => scrollTo(datepickerRef)}
              />
              <div ref={middleContentBox} class="hotel-page-12n">
                <div class="hotel-page-16e" ref={lhsPanelRef}>
                  <Description />

                  <div ref={amenitiesRef} />
                  <Amenities twoColumn={screenWidth > 1120 ? true : false} />
                  <div ref={datepickerRef} style={{ marginBottom: "35px" }}>
                    {lhsPanelWidth ? (
                      <DateInput
                        hotelData={hotelData}
                        screenWidth={lhsPanelWidth}
                        doublePanel={screenWidth > 1120 ? true : false}
                        setCheckinDate={updateCheckinDate}
                        setCheckoutDate={updateCheckoutDate}
                      />
                    ) : null}
                  </div>
                </div>
                <div class="hotel-page-1s2">
                  <div class="hotel-page-mub">
                    <FloatingSearchbox
                      checkinDate={checkinDate}
                      checkoutDate={checkoutDate}
                      costs={costs}
                      scrollToDatepicker={() => scrollTo(datepickerRef)}
                      setGuestsData={updateGuestsData}
                      guestsData={guestsData}
                      floatingSearchInner={floatingSearchInner}
                    />
                    <div />
                  </div>
                </div>
              </div>

              <div ref={locationRef} />
              <LocationMap hotelData={hotelData} />
              <div ref={reviewsRef} />
              <Reviews hotelData={hotelData} twoColumn={true} />
            </main>
          </div>
        ) : null}
        <Footer largeView={true} />
      </>
    );
  } else {
    return (
      <>
      <main className="hotel-page-rt7">
        {hotelData ? (
          <>
            <ImageGallery hotelData={hotelData} />
            <Summary hotelData={hotelData} />
            <Description />
            <Amenities />
            <LocationMap hotelData={hotelData} />
            <div ref={datepickerRef} />
            <DateInput
              hotelData={hotelData}
              screenWidth={screenWidth}
              setCheckinDate={updateCheckinDate}
              setCheckoutDate={updateCheckoutDate}
            />
            <Reviews hotelData={hotelData} />
            <FloatingFooter
              navigateHome={navigateHome}
              storedCheckin={checkinDate}
              storedCheckout={checkoutDate}
              data={roomData.reviews}
              scrollToDatepicker={() => scrollTo(datepickerRef)}
              costs={costs}
            />
          <Footer />
          </>
        ) : null}
      </main>

        </>
    );
  }
}

export default HotelPage;
