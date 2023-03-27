    return <div className="portfolioitem-ie3 auto-pointer">{innerContent}</div>;

const innerContent = [
	<div class="swipeable-gallery-c14-2"
		onMouseEnter={handleMouseEnter}
		onMouseLeave={handleMouseLeave}>
		<div
			aria-describedby="carousel-description"
			class="cnjlbcx_v2 cp0pqp0 rztl681 dir dir-ltr"
			role="group"
		>

{/* contains info label and chvrons etc */}
				<div class="c18vjgz6 dir dir-ltr">
					<div class="o47luuh o1q97y5m dir dir-ltr">
						<div class="tsz9f4o dir dir-ltr">

								<div className="portfolioitem-ja2">
								swipeable gallery
								</div>

						</div>
						<div class="m1dum4mk dir dir-ltr">
							<div class="swipeable-gallery-m1t">
								<div class={lhsChevronStyle}>
									<button
										data-is-hidden="true"
										aria-hidden="true"
										aria-label="Previous image"
										type="button"
										class="_1d3iagv"
										onClick={scrollLeft}
									>

											<svg
												className="swipeable-gallery-lv7"
												viewBox="0 0 32 32"
												xmlns="http://www.w3.org/2000/svg"
												aria-hidden="true"
												role="presentation"
												focusable="false"
											>
												<g fill="none">
													<path d="m20 28-11.29289322-11.2928932c-.39052429-.3905243-.39052429-1.0236893 0-1.4142136l11.29289322-11.2928932"></path>
												</g>
											</svg>

									</button>
								</div>
							</div>
							<div class="swipeable-gallery-ms8">
								<div class={rhsChevronStyle}>
									<button
										aria-hidden="false"
										aria-label="Next image"
										type="button"
										class="_1d3iagv"
										onClick={scrollRight}
									>
											<svg
												className="swipeable-gallery-lv7"
												viewBox="0 0 32 32"
												xmlns="http://www.w3.org/2000/svg"

												aria-hidden="true"
												role="presentation"
												focusable="false"
											>
												<g fill="none">
													<path d="m12 4 11.2928932 11.2928932c.3905243.3905243.3905243 1.0236893 0 1.4142136l-11.2928932 11.2928932"></path>
												</g>
											</svg>
									</button>
								</div>
							</div>
						</div>
						<div class="b1tv82fw dir dir-ltr">
							<div class="bycbjmy dir dir-ltr"></div>
							<div class="balhpdq dir dir-ltr">
								<div
									aria-label="Photo 1 of 13"
									role="img"
									class="_r752or"
								>
									<div class="_szn05y">
										{dotsRender(currentPhoto)}
									</div>
								</div>
							</div>
							<div class="b18glxm4 dir dir-ltr"></div>
						</div>
					</div>
				</div>






						<div class="swipeable-gallery-cw9">
							{/* important div - gives height */}
							<div
								class="swipeable-gallery-c14"
								onScroll={onGalleryScroll}
								ref={galleryRef}
							>
							{photoArray.map((x) => (
								<div
									class="swipeable-gallery-rfe"
								>
<div className="swipeable-gallery-tz4">
<img className="swipeable-gallery-uc3" alt="alt" src={props.image} />
</div>
</div>

))
}



							</div>
						</div>




	</div>
</div>
];
