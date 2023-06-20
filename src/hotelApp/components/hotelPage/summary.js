import React, { useState, useEffect, useRef } from "react";
import "../../css/hotelPage/summary.css";

// homepage component for hotelApp - contains jsx for homepage and search/server comms logic

function Summary(props) {



  return (
    <div className="hotel-page-pa6">
      <div className="hotel-page-zn8">
      <div class="hotel-page-zn9">
        <section>
          <h1 className="summary-jh5">{props.hotelData.name}</h1>
          <div className="summary-ie6">
            <button class="summary-yu4">
              <span class="summary-sd3">
                <svg
                  className="summary-gh4"
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  role="presentation"
                  focusable="false"
                >
                  <path d="M15.094 1.579l-4.124 8.885-9.86 1.27a1 1 0 0 0-.542 1.736l7.293 6.565-1.965 9.852a1 1 0 0 0 1.483 1.061L16 25.951l8.625 4.997a1 1 0 0 0 1.482-1.06l-1.965-9.853 7.293-6.565a1 1 0 0 0-.541-1.735l-9.86-1.271-4.127-8.885a1 1 0 0 0-1.814 0z"></path>
                </svg>
              </span>
              <span>{props.hotelData.rating} ({props.hotelData.numReviews} reviews)</span>
            </button>
            <span class="summary-oo7">·</span>
            <button class="summary-yu4">{props.hotelData.cityName ? props.hotelData.cityName + ", " + props.hotelData.country : "somewhere in " + props.hotelData.country} </button>
          </div>
        </section>
      </div>
      </div>
    </div>
  );

}

export default Summary;
