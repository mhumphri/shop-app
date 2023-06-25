import React from "react";
import getAmenitiesList from "./functions/getAmenitiesList";
//import SectionButton from "../inputs/sectionButton";
import "../../css/hotelPage/amenities.css";

const data = getAmenitiesList("random", 20)


function Amenities(props) {

return (
  <div className="hotel-page-pa6">
    <div className="hotel-page-zn8">
      <div class="hotel-page-cd3" />
      <div class="hotel-page-zn9">
        <section>
        <div className="hotel-page-ew3">
        <h2 className="hotel-page-js1">What this hotel offers</h2>
        </div>
        <div>
          <div className={props.twoColumn? "amenities-vs2 two-column" : "amenities-vs2"} >
          {data.list.map((x) =>
          (<div class="amenities-19x">
            <div class="amenities-iik">
            <div>{x.name}</div>
              <div class="amenities-i4w">
                <svg
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{display: 'block', height: '24px', width: '24px', fill: 'currentcolor'}}
                  aria-hidden="true"
                  role="presentation"
                  focusable="false"
                >
                  {x.svg}
                </svg>
              </div>
            </div>
          </div>)
  )}

</div>
        </div>
        </section>
      </div>
    </div>
  </div>
)

}

export default Amenities;
