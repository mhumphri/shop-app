import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../header/components/header";
import ProductSearch from "./productSearch";


function SearchPage() {

  // viewport width (stored in redux)
  const screenWidth = useSelector((state) => state.deviceData.screenWidth);


  if (screenWidth < 900) {
    return (
      <>
      <Header largeView={true} noBasket={true} />
      <ProductSearch />
      </>
    );
  } else {
    return (
      <>
      <Header largeView={true} />
      <ProductSearch largeView={true}/>
      </>
    );

  }




}

export default SearchPage;
