import React from "react";
import Header from "../Components/Myheader/Header";
import DriversList from "../Components/Profile/DriversList";
import MiniAccounts from "../Components/Profile/MiniAccounts";
import RequestedDrivers from "../Components/Profile/RequestedDrivers";
import "../css/Profile.css";
import Grid from "@material-ui/core/Grid";
import Horizontalscrolltext from "../Components/Horizontalscrollingtext";
const DriverProfile = () => {
  return (
    <div>
      <Header location="profile" />
      <br />
      <Horizontalscrolltext />
      <div className="driverprofile">
        <Grid container spacing={3}>
          <Grid item xs sm={12} md={4} lg={4} className="profilecoumn">
            <RequestedDrivers />
          </Grid>
          <Grid item xs sm={12} md={4} lg={4} className="profilecoumn">
            <DriversList />
          </Grid>
          <Grid item xs sm={12} md={4} lg={4} className="profilecoumn">
            <MiniAccounts />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default DriverProfile;
