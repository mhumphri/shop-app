import React, { useState, useEffect, useRef } from "react";
import HotelPageMap from "./hotelPageMap.js";
//import SectionButton from "../inputs/sectionButton";
import "../../css/hotelPage/locationMap.css";

const coords = {
  "lat": "54.1666750263167",
  "lng": "-6.576446503511688"
}

function LocationMap(props) {

return (
  <div className="hotel-page-pa6">
    <div className="hotel-page-zn8">
      <div class="hotel-page-cd3" />
      <div class="hotel-page-zn9">
        <section>
        <div className="hotel-page-ew3">
        <h2 className="hotel-page-js1">Location</h2>
        </div>
        <div>


          <div className="location-map-grw">


                        {/*    <HotelPageMap coords={coords} /> */}



                        </div>



        </div>
        </section>
      </div>
    </div>
  </div>
)

}

export default LocationMap;
