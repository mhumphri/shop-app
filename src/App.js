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
import Footer from "./footer/components/footer";


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
              <Footer />
            </>
          }
        />
       <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
