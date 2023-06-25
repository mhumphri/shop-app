import React, { useRef } from "react";
import "../../css/hotelPage/description.css";

const descriptionText = [
  [
    "Qui nemo delectus aut rerum delectus rem dolore alias. Qui amet voluptatem est voluptatem obcaecati ea consequatur earum ad consequatur ipsam qui nesciunt similique ut accusantium rerum qui dignissimos necessitatibus. Et velit atque sit nostrum consequatur ab dignissimos quis.",
  ],
  false,
  false,
  [
    "Ut ullam repellendus ea quia facere qui ullam amet quo omnis debitis. Qui assumenda quibusdam et consequatur harum ea earum molestias aut dolorem officiis.",
  ],
];

// homepage component for hotelApp - contains jsx for homepage and search/server comms logic

function Description(props) {
  const text = useRef(null);

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

  return (
    <div className="hotel-page-pa6">
      <div className="hotel-page-zn8">
        <div class="hotel-page-cd3" />
        <div class="hotel-page-zn9">
          <section>
            <div
              style={{
                lineHeight: "24px",
              }}
            >
              <span>
                <span ref={text}>{textRender(descriptionText)}</span>
              </span>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Description;
