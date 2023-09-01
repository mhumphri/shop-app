import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import CurrencyButton from "../../widgets/components/currencyButton";
// import BasketButton from "../../widgets/components/basketButton";
import "../styles/header.css";

function Header(props) {


    return (
        <header className={props.largeView ? "header-hw5 static" : "header-hw5" }>
        <div className={props.productPage ? "header-ws1 narrow" : "header-ws1" }>
          <Link to="/" className="header-zp3">
            <svg
              width="30px"
              height="30px"
              viewBox="0 0 1024 1024"
              class="icon"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M511.6802 511.64822m-511.6802 0a511.6802 511.6802 0 1 0 1023.3604 0 511.6802 511.6802 0 1 0-1023.3604 0Z"
                fill="#222"
              />
              <path
                d="M511.6802 63.928045c-247.269457 0-447.720175 200.450718-447.720175 447.720175s200.450718 447.720175 447.720175 447.720175 447.720175-200.450718 447.720175-447.720175-200.450718-447.720175-447.720175-447.720175z m31.980012 63.960025c95.940037-31.980012 191.880075 0 223.860088 95.940037l-223.860088 223.860088v-319.800125z m-63.960025 319.800125l-223.860087-223.860088c31.980012-95.940037 127.92005-127.92005 223.860087-95.940037v319.800125z m0.991381 451.110056C383.76015 927.388382 287.820112 895.40837 255.8401 799.468332l223.860087-223.860087 0.991381 323.190006zM543.660212 575.608245l223.860088 223.860087c-31.980012 95.940037-127.92005 127.92005-223.860088 95.940038v-319.800125z m31.980013-31.980013h319.800125c31.980012 95.940037 0 191.880075-95.940038 223.860088l-223.860087-223.860088z m0-63.960025l223.860087-223.860087c95.940037 31.980012 127.92005 127.92005 95.940038 223.860087H575.640225z m-351.780138-223.860087l223.860088 223.860087H129.551031c-33.610993-95.940037-1.630981-191.880075 94.309056-223.860087z m-94.309056 287.820112H447.720175l-223.860088 223.860088c-95.940037-31.980012-127.92005-127.92005-94.309056-223.860088z"
                fill="#FFFFFF"
              />
              <path
                d="M399.750156 271.798126m-15.990006 0a15.990006 15.990006 0 1 0 31.980012 0 15.990006 15.990006 0 1 0-31.980012 0Z"
                fill="#FFFFFF"
              />
              <path
                d="M431.730169 175.858089m-15.990007 0a15.990006 15.990006 0 1 0 31.980013 0 15.990006 15.990006 0 1 0-31.980013 0Z"
                fill="#FFFFFF"
              />
              <path
                d="M623.610244 239.818114m-15.990007 0a15.990006 15.990006 0 1 0 31.980013 0 15.990006 15.990006 0 1 0-31.980013 0Z"
                fill="#FFFFFF"
              />
              <path
                d="M815.490319 335.758151m-15.990007 0a15.990006 15.990006 0 1 0 31.980013 0 15.990006 15.990006 0 1 0-31.980013 0Z"
                fill="#FFFFFF"
              />
              <path
                d="M687.570269 431.698189m-15.990007 0a15.990006 15.990006 0 1 0 31.980013 0 15.990006 15.990006 0 1 0-31.980013 0Z"
                fill="#FFFFFF"
              />
              <path
                d="M719.550281 591.598251m-15.990006 0a15.990006 15.990006 0 1 0 31.980012 0 15.990006 15.990006 0 1 0-31.980012 0Z"
                fill="#FFFFFF"
              />
              <path
                d="M815.490319 623.578264m-15.990007 0a15.990006 15.990006 0 1 0 31.980013 0 15.990006 15.990006 0 1 0-31.980013 0Z"
                fill="#FFFFFF"
              />
              <path
                d="M655.590256 783.478326m-15.990006 0a15.990006 15.990006 0 1 0 31.980012 0 15.990006 15.990006 0 1 0-31.980012 0Z"
                fill="#FFFFFF"
              />
              <path
                d="M431.730169 719.518301m-15.990007 0a15.990006 15.990006 0 1 0 31.980013 0 15.990006 15.990006 0 1 0-31.980013 0Z"
                fill="#FFFFFF"
              />
              <path
                d="M335.790131 783.478326m-15.990006 0a15.990006 15.990006 0 1 0 31.980012 0 15.990006 15.990006 0 1 0-31.980012 0Z"
                fill="#FFFFFF"
              />
              <path
                d="M271.830106 623.578264m-15.990006 0a15.990006 15.990006 0 1 0 31.980012 0 15.990006 15.990006 0 1 0-31.980012 0Z"
                fill="#FFFFFF"
              />
              <path
                d="M207.870081 431.698189m-15.990006 0a15.990006 15.990006 0 1 0 31.980012 0 15.990006 15.990006 0 1 0-31.980012 0Z"
                fill="#FFFFFF"
              />
            </svg>
            <span className="header-oy7">Kaidama Creations V</span>
          </Link>
          <div className="header-pw1">
          {/*  <CurrencyButton />
          {props.noBasket? null : <BasketButton />}
          */}
          </div>
          </div>
        </header>
    );

}

export default Header;
