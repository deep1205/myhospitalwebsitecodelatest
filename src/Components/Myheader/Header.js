import React, { useState } from "react";
import "../../css/Header.css"
import {Link} from "react-router-dom"
// import { useHistory } from 'react-router'
import logo from "../../images/PP_logo_yellow.png";
import MenuIcon from "@material-ui/icons/Menu";
import ClearIcon from "@material-ui/icons/Clear";
import { ToastContainer} from "react-toastify";
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
            <Link to="/home">Home</Link>
          ) : (
            <Link style={{ visibility: "hidden" }} to="/home">
              Home
            </Link>
          )}

          {localStorage.getItem("token") !== null ? (
            <Link to="/track">TrackAmbulance</Link>
          ) : (
            <Link style={{ visibility: "hidden" }} to="/track">
              TrackAmbulance
            </Link>
          )}
          {localStorage.getItem("token") !== null ? (
            <Link to="/pastride">PastRide</Link>
          ) : (
            <Link style={{ visibility: "hidden" }} to="/pastride">
              Pastride
            </Link>
          )}

          {localStorage.getItem("token") !== null ? (
            <Link to="/profile">Profile</Link>
          ) : (
            <Link  to="/login">
              Login
            </Link>
          )}

          {localStorage.getItem("token") !== null ? (
            <Link
              to="/login"
              onClick={() => {
                localStorage.removeItem("token");
                
              }}
              style={{ cursor: "pointer", color: "white" }}
            >
              Logout
            </Link>
          ) : (
            <Link to="/signup">Signup</Link>
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
