import React, { useState } from "react";
import "../../css/Header.css"
import {Link} from "react-router-dom"
// import { useHistory } from 'react-router'
import logo from "../../images/PP_logo_yellow.png";
import MenuIcon from "@material-ui/icons/Menu";
import ClearIcon from "@material-ui/icons/Clear";
import { ToastContainer} from "react-toastify";
import ExitToAppTwoToneIcon from "@material-ui/icons/ExitToAppTwoTone";
import "react-toastify/dist/ReactToastify.css";
function Navbar({ location }) {
  const [icons, seticons] = useState(false);
  const [classna, setclassna] = useState("slider");
  return (
    <>
      <ToastContainer
        className="white text-center text-capitalize"
        hideProgressBar
        autoClose={1000}
        position="top-center"
        closeOnClick
        draggable
        margin-top="-50px"
        zIndex="9999999"
      />

      <div className="navbar">
        <img className="navbar_logo" src={logo} alt="logo" />
        <div
          className="menu-toggle"
          onClick={() => {
            var bola = !icons;
            seticons(!icons);
            if (bola === false) {
              setclassna("mid");
              setTimeout(() => {
                setclassna(bola ? "active" : "slider");
              }, 1000);
            } else {
              setclassna(bola ? "active" : "slider");
            }
          }}
        >
          {!icons ? (
            <div className="myiconposition">
              <MenuIcon style={{ fontSize: "30px", color: "white" }} />
            </div>
          ) : (
            <div className="mycloseiconposition">
              <ClearIcon style={{ fontSize: "30px", color: "white" }} />
            </div>
          )}
        </div>
        <nav className={classna}>
          {localStorage.getItem("token") !== null ? (
            <a href="/home">Home</a>
          ) : (
            <a style={{ visibility: "hidden" }} href="/home">
              Home
            </a>
          )}

          {localStorage.getItem("token") !== null ? (
            <a href="/track">TrackAmbulance</a>
          ) : (
            <a style={{ visibility: "hidden" }} href="/track">
              TrackAmbulance
            </a>
          )}
          {localStorage.getItem("token") !== null ? (
            <a href="/pastride">PastRide</a>
          ) : (
            <a style={{ visibility: "hidden" }} href="/pastride">
              Pastride
            </a>
          )}

          {localStorage.getItem("token") !== null ? (
            <a href="/profile">Profile</a>
          ) : (
            <a href="/login">Login</a>
          )}

          {localStorage.getItem("token") !== null ? (
            <a
              href="/login"
              onClick={() => {
                localStorage.removeItem("token");
              }}
              style={{ cursor: "pointer", color: "white" }}
            >
              
              
                {<ExitToAppTwoToneIcon
                  id="signout"
                  value="signout"
                  fontSize="large"
                />}
             
            </a>
          ) : (
            <a href="/signup">Signup</a>
          )}

          {location === "home" && <div className="animation start-home" />}
          {location === "track" && <div className="animation start-user" />}
          {location === "pastride" && (
            <div className="animation start-hospital" />
          )}
          {location === "profile" && (
            <div className="animation start-aboutus" />
          )}
          {location === "login" && (
            <div className="animation start-collaborate" />
          )}
        </nav>
        <div className="clearfix"></div>
      </div>
    </>
  );
}

export default Navbar;
