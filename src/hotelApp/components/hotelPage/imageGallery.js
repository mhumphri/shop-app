import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { photoModalUpdated  } from '../redux/modals/photoModalSlice'
import "../../css/hotelPage/imageGallery.css";
import Other1 from "../../images/other1.jpg";
import Other2 from "../../images/other2.jpg";
import Other3 from "../../images/other3.jpg";
import Other4 from "../../images/other4.jpg";
import Other5 from "../../images/other5.jpg";
import Other6 from "../../images/other6.jpg";
import Other7 from "../../images/other7.jpg";

const data = [
  {
    img: Other1,
    label: "mainPic",
    dataKey: 0,
  },
  {
    img: Other2,
    label: "roomPic1",
    dataKey: 2,
  },
  {
    img: Other3,
    label: "roomPic3",
    dataKey: 4,
  },
  {
    img: Other4,
    label: "roomPic2",
    dataKey: 3,
  },
  {
    img: Other5,
    label: "roomPic5",
    dataKey: 6,
  },
  {
    img: Other6,
    label: "roomPic0",
    dataKey: 1,
  },
  {
    img: Other7,
    label: "roomPic4",
    dataKey: 5,
  },
];

function ImageGallery(props) {
  const scrollDiv = useRef(null);
  const [activePhoto, setActivePhoto] = useState(1);
  const [photoModal, setPhotoModal] = useState();

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

  const dispatch = useDispatch();

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
              <source srcset={imgData.img} media="(max-width: 743px)" />
              <source
                srcset={imgData.img}
                media="(min-width: 743.1px) and (max-width: 1127px)"
              />
              <source
                srcset={imgData.img}
                media="(min-width: 1127.1px) and (max-width: 1439px)"
              />
              <source srcset={imgData.img} media="(min-width: 1439.1px)" />
              <img class="image-gallery-6tb" src={imgData.img} />
            </picture>
            <div
              class="_15p4g025"
              style={{ backgroundImage: imgData.img, backgroundSize: "cover" }}
            ></div>
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
                  <div class="image-gallery-100">{indImage(data[0], 0)}</div>
                </div>
              </div>

              <div class="image-gallery-178">
                <div class="image-gallery-13s">
                  <div class="image-gallery-1l7">
                    <div class="image-gallery-100">{indImage(data[1], 1)}</div>
                  </div>

                  <div class="image-gallery-924">
                    <div class="image-gallery-100">{indImage(data[2], 2)}</div>
                  </div>
                </div>
              </div>

              <div class="image-gallery-182">
                <div class="image-gallery-13s">
                  <div class="image-gallery-1l7">
                    <div class="image-gallery-100">{indImage(data[3], 3)}</div>
                  </div>

                  <div class="image-gallery-924">
                    <div class="image-gallery-100">{indImage(data[4], 4)}</div>
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
            {data.map((x, index) => (
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
                          <source srcset={x.img} media="(max-width: 743px)" />
                          <source
                            srcset={x.img}
                            media="(min-width: 743.1px) and (max-width: 1127px)"
                          />
                          <source
                            srcset={x.img}
                            media="(min-width: 1127.1px) and (max-width: 1439px)"
                          />
                          <source
                            srcset={x.img}
                            media="(min-width: 1439.1px)"
                          />
                          <img class="image-gallery-oxz" src={x.img} />
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
              {activePhoto} / {data.length}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ImageGallery;
