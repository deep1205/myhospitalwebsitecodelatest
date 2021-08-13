import React, { useState, useEffect } from "react";
import Header from "../Components/Myheader/Header";
import DriversList from "../Components/Profile/DriversList";
import MiniAccounts from "../Components/Profile/MiniAccounts";
import RequestedDrivers from "../Components/Profile/RequestedDrivers";
//import { Container, Row, Col } from 'reactstrap';
import "../css/profile.css"
import Grid from "@material-ui/core/Grid";
import axios from "axios";

const DriverProfile = () => {
  const [hos, setHos] = useState("");
  const [hosName, setHosName] = useState("");

  axios
    .get("https://server.prioritypulse.co.in/hosp", {
      headers: { Authorization: localStorage.getItem("token") },
    })
    .then((res) => {
      console.log(res);
      console.log(res.data.hospital.city);
      setHos(res.data.hospital.code);
      setHosName(res.data.hospital.name);
    })
    .catch((err) => {
      console.log(err);
    });

  console.log(hos);

  var a = 0;
  if (localStorage.getItem("miniShowMiniAcco") === "true") {
    a++;
  }
  console.log(a);
  if (localStorage.getItem("miniShowDriverList") === "true") {
    a++;
  }
  console.log(a);
  if (localStorage.getItem("miniShowRequest") === "true") {
    a++;
  }
  console.log(a);
  return (
    <div>
      <Header location="profile" />
      <div className="driverprofile">
        <div className="profilehosp">
          <h4>
            {hosName} ({hos})
          </h4>
        </div>
        <Grid container spacing={3}>
          {localStorage.getItem("miniShowRequest") === "true" ? (
            <Grid
              item
              xs
              sm={12}
              md={12 / a}
              lg={12 / a}
              className="profilecoumn"
            >
              <RequestedDrivers />
            </Grid>
          ) : null}
          {localStorage.getItem("miniShowDriverList") === "true" ? (
            <Grid
              item
              xs
              sm={12}
              md={12 / a}
              lg={12 / a}
              className="profilecoumn"
            >
              <DriversList />
            </Grid>
          ) : null}
          {localStorage.getItem("miniShowMiniAcco") === "true" ? (
            <Grid
              item
              xs
              sm={12}
              md={12 / a}
              lg={12 / a}
              className="profilecoumn"
            >
              <MiniAccounts />
            </Grid>
          ) : null}
        </Grid>
      </div>
    </div>
  );
};

export default DriverProfile;
