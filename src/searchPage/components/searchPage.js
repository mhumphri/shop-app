import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../header/components/header";
import ProductSearch from "./productSearch";
import "../styles/searchPage.css";


function SearchPage() {

  // viewport width (stored in redux)
  const screenWidth = useSelector((state) => state.deviceData.screenWidth);


  if (screenWidth < 900) {
    return (
      <div className="search-page-zu4">
      <Header largeView={true} noBasket={true} />
      <main className="search-page-tr2">
<ProductSearch />
       </main>
    </div>
    );
  } else {
    return (
      <div className="search-page-zu4">
      <Header largeView={true} />
      <main className="search-page-tr2">
<ProductSearch largeView={true} />
       </main>
        </div>
    );

  }




}

export default SearchPage;
