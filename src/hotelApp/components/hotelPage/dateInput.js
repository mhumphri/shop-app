import React, { useState } from "react";
import DatePicker from "../../../datepicker/components/datepicker";
import "../../css/hotelPage/dateInput.css";
const dayjs = require("dayjs");

function DateInput(props) {

  // checkin/out values stored locally (in practice could be stored elsewhere e.g. in parent component or redux)
  const [checkinDate, setCheckinDate] = useState();
  const [checkoutDate, setCheckoutDate] = useState();

  const minNights = 3



  const updateStartDate = (newDate) => {
    setCheckinDate(newDate)
    props.setCheckinDate(newDate)
  }

  const updateEndDate = (newDate) => {
    setCheckoutDate(newDate)
    props.setCheckoutDate(newDate)
  }


  const bookingSummaryRender = () => {

  let message1 = "Select check-in date"
  let message2 = "Add your travel dates for exact pricing"



  if (checkinDate && checkoutDate) {
    const numberNights = (checkoutDate - checkinDate)/ (1000*60*60*24)
    let dayLabel = "night"
    if (numberNights>1) {
      dayLabel = "nights"
    }
    message1 =  numberNights + " " + dayLabel +  " in " + props.hotelData.locationNameShort
    message2 = dayjs(checkinDate).format('DD MMM YYYY') + " - " + dayjs(checkoutDate).format('DD MMM YYYY')
  }

  if (checkinDate && !checkoutDate) {
    let dayLabel = "night"
    if (minNights>1) {
      dayLabel = "nights"
    }
    message1 = "Select checkout date"
    message2 = "Minimum stay: " + minNights + " " + dayLabel
  }

  return [
    <div>
        <div className="date-input-ew3">
        <h2 className="date-input-js1">{message1}</h2>
        </div>
        <div className="date-input-s1b">
            {message2}
        </div>
    </div>
  ]
  }



return (
  <div className="hotel-page-pa6">
    <div className="hotel-page-zn8">
      <div className="hotel-page-cd3" />
      <div className="hotel-page-zn9">
        <section>
          {bookingSummaryRender()}
      <DatePicker width={props.screenWidth} largeView={true} doublePanel={props.doublePanel} updateStartDate={updateStartDate} updateEndDate={updateEndDate} />
        </section>
      </div>
    </div>
  </div>
)

}

export default DateInput;
