import React, { useState, useEffect, useRef } from "react";
import crossButton from "./crossButton";
import countryPolygons from "../data/countryPolygons.json";
import "../css/searchMapNav.css";

//

function SearchMapNav(props) {

  const [activeSearch, setActiveSearch] = React.useState();
  const [fullCountryArray, setFullCountryArray] = React.useState([]);

    const [countryInput, setCountryInput] = React.useState("");
    const [countryInputStored, setCountryInputStored] = React.useState("");

const searchbarRef = useRef(null);


const onChangeHandler = () => {

}

const countrySearch = () => {

}

const selectCountry = () => {

}










  const [activeCountryArray, setActiveCountryArray] = React.useState([]);









  return (

    <div class="h1vnkd0i dir dir-ltr">
      <div class="c1yo0219 dir dir-ltr">
        <div>
          <div>


            <div class="c1kn6kxw dir dir-ltr">
              <header
                class="c1kffd0v cxy853f dir dir-ltr"
              >
              
              </header>
            </div>
          </div>
        </div>
      </div>
    </div>


  )


}

export default SearchMapNav;
