import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import {
  updateScreenDimensions,
  updateTouchScreen,
} from "./redux/deviceData/deviceDataSlice";
import SearchPage from "./searchPage/components/searchPage";
import ProductPage from "./productPage/components/productPage";
import Basket from "./basket/components/basket";
import AddressForm from "./checkout/components/addressForm";
import PaymentForm from "./checkout/components/paymentForm";


function App() {
  const dispatch = useDispatch();

  // main modal state (stored in redux)
  const mainModal = useSelector((state) => state.modals.mainModal);

  // listens for screen resize and updates screen width variable in redux
  useEffect(() => {
    // stores current screenwidth in redux
    const updateScreenWidth = () => {
      dispatch(
        updateScreenDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        })
      );
    };
    updateScreenWidth();
    // detect if a "coarse pointer" - usually a touch screen - is the primary input device and stores touchScreen boolean in redux
    dispatch(updateTouchScreen(window.matchMedia("(pointer: coarse)").matches));
    window.addEventListener("resize", () => {
      updateScreenWidth();
    });
    return () => {
      window.removeEventListener("resize", () => {
        updateScreenWidth();
      });
    };
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <SearchPage />
            </>
          }
        />
        <Route
          path="/product/:productID"
          element={<ProductPage />}
        />
        <Route
               path="/basket"
               element={<Basket />}
             />
             <Route
               path="/address-form"
               element={<AddressForm />}
             />
        <Route
               path="/payment-form"
               element={<PaymentForm />}
             />
      </Routes>
    </Router>
  );
}

export default App;
