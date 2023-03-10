import React from "react";
import { useDispatch } from "react-redux";
import { updateMainModal } from "../../redux/modals/modalsSlice";
import { useParams } from "react-router-dom";
import "../css/topNav.css";

// renders header and nav for site -  layout can be set using itemName url parameter and is reposnive to screen size (CSS)

function TopNav(props) {
  // redux hook for dispatching data
  const dispatch = useDispatch();

  // set itemName url parameter as variable
  let params = useParams();
  let itemName = params.itemName;

  return (
    <header className="topnav-df5">
      <nav className="topnav-pn1">
        <div className="topnav-po9">
          <div className="topnav-jk9">mic's portfolio</div>
          {/* display "item info" button if item-name url parameter is set */}
          {itemName ? (
            <button
              className="topnav-ly8"
              onClick={() => dispatch(updateMainModal(itemName))}
            >
              item info
            </button>
          ) : null}
        </div>
        {/* display github image and link if no item-name url parameter is set */}
        {itemName ? null : (
          <a className="topnav-lb9">
            <img
              alt="GitHub Logomark"
              class="topnav-ek4"
              src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
            />
          </a>
        )}
      </nav>
    </header>
  );
}

export default TopNav;
