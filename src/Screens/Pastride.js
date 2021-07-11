import React from 'react'
import Header from "../Components/Myheader/Header";
import Pastrideslist from "../Components/Googlemaps/PastridesList"
import Horizontalscrolltext from "../Components/Horizontalscrollingtext";
const Pastride = () => {
    return (
      <div>
        <Header location="pastride" />
        <br />
        <Horizontalscrolltext />
        <Pastrideslist />
      </div>
    );
}

export default Pastride
