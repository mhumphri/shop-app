import React, { useState } from "react";
import "../../css/hotelPage/guestPickerSearchbox.css";

function GuestPickerSearchbox(props) {
  const stepperArray = ["Adults", "Children", "Infants", "Pets"];

  const limitsData = { Total: 16, Infants: 3 };

  const initStepperObject = () => {
    let newStepperObject = {};
    /* initialises variables for all the steppers */
    for (let i = 0; i < stepperArray.length; i++) {
      newStepperObject[stepperArray[i]] = {
        value: 0,
        add: true,
        subtract: false,
      };
      /* if the stepper value above zero, subtract button is enabled */
      if (props.guestsData[stepperArray[i]] > 0) {
        newStepperObject[stepperArray[i]].value =
          props.guestsData[stepperArray[i]];
        newStepperObject[stepperArray[i]].subtract = true;
      }
    }
    return newStepperObject;
  };
  const [stepperObject, setStepperObject] = useState(initStepperObject());

  /* initialises limit variables the steppers. If search inputs are higher then existing limits, limits are adjsuted upwards so that example site is internally consistent */
  const initLimitsObject = () => {
    let newLimitsObject = { ...limitsData };
    if (props.guestsData.Infants >= limitsData.Infants) {
      newLimitsObject.Infants = props.guestsData.Infants + 1;
    }
    if (props.guestsData.Pets >= limitsData.Pets) {
      newLimitsObject.Pets = props.guestsData.Pets + 1;
    }
    /* combined limit for adults and children */
    if (
      props.guestsData.Adults + props.guestsData.Children >=
      limitsData.Total
    ) {
      newLimitsObject.Total =
        props.guestsData.Adults + props.guestsData.Children + 1;
    }

    return newLimitsObject;
  };
  const [limitsObject, setLimitsObject] = useState(initLimitsObject());

  const updateValues = (stepperName, direction) => {
    console.log("updateValues: " + stepperName + " " + direction);
    let newStepperObject = { ...stepperObject };
    /* logic for add */
    if (direction === "add") {
      /* logic for adding an adult or child which have a combined 'total' upper limit */
      if (stepperName === "Adults" || stepperName === "Children") {
        if (
          stepperObject.Adults.value + stepperObject.Children.value <
          limitsObject.Total
        ) {
          newStepperObject[stepperName].value += 1;
        }
      } else {
      /* logic for adding an infant or pet which have an individual upper limit */
        if (stepperObject[stepperName].value < limitsObject[stepperName]) {
          newStepperObject[stepperName].value += 1;
        }
      }
    } else {
    /* logic for subtract */
      /* Children, Infants and Pets can subtract to zero */
      if (stepperName !== "Adults" && stepperObject[stepperName].value > 0) {
        newStepperObject[stepperName].value -= 1;
      }
      /* Adults can only subtract to one */
      if (stepperName === "Adults") {
        if (newStepperObject.Adults.value > 1) {
          newStepperObject.Adults.value -= 1;
        }
      }
    }

    /* logic for enabling / disabling 'add' stepper button */
    /* in combined limit is reached for adults and children both add stepper buttons are disabled and vice versa */
    if (stepperName === "Adults" || stepperName === "Children") {
      if (
        newStepperObject.Adults.value + newStepperObject.Children.value >=
        limitsObject.Total
      ) {
        newStepperObject.Adults.add = false;
        newStepperObject.Children.add = false;
      } else {
        newStepperObject.Adults.add = true;
        newStepperObject.Children.add = true;
      }
    } else {
    /* in individual limit is reached for infants and pets add stepper buttons are disabled and vice versa */
      if (newStepperObject[stepperName].value >= limitsObject[stepperName]) {
        newStepperObject[stepperName].add = false;
      } else {
        newStepperObject[stepperName].add = true;
      }
    }

    /* logic for enabling / disabling 'subtract' stepper button */

    if (stepperName !== "Adults") {
      if (newStepperObject[stepperName].value <= 0) {
        newStepperObject[stepperName].subtract = false;
      } else {
        newStepperObject[stepperName].subtract = true;
      }
    }

    if (stepperName === "Adults") {
      if (newStepperObject[stepperName].value <= 1) {
        newStepperObject[stepperName].subtract = false;
      } else {
        newStepperObject[stepperName].subtract = true;
      }
    }

    /* updates redux with current guest values */
    const newGuestData = {
      Adults: newStepperObject.Adults.value,
      Children: newStepperObject.Children.value,
      Infants: newStepperObject.Infants.value,
      Pets: newStepperObject.Pets.value,
    };

    // dispatch(guestsUpdated(newGuestData))
    props.setGuestsData(newGuestData);
    setStepperObject(newStepperObject);
  };

  const pickerButton = (stepperName, direction) => {
    return (
      <button
        class="guest-picker-searchbox-ul9"
        type="button"
        aria-label={direction === "subtract" ? "subtract" : "add"}
        onClick={() => updateValues(stepperName, direction)}
        disabled={!stepperObject[stepperName][direction]}
      >
        <span class="guest-picker-searchbox-8ov">
          <svg
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
            class="guest-picker-searchbox-gg2"
            focusable="false"
          >
            <path
              d={direction === "subtract" ? "m2 16h28" : "m2 16h28m-14-14v28"}
            ></path>
          </svg>
        </span>
      </button>
    );
  };

  const guestPickerInd = (stepperName, sublabel, underline) => {
    return (
      <div class="guest-picker-searchbox-1m4">
        <div class="guest-picker-searchbox-bc4">
          <div class="guest-picker-searchbox-1yn">{stepperName}</div>
          <div class="guest-picker-searchbox-1whv"></div>
        </div>
        <div class="guest-picker-searchbox-jro">
          {pickerButton(stepperName, "subtract")}

          <div class="guest-picker-searchbox-166">
            <span>{stepperObject[stepperName].value}</span>
          </div>

          {pickerButton(stepperName, "add")}
        </div>
      </div>
    );
  };

  return (
    <div class="guest-picker-searchbox-r2o" tabindex="-1">
      <div class="guest-picker-searchbox-1y5">
        {guestPickerInd("Adults", "Age 13+", false)}
      </div>
      <div class="guest-picker-searchbox-1es">
        {guestPickerInd("Children", "Ages 2–12", false)}
      </div>
      <div class="guest-picker-searchbox-1es">
        {guestPickerInd("Infants", "Under 2", false)}
      </div>

      <div class="guest-picker-searchbox-1jd">
        <button
          type="button"
          class="guest-picker-searchbox-za4"
          onClick={() => props.setGuestPickerActive(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default GuestPickerSearchbox;
