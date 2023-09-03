import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../header/components/header";
import ProductSearch from "./productSearch";
import "../styles/searchPage.css";


function SearchPage() {

  const [data, setData] = useState({ hits: [] });

  // viewport width (stored in redux)
  const screenWidth = useSelector((state) => state.deviceData.screenWidth);



useEffect(() => {

fetch("http://shop-app-server.eba-cy2rpvvf.eu-north-1.elasticbeanstalk.com/users/")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    return response.json();
  })
  .then((result) => {
    setData(result)
    console.log("SuccessXYZ:", result);
  })
  .catch((error) => {
    console.error("Error:", error);
  });


}, []);


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
