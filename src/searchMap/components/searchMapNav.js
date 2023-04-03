import React, { useState, useEffect, useRef } from "react";

import "../css/searchMapNav.css";

//

function SearchMapNav(props) {

  const [activeSearch, setActiveSearch] = React.useState();
  const [fullCountryArray, setFullCountryArray] = React.useState([]);

    const [countryInput, setCountryInput] = React.useState("");
    const [countryInputStored, setCountryInputStored] = React.useState("");

const searchbarRef = useRef(null);



  useEffect(() => {

    const handleClickOutside = (event) => {
        if (searchbarRef.current && !searchbarRef.current.contains(event.target)) {
            setActiveSearch(false);
            if (countryInput!==countryInputStored) {
              setCountryInput(countryInputStored)
            }
        }
    };

      document.addEventListener('click', handleClickOutside, true);
      return () => {
          document.removeEventListener('click', handleClickOutside, true);
      };
  });

  const selectCountry = (newCountry) => {
    setCountryInput(newCountry)
    setCountryInputStored(newCountry)
    setActiveSearch(false)

  }

  const countrySearch = () => {
    setActiveSearch("country")
    setCountryInput("")
  }




  const onChangeHandler = event => {
    const newInputValue = event.target.value
     setCountryInput(newInputValue);

  };

  const calcActiveCountryArray = () => {
    let activeCountries = []
    for (let i=0; i<fullCountryArray.length; i++) {
      const inputLowerCase = countryInput.toLowerCase()
      const countryNameFragment = fullCountryArray[i].substring(0, inputLowerCase.length).toLowerCase();
      if (inputLowerCase===countryNameFragment) {
        activeCountries.push(fullCountryArray[i])
      }
      if (activeCountries.length>4) {
        break;
      }
    }
    return activeCountries
  }

  const [activeCountryArray, setActiveCountryArray] = React.useState(calcActiveCountryArray());


  useEffect(() => {
    setActiveCountryArray(calcActiveCountryArray())
  }, [countryInput]);






  return (

    <div class="h1vnkd0i dir dir-ltr">
nav
    </div>


  )


}

export default SearchMapNav;
