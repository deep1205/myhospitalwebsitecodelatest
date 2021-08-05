import React,{useState,useContext,useEffect} from 'react'
import "../css/Horizontalscrolltext.css";
import { useHistory } from 'react-router-dom';
import { AppContext } from '../AppContext';

const Horizontalscrollingtext = () => {
    const {notificationData,AssignData}=useContext(AppContext)
    const [notification,setNotification]=notificationData
    const [bookedData,setBookedData]=AssignData

    const [rideRequest,setRideRequest]=useState([])

    useEffect(()=>{
      setRideRequest(notification.filter(not=>not['messageType']==='ride' && not['rideData']))
      // console.log(rideRequest)
    },[notification])

    const handleClick=(rideData)=>{
      setBookedData({
        name:rideData.name,
        pcase:rideData.pcase,
        age:rideData.age,
        guardianNo:rideData.guardianNo,
        casePrior:rideData.casePrior,
        pickUplocation:rideData.pickUplocation
      })
      console.log(rideData)
    }
    const history=useHistory();
    return (
      <div>
        <div
          style={{
            backgroundColor: "#ffa95bd9",
            margin: "-10px 0 20px 0",
            padding: "3px 0",
            cursor: "pointer",
          }}
          onClick={() => {
            history.push("/home");
          }}
        >
          <div className="langs">
            {
              rideRequest.map((ride)=>{
                return (
                  <span onClick={()=>handleClick(ride['rideData'])} style={{textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{ride['rideData'].name} Booked an Ambulance,Allot Driver!! &#160;  </span>
                )
              })
            }
          </div>
        </div>
      </div>
    );
}

export default Horizontalscrollingtext
