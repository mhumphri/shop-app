import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../header/components/header";


function SearchPage() {

  return (
    <Header largeView={true} noBasket={true} />
  )

}

export default SearchPage;
