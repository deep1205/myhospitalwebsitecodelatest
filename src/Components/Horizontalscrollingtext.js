import React from 'react'
import "../css/Horizontalscrolltext.css";
import { useHistory } from 'react-router-dom';
const Horizontalscrollingtext = () => {
    const history=useHistory();
    return (
      <div>
        <div
          style={{
            backgroundColor: "orangered",
            margin: "-10px 0 20px 0",
            padding: "2px",
            
            cursor: "pointer",
          }}
          onClick={() => {
            history.push("/home");
          }}
        >
          <div class="langs">
            <ul>
              Sudeep Booked an Ambulance !! || Deepesh Booked an Ambulance !! ||
              Vaibhav Booked an Ambulance !! || Harsh Booked an Ambulance !!
              || Harish Booked an Ambulance !! ||
            </ul>
          </div>
        </div>
      </div>
    );
}

export default Horizontalscrollingtext
