import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import "../css/datePicker.css";
const dayjs = require("dayjs");
var utc = require("dayjs/plugin/utc");
dayjs.extend(utc);
var isSameOrAfter = require("dayjs/plugin/isSameOrAfter");
var isSameOrBefore = require("dayjs/plugin/isSameOrBefore");
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);


// responsive datePicker component

function DatePicker(props) {

  // large view (boolean indicating if app currently in large view) and screen height (stored in redux)
  // const largeView = useSelector((state) => state.deviceData.largeView);
  const screenWidth = useSelector((state) => state.deviceData.screenWidth);

  const dotwArray = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // base clendar data
  const [calendarData, setCalendarData] = useState();
  /* active month being viewwed in picker data - LHS month in large view above 850px (where two months are visible) */
  const [currentMonth, setCurrentMonth] = useState(1);

  /* manages position of calendar months as they slide in and out (large view only) */
  const [trackStyle, setTrackStyle] = useState({
    transform: "translateX(0px)",
    width: "1564px",
  });
  /* maanges css style for months as they slide in and out (large view only) */
  const [tabLg1Style, setTabLg1Style] = useState("_fdp53bg");
  const [tabLg2Style, setTabLg2Style] = useState("_1lds9wb");
  const [tabLg3Style, setTabLg3Style] = useState("_1lds9wb");
  const [tabLg4Style, setTabLg4Style] = useState("_kuxo8ai");
  /* manages position of first calendar months as the months slide in and out (large view only) */
  const [tabLg1Pos, setTabLg1Pos] = useState({});

  /* checkin/out values stored locally (but not necessarily in redux) - used for temp setting values when mouse hovers over dotm */
  const [tempCheckout, setTempCheckout] = useState();
  const [tempCheckin, setTempCheckin] = useState();
  /* checkin/out values stored locally (but not necessarily in redux) - used for temp setting values when mouse hovers over dotm */
  const [localCheckout, setLocalCheckout] = useState();
  const [localCheckin, setLocalCheckin] = useState();
  /* set height of wrapper round full month picker - height may change when month chages as number of weeks in month can vary */
  const [pickerHeight, setPickerHeight] = useState(350);
  /* number of months visible in small view */
  const [visibleMonths, setVisibleMonths] = useState(4);
  /* for setDate() logic for small view. Records whether last date to be set was checkin our checkout */
  const [checkinLastSelected, setCheckinLastSelected] = useState(4);

  // initializes/updates calendar data
  const updateCalendardata = () => {
    // two year period
    let numMonths = 24;
  //  let firstDayOfMonth = dayjs().utc().startOf("month");
      let firstDayOfMonth = dayjs().startOf("month");

    if (props.largeView) {
      // 26 months is used for a two year perios as we need to bookend the datepicker with a month either side for sliding effect
      numMonths = 26;
      // one month is subtracted for today as we need the previous month to bookedn for the sliding effect
      // firstDayOfMonth = dayjs().utc().subtract(1, "month").startOf("month");
      firstDayOfMonth = dayjs().subtract(1, "month").startOf("month");
    }

    let monthArray = [];

    // makes array of first day of month for specified number of months
    for (let i = 0; i < numMonths; i++) {
      // need to add .startOf('month') to avoid summer time complications
      const newFDOM = dayjs(firstDayOfMonth).add(i, "month").startOf("month");
      monthArray.push(newFDOM);
    }

    // makes array of objects containing month data - name of month and aray of dates
    let monthObjectArray = [];
    for (let j = 0; j < numMonths; j++) {
      const monthName = dayjs(monthArray[j]).format("MMMM YYYY");
      const startDate = monthArray[j];
      // const endDate = dayjs(monthArray[j]).utc().endOf("month");
      const endDate = dayjs(monthArray[j]).endOf("month");

      // adds 'false' elements at start of dotmArray for empty days at start of month
      let dotmArray = [];
      let firstDay = dayjs(startDate).day();
      // dayjs has sunday as zero but need it as 7
      if (firstDay === 0) {
        firstDay = 7;
      }

      for (let k = 1; k < firstDay; k++) {
        dotmArray.push(false);
      }

      // adds all the dotm to dotmArray
      let currentDate = startDate;
      while (currentDate <= endDate) {
        dotmArray.push(currentDate);
        currentDate = dayjs(currentDate).add(1, "day");
      }

      // adds 'false' elements at end of dotmArray for empty days at start of month
      let lastDay = dayjs(endDate).day();
      // dayjs has sunday as zero but need it as 7
      if (lastDay === 0) {
        lastDay = 7;
      }
      const remainingDays = 7 - lastDay;

      for (let l = 0; l < remainingDays; l++) {
        dotmArray.push(false);
      }

      // bring together monthName and dotmArray to create month object
      const monthObject = {
        monthName: monthName,
        dotmArray: dotmArray,
      };

      // adds object for this month to all Month array
      monthObjectArray.push(monthObject);
    }

    setCalendarData(monthObjectArray);

  };

  /* calculates height of outer div containing calendar - based on number of weeks spanned by month*/
  const updatePickerHeight = (newMonth) => {
    if (calendarData) {
      let baseMonth = newMonth;
      /* if a new month is not provided as an argument, use current month from state as baseMonth */
      if (!newMonth) {
        baseMonth = currentMonth;
      }

      const numRows1 = Math.ceil(calendarData[baseMonth].dotmArray.length / 7);
      const numRows2 = Math.ceil(
        calendarData[baseMonth + 1].dotmArray.length / 7
      );

      /* if screen width is below 850px only one month is displayed, so pisckerheight in calcualted just far that month. If screenWidth >= 850 2 months are rendered so pickerHeigt needs to take account of both */
      let height = 350;
      if (props.largeView < 850) {
        if (numRows1 > 5) {
          height = 397;
        }
      } else {
        if (numRows1 > 5 || numRows2 > 5) {
          height = 397;
        }
      }
      setPickerHeight(height);
    }
  };

  // calcs width of dotm & dotw divs plus outer wrapper in samll view - varies with screenWidth in samll view
  const calcPickerDimensions = () => {
    let dimensions = {};
    if (props.largeView) {
      dimensions = { dotm: 46, dotw: 48 };
    } else {
      let newDotw = Math.round((props.width - 77) / 7);
      if (newDotw > 70) {
        newDotw = 70;
      }
      dimensions = {
        dotm: newDotw - 2,
        dotw: newDotw,
        outer: newDotw * 7 + 27,
      };
    }
    return dimensions;
  };

  // contains width of dotm & dotw divs plus outer wrapper in samll view - varies with screenWidth in samll view
  const [pickerDimensions, setPickerDimensions] = useState(
    calcPickerDimensions()
  );

  /* initialises data upon page load */
  useEffect(() => {
    setCurrentMonth(0);
    calcPickerDimensions();
    updateCalendardata();

    if (props.largeView) {
      updatePickerHeight();
      setCurrentMonth(1);
    }
  }, []);

  /* updates both local active date and global active date (in redux) when user clicks on dotm */
  const updateCheckin = (newDate) => {
    console.log("update checkin: " + newDate);
    setLocalCheckin(newDate);
    /*    dispatch(datesUpdated({ _key: "checkin", value: newDate})) */

    setTempCheckin(newDate);
    setCheckinLastSelected(true);
  };

  const updateCheckout = (newDate) => {
    console.log("update checkout: " + newDate);
    /*      dispatch(datesUpdated({ _key: "checkout", value: newDate})) */
    setLocalCheckout(newDate);
    setTempCheckout(newDate);
    setCheckinLastSelected(false);
  };

  /* updates selected date range and active date input field on the nav */
  const setDate = (newDate) => {
    console.log("SET_DATE1")
    if (!localCheckin) {
      updateCheckin(newDate);
    }
    if (localCheckin && !localCheckout) {
      console.log("SET_DATE2")
      if (dayjs(newDate).isSameOrAfter(localCheckin, "day")) {
        console.log("SET_DATE2A")
        updateCheckout(newDate);
      } else {
        console.log("SET_DATE2B")
        updateCheckin(newDate);
      }
    }
    if (localCheckin && localCheckout) {
      console.log("SET_DATE3")
      if (!checkinLastSelected) {
        if (dayjs(newDate).isBefore(localCheckout, "day")) {
          updateCheckin(newDate);
        } else {
          updateCheckin(newDate);
          console.log("false checkout 1");
          updateCheckout(false);
        }
      } else {
        if (dayjs(newDate).isSameOrBefore(localCheckin, "day")) {
          console.log("SET_DATE4")
          updateCheckin(newDate);
          console.log("false checkout 2");
          updateCheckout(false);
        } else {
          updateCheckout(newDate);
        }
      }
    } else {
      if (props.largeNav === "checkin") {
        console.log("SET_DATE5")
        updateCheckin(newDate);
        if (
          localCheckout &&
          dayjs(newDate).isAfter(localCheckout, "day")
        ) {
          updateCheckout(false);
          console.log("false checkout 3");
        }
        props.setLargeNav("checkout");
      }

      if (props.largeNav === "checkout") {
        if (dayjs(newDate).isBefore(localCheckin, "day")) {
          console.log("SET_DATE6")
          updateCheckin(newDate);
          updateCheckout(false);
          console.log("false checkout 4");
        } else if (!localCheckin) {
          updateCheckout(newDate);
          props.setLargeNav("checkin");
        } else {
          updateCheckout(newDate);
        }
      }
    }
  };


  /* moves forward active month by one */
  const moveForward = () => {
    if (currentMonth < calendarData.length - 3) {
      setTabLg4Style("_1lds9wb");
      setTrackStyle({
        transform: "translateX(-391px)",
        width: "1564px",
        transition: "transform 200ms ease-in-out 0s",
      });
      updatePickerHeight(currentMonth + 1);
      setTimeout(() => {
        setTrackStyle({ transform: "translateX(0px)", width: "1564px" });
        setTabLg4Style("_kuxo8ai");
        setCurrentMonth(currentMonth + 1);
      }, "200");
    }
  };

  /* moves active month back by one */
  const moveBack = () => {
    if (currentMonth > 1) {
      setTabLg1Pos({ position: "absolute", left: "-391px" });
      setTabLg1Style("_1lds9wb");
      setTrackStyle({
        transform: "translateX(391px)",
        width: "1564px",
        transition: "transform 200ms ease-in-out 0s",
      });
      updatePickerHeight(currentMonth - 1);
      setTimeout(() => {
        setTabLg1Pos({});
        setTrackStyle({ transform: "translateX(0px)", width: "1564px" });
        setTabLg1Style("_fdp53bg");
        setCurrentMonth(currentMonth - 1);
      }, "200");
    }
  };


  /* sets local checkin / checkout date if mouse hovers over dotm */
  const dateHover = (e, date) => {
    e.stopPropagation();
    if (localCheckin && !localCheckout) {
      if (dayjs(date).isBefore(dayjs(localCheckin), "day")) {
        setTempCheckout(false);
      } else {
        setTempCheckout(date);
      }
    }
    if (localCheckout && !localCheckin) {
      if (dayjs(date).isAfter(dayjs(localCheckout), "day")) {
        setTempCheckout(false);
      } else {
        setTempCheckin(date);
      }
    }
  };

// IS THIS NEEDED????
  /* sets local checkin / checkout to false when mouse moves away from dotm */
  const dateContainerHover = (e, date) => {
    if (props.localCheckin && !props.localCheckout) {
      setTempCheckout(false);
    }
    if (props.localCheckout && !props.localCheckin) {
      setTempCheckin(false);
    }
  };


  /* creates calendar render for a single month, including the formatting etc of selected dates  */
  const monthRender = (monthData) => {
    const calendarData = monthData.dotmArray;
    let newRender = [];
    const numRows = Math.ceil(calendarData.length / 7);

    for (let i = 0; i < numRows; i++) {
      const rowStart = i * 7;
      const rowEnd = (i + 1) * 7;

      let newRow = [];
      for (let j = rowStart; j < rowEnd; j++) {
        /* returns true / false if before current date or not */
        const inPast = dayjs(calendarData[j]).isBefore(dayjs(), "day");
        /* adds an empty <td> if day is before start of month */
        if (!calendarData[j]) {
          newRow.push(<td></td>);
        } else {
          const checkin =
            tempCheckin && dayjs(calendarData[j]).isSame(tempCheckin, "day");

          const checkout =
            tempCheckout && dayjs(calendarData[j]).isSame(tempCheckout, "day");

          const betweenDay =
            tempCheckin &&
            tempCheckout &&
            dayjs(calendarData[j]).isAfter(tempCheckin, "day") &&
            dayjs(calendarData[j]).isBefore(tempCheckout, "day");

          /* sets styles for mid-row days */
          let style1 = "_xzo51qd";
          let style2 = "_6gi1qsw";
          if (inPast) {
            style1 = "_10rqnsul";
            style2 = "_1ct0t2";
          }
          /* sets styles for selected day - checkin */
          if (checkin) {
            style1 = "_16ylgctq";
            style2 = "_1nf2vyse";
          }
          /* sets styles for selected day - checkout */
          if (checkout) {
            style1 = "_1ba08hns";
            style2 = "_1nf2vyse";
          }
          /* sets styles for selected day - in between checkin and checkout */
          if (betweenDay) {
            style1 = "_1ifwywb1";
            style2 = "_gkknk2q";
          }
          /* filters for days at start of row */
          if (Number.isInteger(j / 7)) {
            style1 = "_12glnvbt";
            style2 = "_1gazwvry";
            if (inPast) {
              style1 = "_1k32kw4z";
              style2 = "_1ct0t2";
            }
            /* sets styles for selected day - checkin */
            if (checkin) {
              style1 = "_16ylgctq";
              style2 = "_1nf2vyse";
            }
            /* sets styles for selected day - checkout */
            if (checkout) {
              style1 = "_1kd8ctdu";
              style2 = "_161fiz8i";
            }
            /* sets styles for selected day - in between checkin and checkout */
            if (betweenDay) {
              style1 = "_7179yqh";
              style2 = "_119nin5s";
            }
          }
          /* filters for days at end of row */
          if (Number.isInteger((j + 1) / 7)) {
            /* sets styles for unselected days */
            style1 = "_uab5izv";
            style2 = "_1gazwvry";
            if (inPast) {
              style1 = "_874f7s1";
              style2 = "_1ct0t2";
            }
            /* sets styles for selected day - checkin */
            if (checkin) {
              style1 = "_8hxfazu";
              style2 = "_161fiz8i";
            }
            /* sets styles for selected day - checkout */
            if (checkout) {
              style1 = "_1ba08hns";
              style2 = "_1nf2vyse";
            }
            /* sets styles for selected day - in between checkin and checkout */
            if (betweenDay) {
              style1 = "_luu0gt5";
              style2 = "_ws34ciu";
            }
          }
          /* sets styles if either checkin only  is selected */
          if (checkin && !tempCheckout) {
            style1 = "_16d21rye";
            style2 = "_1ueso2fg";
          }

          /* sets styles if either checkout only is selected */
          if (checkout && !tempCheckin) {
            style1 = "_16d21rye";
            style2 = "_1ueso2fg";
          }

          /* this section adjusts formatting if the dotm falls at the beginning or end of the month */
          let overflow = false;
          let overflowForward = false;
          const startOfMonth = dayjs(calendarData[j]).isSame(
            dayjs(calendarData[j]).startOf("month"),
            "day"
          );
          const endOfMonth = dayjs(calendarData[j]).isSame(
            dayjs(calendarData[j]).endOf("month"),
            "day"
          );
          const isntSunday = dayjs(calendarData[j]).day() !== 0;
          const isntMonday = dayjs(calendarData[j]).day() !== 1;
          /* formatting for end of month (if not Sunday) */
          if (endOfMonth && betweenDay && isntSunday && !checkout) {
            overflow = true;
            overflowForward = true;
          }
          /* formatting for end of month (if not Monday) */
          if (startOfMonth && betweenDay && isntMonday && !checkin) {
            overflow = true;
          }

          /* adds table element for start and end of month (if not Sunday or Monday) */
          if (overflow) {
            newRow.push(
              <td
                class={style1}
                role="button"
                aria-disabled="false"
                aria-label="1, Thursday, December 2022. Available. Select as checkout date. "
                tabindex="-1"
                onClick={inPast ? null : () => setDate(calendarData[j])}
                aria-describedby="20221201"
                onMouseOver={
                  inPast ? null : (e) => dateHover(e, calendarData[j])
                }
              >
                <div class="_h84ua7">
                  <div class={overflowForward ? "_qxze2vs" : "_2ehw1pm"}></div>
                  <div
                    class={style2}
                    data-testid="calendar-day-01/12/2022"
                    data-is-day-blocked="false"
                    style={{
                      width: pickerDimensions.dotm + "px",
                      height: pickerDimensions.dotm + "px",
                    }}
                  >
                    {dayjs(calendarData[j]).format("D")}
                  </div>
                </div>
              </td>
            );
          } else {
            /* adds table element for all other days of the month */
            newRow.push(
              <td
                class={style1}
                role="button"
                aria-disabled="false"
                aria-label="29, Saturday, October 2022. Available. Select as check-in date. "
                tabindex="-1"
                onClick={inPast ? null : () => setDate(calendarData[j])}
                onMouseOver={
                  inPast ? null : (e) => dateHover(e, calendarData[j])
                }
              >
                <div
                  class={style2}
                  data-testid="calendar-day-29/10/2022"
                  data-is-day-blocked="false"
                  style={{
                    width: pickerDimensions.dotm + "px",
                    height: pickerDimensions.dotm + "px",
                  }}
                >
                  {dayjs(calendarData[j]).format("D")}
                </div>
              </td>
            );
          }
        }
      }
      newRender.push([<tr>{newRow}</tr>]);
    }

    if (props.largeView) {
      /* add render elements around rows of dotm */
      const monthRender = [
        <div
          class="_ytfarf"
          style={{ padding: "0px 27px" }}
          data-visible="true"
        >
          <div class="_ihvjx2">
            <section>
              <h2 tabindex="-1" class="_14i3z6h" elementtiming="LCP-target">
                {monthData.monthName}
              </h2>
            </section>
          </div>
          <table
            class="_cvkwaj"
            style={{ borderSpacing: "0px 2px" }}
            role="presentation"
          >
            <tbody>{newRender}</tbody>
          </table>
        </div>,
      ];
      return monthRender;
    } else {
      /* add render elements around rows of dotm */
      const monthRender = [
        <div>
          <div
            style={{ padding: "0px 35px" }}
            class="_ytfarf"
            data-visible="true"
          >
            <div class="_t720qti">
              <section>
                <h2 tabindex="-1" class="_14i3z6h" elementtiming="LCP-target">
                  {monthData.monthName}
                </h2>
              </section>
            </div>
            <table
              class="_cvkwaj"
              style={{ borderSpacing: "0px 2px" }}
              role="presentation"
            >
              <tbody>{newRender}</tbody>
            </table>
          </div>
        </div>,
      ];
      return monthRender;
    }
  };


  const visibleMonthsRender = () => {
    let newRender = [];
    for (let i = 0; i < visibleMonths; i++) {
      newRender.push(monthRender(calendarData[i], tempCheckin, tempCheckout));
    }
    return newRender;
  };

  const loadMoreDates = () => {
    if (visibleMonths < 24) {
      setVisibleMonths(visibleMonths + 4);
    }
  };


if (props.largeView) {

  return (
    <div class="_kasbqg">

{calendarData ? (

        <div>
          <div>
            <div
              class="c1nifi44 fuhmdl6 l16t0m55 dir dir-ltr"
            >
            <section>
                <div class="dir dir-ltr">
                  <div class="_1avex2v">
                    <div class="_u02imw">
                      <div id="tabs" aria-label="">
                        <div>
                          <div
                            role="tabpanel"
                            onMouseOver={() => dateContainerHover()}
                            onMouseLeave={() => dateContainerHover()}
                          >
                         <div class="_65d865">
                              <div class="dhjkeof dir dir-ltr">
                                <div class="_3hmsj">









                                  <div
                                    class="_g2s11rv"
                                    style={
                                      screenWidth < 850
                                        ? { width: "410px" }
                                        : { width: "801px" }
                                    }
                                  >
                                    <div>
                                      <div
                                        style={
                                          screenWidth < 850
                                            ? { width: "409px" }
                                            : { width: "800px" }
                                        }
                                      >
                                        <div
                                          class="_1x76l5m3"
                                          aria-hidden="true"
                                          role="presentation"
                                        >
                                          <div
                                            class="_2cafln"
                                            style={{
                                              left: "0px",
                                              padding: "0px 27px",
                                            }}
                                          >
                                            <ul class="_xv14sf">
                                              {dotwArray.map((x) => (
                                                <li
                                                  class="_92xroi"
                                                  style={{ width: "48px" }}
                                                >
                                                  {x}
                                                </li>
                                              ))}
                                            </ul>
                                          </div>
                                          {screenWidth < 850 ? null : (
                                            <div
                                              class="_2cafln"
                                              style={{
                                                left: "391px",
                                                padding: "0px 27px",
                                              }}
                                            >
                                              <ul class="_xv14sf">
                                                {dotwArray.map((x) => (
                                                  <li
                                                    class="_92xroi"
                                                    style={{ width: "48px" }}
                                                  >
                                                    {x}
                                                  </li>
                                                ))}
                                              </ul>
                                            </div>
                                          )}
                                        </div>









                                        <div
                                          class="_14676s3"
                                          tabindex="-1"
                                          role="application"
                                          aria-label="Calendar"
                                        >
                                          <div class="_5neba7a">
                                            <div class="_1d1qzab">
                                              <button
                                                aria-disabled="false"
                                                aria-label="Go back to switch to the previous month."
                                                type="button"
                                                class="_oda838"
                                                onClick={moveBack}
                                                disabled={
                                                  currentMonth < 2
                                                    ? true
                                                    : false
                                                }
                                              >
                                                <span class="_e296pg">
                                                  <svg
                                                    viewBox="0 0 18 18"
                                                    role="presentation"
                                                    aria-hidden="true"
                                                    focusable="false"
                                                    style={{
                                                      height: "12px",
                                                      width: "12px",
                                                      display: "block",
                                                      fill: "currentcolor",
                                                    }}
                                                  >
                                                    <path
                                                      d="m13.7 16.29a1 1 0 1 1 -1.42 1.41l-8-8a1 1 0 0 1 0-1.41l8-8a1 1 0 1 1 1.42 1.41l-7.29 7.29z"
                                                      fill-rule="evenodd"
                                                    ></path>
                                                  </svg>
                                                </span>
                                              </button>
                                            </div>

                                            <div class="_qz9x4fc">
                                              <button
                                                aria-disabled="false"
                                                aria-label="Move forward to change to the next month."
                                                type="button"
                                                class="_oda838"
                                                onClick={moveForward}
                                                disabled={
                                                  currentMonth > 22
                                                    ? true
                                                    : false
                                                }
                                              >
                                                <span class="_e296pg">
                                                  <svg
                                                    viewBox="0 0 18 18"
                                                    role="presentation"
                                                    aria-hidden="true"
                                                    focusable="false"
                                                    style={{
                                                      height: "12px",
                                                      width: "12px",
                                                      display: "block",
                                                      fill: "currentcolor",
                                                    }}
                                                  >
                                                    <path
                                                      d="m4.29 1.71a1 1 0 1 1 1.42-1.41l8 8a1 1 0 0 1 0 1.41l-8 8a1 1 0 1 1 -1.42-1.41l7.29-7.29z"
                                                      fill-rule="evenodd"
                                                    ></path>
                                                  </svg>
                                                </span>
                                              </button>
                                            </div>
                                          </div>
                                        </div>








                                     {screenWidth < 850
                                          ? [
                                              <div
                                                class="_1foj6yps"
                                                style={{
                                                  width: "409px",
                                                  height: pickerHeight + "px",
                                                }}
                                              >
                                                <div
                                                  class="_2hyui6e"
                                                  style={trackStyle}
                                                >
                                                  <div
                                                    class={tabLg1Style}
                                                    style={tabLg1Pos}
                                                  >
                                                    {monthRender(
                                                      calendarData[
                                                        currentMonth - 1
                                                      ],
                                                      tempCheckin,
                                                      tempCheckout
                                                    )}
                                                  </div>
                                                  <div class={tabLg2Style}>
                                                    {monthRender(
                                                      calendarData[
                                                        currentMonth
                                                      ],
                                                      tempCheckin,
                                                      tempCheckout
                                                    )}
                                                  </div>
                                                  <div class={tabLg4Style}>
                                                    {monthRender(
                                                      calendarData[
                                                        currentMonth + 1
                                                      ],
                                                      tempCheckin,
                                                      tempCheckout
                                                    )}
                                                  </div>
                                                </div>
                                              </div>,
                                            ]
                                          : [
                                              <div
                                                class="_1foj6yps"
                                                style={{
                                                  width: "800px",
                                                  height: pickerHeight + "px",
                                                }}
                                              >
                                                <div
                                                  class="_2hyui6e"
                                                  style={trackStyle}
                                                >
                                                  <div
                                                    class={tabLg1Style}
                                                    style={tabLg1Pos}
                                                  >
                                                    {monthRender(
                                                      calendarData[
                                                        currentMonth - 1
                                                      ],
                                                      tempCheckin,
                                                      tempCheckout
                                                    )}
                                                  </div>
                                                  <div class={tabLg2Style}>
                                                    {monthRender(
                                                      calendarData[
                                                        currentMonth
                                                      ],
                                                      tempCheckin,
                                                      tempCheckout
                                                    )}
                                                  </div>
                                                  <div class={tabLg3Style}>
                                                    {monthRender(
                                                      calendarData[
                                                        currentMonth + 1
                                                      ],
                                                      tempCheckin,
                                                      tempCheckout
                                                    )}
                                                  </div>
                                                  <div class={tabLg4Style}>
                                                    {monthRender(
                                                      calendarData[
                                                        currentMonth + 2
                                                      ],
                                                      tempCheckin,
                                                      tempCheckout
                                                    )}
                                                  </div>
                                                </div>
                                              </div>,
                                            ]}














                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>) : null}




    </div>
  );

}

else {

return (

          <section
            class="biod118 dir dir-ltr"
            aria-hidden="false"
          >

                          <div
                            class="dp1cp1f dir dir-ltr"
                            style={{ top: "148px" }}
                          >
                            <div class="_1h0hirz">
                              <div class="_1mfsr54">
                                <div class="_1y26gh8o">
                                  <div>
                                    <div>
                                    <div
                                        class="_e296pg"
                                        aria-hidden="true"
                                        role="presentation"
                                      >
                                        <div
                                          class="_1kypzrpr"
                                        >
                                          <ul class="_xv14sf">
                                            {dotwArray.map((x) => (
                                              <li
                                                class="_92xroi"
                                                style={{
                                                  width:
                                                    pickerDimensions.dotw +
                                                    "px",
                                                }}
                                              >
                                                {x}
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      </div>
                                      <div
                                        class="_14676s3"
                                        tabindex="-1"
                                        role="application"
                                        aria-label="Calendar"
                                      >
                                        <div class="_9xlqonb">
                                          {calendarData ? (
                                            <div
                                              class="_1s79stsj"
                                              style={{
                                                transform: "translateY(0px)",
                                                width:
                                                  pickerDimensions.outer +
                                                  "px",
                                              }}
                                            >
                                              {visibleMonthsRender()}
                                            </div>
                                          ) : null}

                                          {visibleMonths < 24 ? (
                                            <div class="_gor68n">
                                              <div class="_1l06a80">
                                                <button
                                                  type="button"
                                                  class="_snbhip0"
                                                  onClick={loadMoreDates}
                                                >
                                                  Load more dates
                                                </button>
                                              </div>
                                            </div>
                                          ) : null}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>




          </section>

)
}

}

export default DatePicker;
