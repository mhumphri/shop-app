import React from "react";
import { useDispatch } from "react-redux";
import { updateMainModal } from "../../redux/modals/modalsSlice";
import { useParams } from "react-router-dom";
import "../css/topNav.css";

function TopNav(props) {
  // redux hook for sending data
  const dispatch = useDispatch();
  // react router hook for url params
  let params = useParams();
  let itemName = params.itemName;

  return (
    <div className="topnav-df5">
      <div className="topnav-pn1">
        <div className="topnav-po9">
          <div className="topnav-jk9">mic's portfolio</div>
          {itemName ? <button className="topnav-ly8" onClick={() => dispatch(updateMainModal(itemName))}>item info</button> : null}
        </div>
        <a className="topnav-lb9">
          <img
            alt="GitHub Logomark"
            class="topnav-ek4"
            src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
          />
        </a>
      </div>
    </div>
  );
}

export default TopNav;
