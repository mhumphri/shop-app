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

  /* updates the number for current photo when user scrolls through gallery */
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
    // dispatch(photoModalUpdated(true))
    props.setActivePhoto(photoId);
    console.log("photoId: " + photoId);
  };

  const indImage = (imgData, index) => {
    return [
      <div class="_1emsdka">
        <button
          aria-label="Listing image 1, Show all photos"
          type="button"
          class="_1xh26pm2"
          onClick={() => selectPhoto(index)}
        >
          <div
            class="_1h6n1zu"
            style={{
              display: "inline-block",
              verticalAlign: "bottom",
              height: "100%",
              width: "100%",
              minHeight: "1px",
            }}
          >
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
              <img
                class="_6tbg2q"
                style={{ objectFit: "cover", verticalAlign: "bottom" }}
                aria-hidden="true"
                alt=""
                elementtiming="LCP-target"
                fetchpriority="high"
                id="FMP-target"
                src={imgData.img}
                data-original-uri={imgData.img}
              />
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
      <div class="c1yo0219 dir dir-ltr">
        <div>
          <div class="_le6wlg">
            <div
              class="plmw1e5 mq5rv0q dir dir-ltr"
              style={{ maxWidth: "1120px" }}
            >
              <div
                data-plugin-in-point-id="HERO_DEFAULT"
                data-section-id="HERO_DEFAULT"
                style={{ paddingTop: "24px" }}
              >
                <div class="_88xxct">
                  <div class="_z80d2i">
                    <div class="_9xgknn">
                      <div class="_168ht2w">
                        <div class="_skzmvy">
                          <div class="_5ltqju">
                            <div class="_13sj9hk">
                              <div class="_100fji8">{indImage(data[0], 0)}</div>
                            </div>
                          </div>

                          <div class="_178t1g5">
                            <div class="_13sj9hk">
                              <div class="_1l7oqbd">
                                <div class="_100fji8">
                                  {indImage(data[1], 1)}
                                </div>
                              </div>

                              <div class="_924zz4g">
                                <div class="_100fji8">
                                  {indImage(data[2], 2)}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div class="_1827gf2">
                            <div class="_13sj9hk">
                              <div class="_1l7oqbd">
                                <div class="_100fji8">
                                  {indImage(data[3], 3)}
                                </div>
                              </div>

                              <div class="_924zz4g">
                                <div class="_100fji8">
                                  {indImage(data[4], 4)}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="_ekor09">
                        <button
                          type="button"
                          class="_1ju7xj0j"
                          onClick={() => selectPhoto(0)}
                        >
                          <div class="_5kaapu">
                            <svg
                              viewBox="0 0 16 16"
                              xmlns="http://www.w3.org/2000/svg"
                              style={{
                                display: "block",
                                height: "16px",
                                width: "16px",
                                fill: "currentcolor",
                              }}
                              aria-hidden="true"
                              role="presentation"
                              focusable="false"
                            >
                              <path
                                d="m3 11.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-10-5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-10-5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z"
                                fill-rule="evenodd"
                              ></path>
                            </svg>
                            <div class="_uhxsfg">Show all photos</div>
                          </div>
                        </button>
                      </div>
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
            {data.map((x, index) => (
              <li
                aria-hidden="false"
                data-key={x.dataKey}
                class="image-gallery-145"
                style={{ borderWidth: "0px" }}
              >
                <div data-key={x.dataKey} class="image-gallery-1yf">
                  <button
                    type="button"
                    class="image-gallery-11e"
                    onClick={() => selectPhoto(index)}
                  >
                    {/* REMOVED - style="--dls-liteimage-padding-top: 66.6667%;" */}
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
                          <img
                            class="image-gallery-oxz"
                            style={{ objectFit: "cover" }}
                            aria-hidden="true"
                            alt="Show all photos"
                            elementtiming="FMP-target"
                            id="FMP-target"
                            src={x.img}
                            data-original-uri={x.img}
                            data-shared-element-id={
                              "listing-" + x.dataKey + "-hero-image"
                            }
                          />
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
