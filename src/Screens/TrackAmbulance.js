import React from 'react'
import Header from "../Components/Myheader/Header";
import Activerideslist from "../Components/Googlemaps/ActiveridesList.js"
import Horizontalscrolltext from "../Components/Horizontalscrollingtext";
const TrackAmbulance = () => {
    return (
      <div>
        <Header location="track" />
        <br />
        <Horizontalscrolltext />
        
        <Activerideslist />
      </div>
    );
}

export default TrackAmbulance
