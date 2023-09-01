import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../header/components/header";
import Footer from "../../footer/components/footer";


function SearchPage() {

  return (
    <>
    <Header largeView={true} noBasket={true} />
    <Footer />
    </>
  )

}

export default SearchPage;
