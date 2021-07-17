import React, { useState } from "react";
import { useHistory, NavLink } from "react-router-dom";
import Whyusnew from "../Components/Whychooseus";
import Header from "../Components/Myheader/Header.js";
import Button from "@material-ui/core/Button";
import { toast } from "react-toastify";
import axios from "axios";


import "../css/Login.css";
import Slideshow from "../Components/Slider"
import i2 from "../images/i2.jpg";
import i3 from "../images/i3.jpg";
import i5 from "../images/i5.jpg";
import CircularProgress from "@material-ui/core/CircularProgress";
import Fade from "@material-ui/core/Fade";
import "react-toastify/dist/ReactToastify.css";
const delay = require("delay");
const tutorialSteps = [
  {
    label: "image",
    imgPath: i2,
  },
  {
    label: "image",
    imgPath: i3,
  },

  {
    label: "image",
    imgPath: i5,
  },
];

const Login = () => {
  const history = useHistory();
  
  
  const [loading, setLoading] = React.useState(0);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  };
  const handleSubmit = (e) => {
   e.preventDefault();
    const newUser = {
      email: user.hemail,
      password: user.hpassword,
    };
    axios
      .put("https://server.prioritypulse.co.in/auth/hospisignin", newUser)

      .then(async (res) => {
        localStorage.setItem("token", res["data"]["token"]);
        localStorage.setItem("miniemail", res["data"]["hospital"]["email"]);
        //localStorage.setItem("miniemail", res["data"]["hospital"]["userType"]);

        localStorage.setItem(
          "miniShowDriverList",
          res["data"]["hospital"]["showDriverList"]
        ); //done
        localStorage.setItem(
          "miniShowHome",
          res["data"]["hospital"]["showHome"]
        ); //done
        localStorage.setItem(
          "miniShowDriverListAction",
          res["data"]["hospital"]["showDriverListAction"]
        ); //done
        localStorage.setItem(
          "miniShowMiniAcco",
          res["data"]["hospital"]["showMiniAcco"]
        ); //done
        localStorage.setItem(
          "miniShowMiniAccoActions",
          res["data"]["hospital"]["showMiniAccoActions"]
        ); //done
        localStorage.setItem(
          "miniShowMiniAccoDelete",
          res["data"]["hospital"]["showMiniAccoDelete"]
        ); //done
        localStorage.setItem(
          "miniShowPast",
          res["data"]["hospital"]["showPast"]
        ); //done
        localStorage.setItem(
          "miniShowProfile",
          res["data"]["hospital"]["showProfile"]
        ); //done
        localStorage.setItem(
          "miniShowRequest",
          res["data"]["hospital"]["showRequest"]
        ); //done
        localStorage.setItem(
          "miniShowRequestAction",
          res["data"]["hospital"]["showRequestAction"]
        ); //done
        localStorage.setItem(
          "miniShowTrack",
          res["data"]["hospital"]["showTrack"]
        ); //done

        if (res["data"]["hospital"]["userType"] == "admin") {
          localStorage.setItem("miniShowDriverList", "true"); //done
          localStorage.setItem("miniShowHome", "true"); //done
          localStorage.setItem("miniShowDriverListAction", "true"); //done
          localStorage.setItem("miniShowMiniAcco", "true"); //done
          localStorage.setItem("miniShowMiniAccoActions", "true"); //done
          localStorage.setItem("miniShowMiniAccoDelete", "true"); //done
          localStorage.setItem("miniShowPast", "true"); //done
          localStorage.setItem("miniShowProfile", "true"); //done
          localStorage.setItem("miniShowRequest", "true"); //done
          localStorage.setItem("miniShowRequestAction", "true"); //done
          localStorage.setItem("miniShowTrack", "true"); //done
        }

        // showDriverList: true
        // showDriverListAction: false
        // showHome: true
        // showMiniAcco: false
        // showMiniAccoActions: false
        // showMiniAccoDelete: false
        // showPast: false
        // showProfile: true
        // showRequest: true
        // showRequestAction: true
        // showTrack: true

        toast.success("Login Sucessfully");
        await delay(500);
        
        console.log(res);
        setLoading(0);
        document.getElementById("mybutton").style.display = "inline-block";
        history.push("/home");
      })
      .catch(async (err) => {
        await delay(500);
         setLoading(0);
         document.getElementById('mybutton').style.display='inline-block';
        console.log(err.error);
        toast.error("Invalid Credentials");
        console.log(`Invalid Details`);
     
      });
  };

  
  const handleClickbutton=()=>{
    setLoading(1);
  }
 


  return (
    <>
      <Header location="profile" />
      <div class=" fadeInDown">
        <div className="login-page" style={{ position: "relative" }}>
          <div className="form">
            <div className="login">
              <div className="login-header">
                <h1
                  style={{ margin: "-10px", fontWeight: "bolder" }}
                  id="myformheadertextl"
                >
                  Sign in
                </h1>
                <div
                  style={{ marginTop: "28px", fontWeight: "bold" }}
                  id="myformheadertext1l"
                >
                  <p>Welcome to Priority Pulse</p>
                  <p style={{ marginTop: "-14px" }}>Your Pulse,Our Priority</p>
                </div>
              </div>
            </div>
            <form className="login-form" method="PUT" onSubmit={handleSubmit}>
              <input
                name="hemail"
                type="text"
                placeholder="Email"
                autoComplete="on"
                onChange={handleInputs}
              />
              <input
                name="hpassword"
                type="password"
                placeholder="password"
                onChange={handleInputs}
              />
              <div>
                <Fade
                  in={loading}
                  style={{
                    transitionDelay: !loading ? "800ms" : "0ms",
                  }}
                  unmountOnExit
                >
                  <CircularProgress  fontSize="small" />
                  
                    
                  
                </Fade>
              </div>
             
              
                
                   <Button
                   id="mybutton"
                  name="signin"
                  onClick={handleClickbutton}
                  variant="contained"
                  type="submit"
                >
                {loading ? document.getElementById('mybutton').style.display='none':"Sign in"}
                </Button>

                
              
               
            
            </form>
          </div>
        </div>

        <Slideshow tutorialSteps={tutorialSteps} />
      </div>
      <div style={{ position: "relative", marginTop: "100px" }}>
        <Whyusnew />
      </div>
    </>
  );
};

export default Login;
