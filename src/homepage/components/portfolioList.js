import PortfolioItem from "./portfolioItem";
import SwipeableGallery from "../../swipeableGallery/components/swipeableGallery";
// array of data - each element contains data for a single portfolio item
import itemArray from "../../data/itemArray";
import rangeSliderImg from "../images/rangeSlider.png";
import "../css/portfolioList.css";

// renders list of individual portfolio items in a grid

function PortfoiloList() {
  return (
    <div className="portfoliolist-yu1">
      <div className="portfoliolist-ap7">
        <div className="portfoliolist-pp6">
            <PortfolioItem name="range slider" image={rangeSliderImg} href="/range-slider" modal="rangeSlider" />
            <SwipeableGallery image={itemArray[1].image}  />
            <PortfolioItem name="search map" image={rangeSliderImg} href="/search-map" modal="searchMap" />
            <PortfolioItem name="range slider" image={rangeSliderImg} href="/range-slider" modal="rangeSlider" />
            <SwipeableGallery image={itemArray[1].image}  />
            <PortfolioItem name="search map" image={rangeSliderImg} href="/search-map" modal="searchMap" />
            <PortfolioItem name="range slider" image={rangeSliderImg} href="/range-slider" modal="rangeSlider" />
            <SwipeableGallery image={itemArray[1].image}  />
            <PortfolioItem name="search map" image={rangeSliderImg} href="/search-map" modal="searchMap" />

            <PortfolioItem name="range slider" image={rangeSliderImg} href="/range-slider" modal="rangeSlider" />
            <SwipeableGallery image={itemArray[1].image}  />
            <PortfolioItem name="search map" image={rangeSliderImg} href="/search-map" modal="searchMap" />
            <PortfolioItem name="range slider" image={rangeSliderImg} href="/range-slider" modal="rangeSlider" />
            <SwipeableGallery image={itemArray[1].image}  />
            <PortfolioItem name="search map" image={rangeSliderImg} href="/search-map" modal="searchMap" />
            <PortfolioItem name="range slider" image={rangeSliderImg} href="/range-slider" modal="rangeSlider" />
            <SwipeableGallery image={itemArray[1].image}  />
            <PortfolioItem name="search map" image={rangeSliderImg} href="/search-map" modal="searchMap" />
            <PortfolioItem name="range slider" image={rangeSliderImg} href="/range-slider" modal="rangeSlider" />
            <SwipeableGallery image={itemArray[1].image}  />
            <PortfolioItem name="search map" image={rangeSliderImg} href="/search-map" modal="searchMap" />
        </div>
      </div>
    </div>
  );
}

export default PortfoiloList;
