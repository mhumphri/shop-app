const calcSinglePanelDimensions = () => {
  const newSinglePanelDimensions = {

  }
  return newSinglePanelDimensions
}

// stores datepicker dimensions for a single panel render in large view - responsive to container width
const [singlePanelDimensions, setSinglePanelDimensions] = useState(calcSinglePanelDimensions());

setSinglePanelDimensions(calcSinglePanelDimensions())

/////////////

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
