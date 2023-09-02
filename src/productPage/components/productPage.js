import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Header from "../../header/components/header";
// import Footer from "../../footer/components/footer";
import ImageGallery from "./imageGallery";
import ProductSummary from "./productSummary";
import ProductOptions from "./productOptions";
import ProductDescription from "./productDescription";
import ProductSpecs from "./productSpecs";
import BasketModal from "../../modals/components/basketModal";
import "../styles/productPage.css";
import PageLifter1 from "../../images/page-lifter-1.jpg";

const imageArray = [
  PageLifter1,
  PageLifter1,
  PageLifter1,
  PageLifter1,
  PageLifter1,
];

const productObject = {
  summary:
    "Star mark stickers in dots and squares for planners and journals, matte transparent functional stickers, icon stickers, multi colours, UK",
  description: [
    "Star mark stickers in dots and squares for planners and journals, matte transparent functional stickers, icon stickers, multi colours, UK",
    "Star mark stickers in dots and squares for planners and journals, matte transparent functional stickers, icon stickers, multi colours, UK",
    "Star mark stickers in dots and squares for planners and journals, matte transparent functional stickers, icon stickers, multi colours, UK",
  ],
  sizeGuide: [
    { label: "Small size", height: 105, width: 150 },
    { label: "Medium size", height: 105, width: 150 },
    { label: "Large size", height: 105, width: 150 },
  ],
  specs: [
    "hghghg mnmnmn mnmnm hkhkhkh",
    "hghgh popopo iuiuiuiu",
    "hghghg mnmnmn mnmnm hkhkhkh",
    "hghgh popopo iuiuiuiu",
    "hghghg mnmnmn mnmnm hkhkhkh",
    "hghgh popopo iuiuiuiu",
  ],
};

function ProductPage(props) {
  // viewport width (stored in redux)
  const screenWidth = useSelector((state) => state.deviceData.screenWidth);

  const [basketModalActive, setBasketModalActive] = useState();

    return (
      <>
      {screenWidth < 650 ?

      (  <div className="search-page-zu4">
        <Header largeView={true} />
        <main className="shop-app-tv2">
          <ImageGallery images={imageArray} />
          <div className="shop-app-te2">
            <ProductSummary />
            <ProductOptions setBasketModalActive={setBasketModalActive}  />
            <ProductSpecs productObject={productObject} />
            <ProductDescription productObject={productObject} />
          </div>
        </main>
      {/*   <Footer /> */}
      </div>
  ):
      (  <div className="search-page-zu4">
        <Header productPage={true} largeView={true} />
        <main className="shop-app-te2">
          <ImageGallery largeView={true} images={imageArray} />
          <div className="product-page-rt3">
            <div className="product-page-io7"><ProductSummary /><ProductSpecs productObject={productObject} /><ProductDescription productObject={productObject} /></div>
            <div className="product-page-io8"><ProductOptions largeView={true} setBasketModalActive={setBasketModalActive} /></div>
          </div>
        </main>
        {/*  <Footer productPage={true} /> */}

      </div>)
    }
    { basketModalActive ?
    <BasketModal setBasketModalActive={setBasketModalActive} /> : null
    }
    </>

)
}

export default ProductPage;
