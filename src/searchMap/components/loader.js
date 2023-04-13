import React, { useEffect, useState } from "react";
import "../css/loader.css";

function Loader(props) {

  // hold scale of dots (which changes over time)
  const [dotScale1, setDotScale1] = useState(1);
  const [dotScale2, setDotScale2] = useState(0.7);
  const [dotScale3, setDotScale3] = useState(0.2);

  // triggers/controls changing size of dots upon component load
  useEffect(() => {
    const dotAnimation = () => {
    setDotScale1(0.7)
    setDotScale2(1)
    setDotScale3(0.7)
    setTimeout(() => {
      setDotScale1(0)
      setDotScale2(0.7)
      setDotScale3(1)
}, "400")
setTimeout(() => {
  setDotScale1(0.7)
  setDotScale2(1)
  setDotScale3(0.7)

}, "800")
setTimeout(() => {
  setDotScale1(1)
  setDotScale2(0.7)
  setDotScale3(0)

}, "1200")
setTimeout(() => {
dotAnimation()
}, "1600")
}

dotAnimation()

  }, []);

  if (props.largeView) {

return (
  <div
    class="cezhrh0 dir dir-ltr"
    style={{
      whiteSpace: "nowrap",
      position: "absolute",
      marginTop: "24px",
      top: "0px",
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: "1",
      transition: "transform 850ms cubic-bezier(0.25, 1, 0.5, 1) 0s",
    }}
    aria-hidden="false"
  >
    <div class="copf0za dir dir-ltr">
      <div
        class="c15e4bhw ctbkggg dir dir-ltr"
        style={{ height: "40px", display: "flex", justifyContent: "center",  alignItems: "center" }}
      >
      <div
        class="_1b2klj3_loader"
        style={{ transform: "translateX(0px)" }}
      >
      <span
        class="_1k9ksvh_loader"
        style={{ transition: "transform 850ms linear 0s", transform: "scale(" + dotScale1 + ")" }}
      ></span>
      <span
        class="_1k9ksvh_loader"
        style={{ transform: "scale(" + dotScale2 + ")", transition: "transform 850ms linear 0s" }}
      ></span>
      <span
        class="_1k9ksvh_loader"
        style={{ transform: "scale(" + dotScale3 + ")", transition: "transform 850ms linear 0s" }}
      ></span>
      </div>
      </div>
    </div>
  </div>
)
}
else {
  return (
    <div
      class="cezhrh0 dir dir-ltr"
      style={{
        whiteSpace: "nowrap",
        position: "absolute",
        marginTop: "172px",
        top: "0px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: "1",
        transition: "transform 850ms cubic-bezier(0.25, 1, 0.5, 1) 0s",
      }}
      aria-hidden="false"
    >
      <div class="copf0za dir dir-ltr">
        <div
          class="c15e4bhw ctbkggg dir dir-ltr"
          style={{ height: "40px", display: "flex", justifyContent: "center",  alignItems: "center" }}
        >
        <div
          class="_1b2klj3_loader"
          style={{ transform: "translateX(0px)" }}
        >
        <span
          class="_1k9ksvh_loader"
          style={{ transition: "transform 850ms linear 0s", transform: "scale(" + dotScale1 + ")" }}
        ></span>
        <span
          class="_1k9ksvh_loader"
          style={{ transform: "scale(" + dotScale2 + ")", transition: "transform 850ms linear 0s" }}
        ></span>
        <span
          class="_1k9ksvh_loader"
          style={{ transform: "scale(" + dotScale3 + ")", transition: "transform 850ms linear 0s" }}
        ></span>
        </div>
        </div>
      </div>
    </div>
  )
}

}

export default Loader;
