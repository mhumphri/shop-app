import PortfolioItem from "./portfolioItem";
import SwipeableGallery from "../../swipeableGallery/components/swipeableGallery";
// array of data - each element contains data for a single portfolio item
import itemArray from "../../data/itemArray";
import rangeSliderImg from "../images/rangeSlider.png";
import hotelAppImg from "../images/hotelApp.jpg";
import "../css/portfolioList.css";

// renders list of individual portfolio items in a grid

function PortfoiloList() {
  return (
    <main className="portfoliolist-yu1">
      <div className="portfoliolist-ap7">
        <div className="portfoliolist-pp6">
        <PortfolioItem name="hotel app" lightBackground={true} image={hotelAppImg} href="/search-map" modal="searchMap" />
            <PortfolioItem name="range sliders" image={rangeSliderImg} href="/range-slider" modal="rangeSlider" />
            <SwipeableGallery />

        </div>
      </div>
    </main>
  );
}

export default PortfoiloList;
