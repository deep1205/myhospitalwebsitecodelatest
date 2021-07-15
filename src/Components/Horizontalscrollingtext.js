import React from 'react'
import "../css/Horizontalscrolltext.css";
import { useHistory } from 'react-router-dom';
const Horizontalscrollingtext = () => {
    const history=useHistory();
    return (
      <div>
        <div
          style={{
            backgroundColor: "	#FFE4B5",
            margin: "-10px 0 20px 0",
            padding: "3px 0",
            cursor: "pointer",
          }}
          onClick={() => {
            history.push("/home");
          }}
        >
          <div className="langs">
            <span>Harish Booked an Ambulance,Allot Driver!!</span>
          </div>
        </div>
      </div>
    );
}

export default Horizontalscrollingtext
