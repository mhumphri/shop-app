import React, { useState, useEffect, useRef } from "react";
import SwipeableGallery from "../../swipeableGallery/components/swipeableGallery";

import "../css/indListItem.css";

function IndListItem(props) {
  const [searchResultLoading, setSearchResultLoading] = useState(true);

  return (
    <div className="ind-list-item-la6">
      <SwipeableGallery />
      <div className="ind-list-item-gd5">
        <div className="ind-list-item-pq1">
          <div className="ind-list-item-lq2">
            <span className={searchResultLoading ? "ind-list-item-oa3" : ""}>
              top row header
            </span>
          </div>

          <div
            className={
              searchResultLoading
                ? "ind-list-item-hg3 text-loading "
                : "ind-list-item-hg3"
            }
            role="img"
          >
            <svg
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
              style={
                searchResultLoading
                  ? {
                      display: "block",
                      height: "12px",
                      width: "12px",
                      fill: "#DDDDDD",
                    }
                  : {
                      display: "block",
                      height: "12px",
                      width: "12px",
                      fill: "currentcolor",
                    }
              }
              aria-hidden="true"
              role="presentation"
              focusable="false"
            >
              <path
                d="M15.094 1.579l-4.124 8.885-9.86 1.27a1 1 0 0 0-.542 1.736l7.293 6.565-1.965 9.852a1 1 0 0 0 1.483 1.061L16 25.951l8.625 4.997a1 1 0 0 0 1.482-1.06l-1.965-9.853 7.293-6.565a1 1 0 0 0-.541-1.735l-9.86-1.271-4.127-8.885a1 1 0 0 0-1.814 0z"
                fill-rule="evenodd"
              ></path>
            </svg>
            <div className="ind-list-item-ma1">4.5</div>
          </div>
        </div>
        <div>
          <div
            className={
              searchResultLoading
                ? "ind-list-item-te8 text-loading"
                : "ind-list-item-te8"
            }
          >
            location1, location2
          </div>
        </div>
        <div>
          <div
            className={
              searchResultLoading
                ? "ind-list-item-te8 text-loading"
                : "ind-list-item-te8"
            }
          >
            <span className="ind-list-item-al5">£456</span> per night
          </div>
        </div>
      </div>
    </div>
  );
}

export default IndListItem;