import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../header/components/header";
import ProductSearch from "./productSearch";


function SearchPage() {

  return (
    <>
    <Header largeView={true} noBasket={true} />
    <ProductSearch />
    </>
  )

}

export default SearchPage;
