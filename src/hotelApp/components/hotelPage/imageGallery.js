import React, { useState, useRef } from "react";
import "../../css/hotelPage/imageGallery.css";

function ImageGallery(props) {
  const scrollDiv = useRef(null);
  const [activePhoto, setActivePhoto] = useState(1);

  // updates the number for current photo when user scrolls through gallery
  const handleScroll = () => {
    const currentPhoto =
      Math.round(scrollDiv.current.scrollLeft / scrollDiv.current.clientWidth) +
      1;
    if (currentPhoto !== activePhoto) {
      setActivePhoto(currentPhoto);
      console.log("currentPhoto: " + currentPhoto);
    }
  };

  const selectPhoto = (photoId) => {
    props.setActivePhoto(photoId);
    console.log("photoId: " + photoId);
  };

  const indImage = (imgData, index) => {
    return [
      <div class="image-gallery-1em">
        <button
          type="button"
          class="image-gallery-1xh"
          onClick={() => selectPhoto(index)}
        >
          <div class="image-gallery-1h6">
            <picture>
              <img class="image-gallery-6tb" src={imgData} />
            </picture>
          </div>
        </button>
      </div>,
    ];
  };

  if (props.largeView) {
    return (
      <div class="image-gallery-z80">
        <div class="image-gallery-9xg">
          <div class="image-gallery-168">
            <div class="image-gallery-skz">
              <div class="image-gallery-5lt">
                <div class="image-gallery-13s">
                  <div class="image-gallery-100">
                    {indImage(props.hotelData.photos[0], 0)}
                  </div>
                </div>
              </div>

              <div class="image-gallery-178">
                <div class="image-gallery-13s">
                  <div class="image-gallery-1l7">
                    <div class="image-gallery-100">
                      {indImage(props.hotelData.photos[1], 1)}
                    </div>
                  </div>

                  <div class="image-gallery-924">
                    <div class="image-gallery-100">
                      {indImage(props.hotelData.photos[2], 2)}
                    </div>
                  </div>
                </div>
              </div>

              <div class="image-gallery-182">
                <div class="image-gallery-13s">
                  <div class="image-gallery-1l7">
                    <div class="image-gallery-100">
                      {indImage(props.hotelData.photos[3], 3)}
                    </div>
                  </div>

                  <div class="image-gallery-924">
                    <div class="image-gallery-100">
                      {indImage(props.hotelData.photos[4], 4)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div class="image-gallery-v25">
        <div class="image-gallery-1tr">
          <ul
            onScroll={handleScroll}
            ref={scrollDiv}
            class="image-gallery-rxz"
            style={{ marginLeft: "0px", marginRight: "0px" }}
          >
            {props.hotelData.photos.map((x, index) => (
              <li
                aria-hidden="false"
                data-key={x.dataKey}
                class="image-gallery-145"
              >
                <div data-key={x.dataKey} class="image-gallery-1yf">
                  <button
                    type="button"
                    class="image-gallery-11e"
                    onClick={() => selectPhoto(index)}
                  >
                    <div
                      class="image-gallery-v0g"
                      role="img"
                      aria-busy="false"
                      aria-label="Show all photos"
                    >
                      <div class="image-gallery-462">
                        <picture>
                          <img class="image-gallery-oxz" src={x} />
                        </picture>
                      </div>
                    </div>
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div class="image-gallery-thq">
            {/* shows current number of current visible photo and total number of photos on arracy */}
            <div class="image-gallery-oab">
              {activePhoto} / {props.hotelData.photos.length}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ImageGallery;
