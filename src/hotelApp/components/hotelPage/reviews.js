import React from "react";
//import SectionButton from "./sectionButton";
import IndReview from "./indReview";
import "../../css/hotelPage/reviews.css";

const data = {
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
      ],
    },
    {
      userName: "Jonas",
      date: "August 2022",
      text: [
        "Very friendly host and welcoming, the perfect stay for our honeymoon trip!",
      ],
    },
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
};

function Reviews(props) {
  return (
    <div className="hotel-page-pa6">
      <div className="hotel-page-zn8">
        <div class="hotel-page-cd3" />
        <div class="hotel-page-zn9">
          <section>
            <div
              class={props.twoColumn ? "reviews-h1v two-column" : "reviews-h1v"}
            >
              <span class="reviews-itu">
                <svg
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                  class="reviews-pl2"
                  aria-hidden="true"
                  role="presentation"
                  focusable="false"
                >
                  <path
                    d="M15.094 1.579l-4.124 8.885-9.86 1.27a1 1 0 0 0-.542 1.736l7.293 6.565-1.965 9.852a1 1 0 0 0 1.483 1.061L16 25.951l8.625 4.997a1 1 0 0 0 1.482-1.06l-1.965-9.853 7.293-6.565a1 1 0 0 0-.541-1.735l-9.86-1.271-4.127-8.885a1 1 0 0 0-1.814 0z"
                    fill-rule="evenodd"
                  ></path>
                </svg>
              </span>
              <span class="reviews-t1x ">
                <h2
                  tabindex="-1"
                  class="reviews-4i3"
                  elementtiming="LCP-target"
                >
                  <span aria-hidden="true">
                    {props.hotelData.rating} · {props.hotelData.numReviews}{" "}
                    reviews
                  </span>
                </h2>
              </span>
            </div>
            <div
              className={
                props.twoColumn ? "reviews-sa1 two-column" : "reviews-sa1"
              }
            >
              {data.list.slice(0, 4).map((x) => (
                <IndReview data={x} showMore={props.openModal} />
              ))}
            </div>

            {/*  <div>
            <SectionButton largeView={props.largeView ? true : false} message={"Show all " + data.list.length +  " reviews"} click={props.openModal} />
          </div>
          */}
          </section>
        </div>
      </div>
    </div>
  );
}

export default Reviews;
