import React, { useState, useEffect, useRef } from "react";
import "../../css/hotelPage/description.css";

const descriptionText = [
  [
    "Qui nemo delectus aut rerum delectus rem dolore alias. Qui amet voluptatem est voluptatem obcaecati ea consequatur earum ad consequatur ipsam qui nesciunt similique ut accusantium rerum qui dignissimos necessitatibus. Et velit atque sit nostrum consequatur ab dignissimos quis.",
  ],
  false,
  false,
  {
    header: "The space",
  },
  false,
  [
    "Est voluptatem nihil qui voluptatem autem est voluptatem dolores. Ut internos aperiam non nihil dolorem et fuga ipsa id quam accusamus At ducimus eveniet.",
  ],
  false,
  false,
  [
    "Eos enim totam qui odit nihil aut quisquam suscipit aut accusamus voluptas aut voluptas ratione.",
  ],
  false,
  false,
  {
    header: "Guest access",
  },
  false,
  [
    "Aut mollitia minus cum quae aspernatur sed tempora fuga. Sed dolorem quidem ea fugiat necessitatibus sed quibusdam beatae et eveniet nisi ut fugit earum ea dignissimos rerum a error ipsa. Aut autem numquam ut debitis molestias rem dolorem eius qui nihil sequi cum mollitia quibusdam ex atque quia.",
  ],
  false,
  false,
  [
    "Aut perferendis officia est praesentium nihil sed unde quia aut omnis fuga quo molestiae galisum ex porro corporis. Non internos voluptates sed error quam est quia illum et error voluptas qui omnis iste.",
  ],
  false,
  false,
  {
    header: "Other things to note",
  },
  false,
  [
    "Ut ullam repellendus ea quia facere qui ullam amet quo omnis debitis. Qui assumenda quibusdam et consequatur harum ea earum molestias aut dolorem officiis. Qui excepturi modi aut minima expedita eos esse facilis non saepe velit nam sapiente facere aut sint voluptate et praesentium dolor.",
  ],
];

// homepage component for hotelApp - contains jsx for homepage and search/server comms logic

function Description(props) {
  const text = useRef(null);

  const [boxOverflow, setBoxOverflow] = useState();

  /* returns render of text and line breaks in response to array of text and false (for line break) elements */
  const textRender = (textArray) => {
    let newText = [];
    for (let i = 0; i < textArray.length; i++) {
      if (!textArray[i]) newText.push(<br />);
      else if (textArray[i].header) {
        newText.push(
          <span className="description-1di">{textArray[i].header}</span>
        );
      } else {
        newText.push(textArray[i]);
      }
    }
    return newText;
  };

  useEffect(() => {
    let lineLimit = 10;
    if (props.modal) {
      lineLimit = 15;
    }

    var divHeight = text.current.offsetHeight;
    var lineHeight = 24;
    var lines = divHeight / lineHeight;
    if (lines >= lineLimit) {
      setBoxOverflow(true);
    }
  }, []);

  return (
    <div className="hotel-page-pa6">
      <div className="hotel-page-zn8">
        <div class="hotel-page-cd3" />
        <div class="hotel-page-zn9">
          <section>
            <div
              style={
                boxOverflow
                  ? {
                      lineHeight: "24px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: "10",
                      MozBoxOrient: "vertical",
                    }
                  : {
                      lineHeight: "24px",
                    }
              }
            >
              <span>
                <span ref={text}>{textRender(descriptionText)}</span>
              </span>
            </div>
            <div className="description-s1i">
              <button
                type="button"
                className="description-b1k"
                onClick={props.openModal}
              >
                <span className="description-c1d">
                  <span>Show more</span>
                  <span class="description-tuk">
                    <svg
                      viewBox="0 0 18 18"
                      role="presentation"
                      aria-hidden="true"
                      focusable="false"
                      className="description-op2"
                    >
                      <path
                        d="m4.29 1.71a1 1 0 1 1 1.42-1.41l8 8a1 1 0 0 1 0 1.41l-8 8a1 1 0 1 1 -1.42-1.41l7.29-7.29z"
                        fill-rule="evenodd"
                      ></path>
                    </svg>
                  </span>
                </span>
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Description;
