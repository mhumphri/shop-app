const crossButton = (ref, nav, clickFunction) => {

  return [
    <div onClick={(e) => e.stopPropagation()} class={ref === nav ? "_19cf48li" : "_vp2pnby"}>
      <div class="_19xvkor" onClick={clickFunction}>
        <button aria-label="Clear Input" type="button" class="_10rqlrm" >
          <span class="_e296pg">
            <svg
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
              className="svg_cross"
              aria-hidden="true"
              role="presentation"
              focusable="false"
            >
              <path d="m6 6 20 20"></path>
              <path d="m26 6-20 20"></path>
            </svg>
          </span>
        </button>
      </div>
    </div>
  ]

}

export default crossButton
