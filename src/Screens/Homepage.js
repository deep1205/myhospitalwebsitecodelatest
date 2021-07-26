import React, {
  useState,
  useEffect,
  createRef,
  useContext,
  useRef,
} from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Fade from "@material-ui/core/Fade";
import { useHistory } from "react-router-dom";
import Header from "../Components/Myheader/Header";
import Button from "@material-ui/core/Button";
import { toast } from "react-toastify";
import MyGoogleMap from "../Components/Googlemaps/HomepageGoogleMaps";
import "../css/HomePage.css";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Horizontalscrolltext from "../Components/Horizontalscrollingtext"
import { AppContext } from "../AppContext";
const delay = require("delay");

const Homepage = (props) => {
  let btnref = useRef();
  const history=useHistory();
  const [loading, setLoading] = React.useState(0);
 
  const {AssignData}=useContext(AppContext)
  const [bookedData,setBookedData]=AssignData

  const map = createRef();
  const [drivers, setDriver] = useState([]);
  const [guardianCoordinates, setguardianCoordinates] = useState([]);
  const setaddressCoordinates = (coords) => {
    setguardianCoordinates(coords);
  };
  useEffect(() => {
    axios
      .get("https://server.prioritypulse.co.in/hosp/hospitalActiveDriver", {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((res) => {
        console.log(res.data);
        res.data.map((data) => {
          setDriver(res.data);
        });
        // setDriver([...drivers, { name: data.name, id: data._id }])
      })
      .catch((err) => {
        
        console.log(err);
      });

    axios
      .get("https://server.prioritypulse.co.in/hosp/getUsers", {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((res) => {
        console.log(res.data);
        setphone(res.data);
      });
  }, []);

  const [phone, setphone] = useState([
    {
      location: {
        coordinates: [],
      },
      _id: "",

      phoneNumber: 0,
      __v: 0,
    },
  ]);

  const [user, setUser] = useState({
    name: "",
    pcase: "",
    age: "",
    // patientNo: "",
    guardianNo: "",
    casePrior: "",
    pickedBy: {
      name:'',
      _id:''
    },
    pickUplocation: {
      coordinates: [],
    },
  });
  let name, value;
  const [guardian, setGuardian] = useState({});
  const selectDriver = (e) => {
    for (var i = 0; i < phone.length; ++i) {
      if (e.target.value === phone[i].phoneNumber) {
        if (phone[i].location.coordinates.length === 0) {
          toast.warn("Address Not Available");
        } else {
          setGuardian(phone[i]);
          console.log(phone[i]);
          console.log(phone[i].location.coordinates.length);
          setaddressCoordinates(phone[i].location.coordinates);
        }
      }
    }
  };
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    if (name === "pickedBy") {
      let n = drivers.findIndex((re) => {
        return re.name === value;
      });
      // console.log(n);
      if (n === -1) {
        setUser({ ...user, [name]: "none" });
      } else {
        setUser({ ...user, [name]: drivers[n] });
      }
    } else {
      console.log(value);
      setUser({ ...user, [name]: value });
      if (name === "guardianNo") {
        selectDriver(e);
      }
    }
  };

  useEffect(()=>{
    if(Object.keys(bookedData).length!==0){
      setUser({
        name:bookedData.name,
        pcase:bookedData.pcase,
        age:bookedData.age,
        guardianNo:bookedData.guardianNo,
        casePrior:bookedData.casePrior,
        pickedBy:bookedData.pickedBy?bookedData.pickedBy:{},
        pickUplocation:bookedData.pickUplocation
      })
      // if(bookedData['pickUplocation'])
      setaddressCoordinates(bookedData['pickUplocation'].coordinates)
    }
  },[bookedData])
  
  const handleSubmit = (e) => {
     setLoading(1);
    e.preventDefault();
    const newUser = {
        name: user.name,
        pcase: user.pcase,
        age: user.age,
        // patientNo: Number(user.patientNo),
        guardianNo: Number(user.guardianNo),
        casePrior: user.casePrior,
        pickedBy: user.pickedBy._id,
        pickUplocation: {
          // coordinates: guardian.location?[guardian.location.coordinates[0],guardian.location.coordinates[1]]
          // :[guardianCoordinates[0],guardianCoordinates[1]],
          coordinates: [guardianCoordinates[0], guardianCoordinates[1]],
        },
    } 
    
    console.log(user.guardianNo);
    axios
      .post("https://server.prioritypulse.co.in/hosp/createRide", newUser, {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then(async (res) => {
        toast.success("Form Submitted Sucessfully");
        await delay(500);
        console.log("Form Submitted SuccessFully");
        
          
            window.location.reload();
              setLoading(0);
              document.getElementById("mybutton").style.display =
                "inline-block";
        console.log(res);
      })
      .catch(async (err) => {
         await delay(500);
         setLoading(0);
         document.getElementById("mybutton").style.display = "inline-block";
        console.log(err.status);
        console.log(err.error);
        toast.error("Please fill Form correctly");
        console.log(`Please Fill form Correctly`);
        
      });
  };

  const sendlocationdata = () => {
    toast.warn("Location send Successfully");
  };
  
  return (
    <>
      <Header location="home" />

      <br />

      <div class="fadeInDown">
        <div style={{ margin: "-10px 0 20px 0px" }}>
          <Horizontalscrolltext />
        </div>

        <div
          id="googlemaphomepagekiposition"
          className="main-wrapper"
          style={{ order: "2" }}
        >
          <MyGoogleMap
            ref={map}
            myusers={guardian}
            setaddressCoordinates={setaddressCoordinates}
            guardianCoordinates={guardianCoordinates}
          />
        </div>
        <Button
          id="locationsendbutton"
          variant="contained"
          color="secondary"
          size="normal"
          onClick={sendlocationdata}
        >
          Send location
        </Button>
        <div style={{ order: "1", margin: " 0" }}>
          <div className="loginp-page">
            <div className="formp">
              <div className="loginp">
                <div className="loginp-header">
                  <p id="myformheadertextp">Patient Form</p>
                  <div
                    id="myformheadertext1p"
                    style={{ marginTop: "-19px", fontWeight: "bold" }}
                  >
                    <p> Welcome to Priority Pulse</p>
                    <p style={{ margin: "-18px 0 11px 0" }}>
                      Your Pulse,Our Priority
                    </p>
                  </div>
                </div>
              </div>
              <form className="loginp-form" method="POST">
                <input
                  name="name"
                  type="text"
                  placeholder="Patient Name"
                  autoComplete="on"
                  id="text"
                  value={user.name}
                  onChange={handleInputs}
                />
                <input
                  name="pcase"
                  type="text"
                  placeholder="Patient Case"
                  autoComplete="on"
                  id="text"
                  value={user.pcase}
                  onChange={handleInputs}
                />
                <input
                  name="age"
                  type="text"
                  placeholder="Age"
                  autoComplete="on"
                  id="number"
                  value={user.age}
                  onChange={handleInputs}
                />

                <input
                  name="guardianNo"
                  type="text"
                  placeholder="Guardian No."
                  autoComplete="off"
                  id="text"
                  list="phoneList"
                  value={user.guardianNo}
                  onChange={handleInputs}
                />
                <input
                  name="casePrior"
                  type="text"
                  placeholder="Case priority"
                  autoComplete="on"
                  id="text"
                  value={user.casePrior}
                  onChange={handleInputs}
                />

                <input
                  name="pickedBy"
                  id="search"
                  type="search"
                  list="mylist"
                  placeholder="Driver Name"
                  onChange={handleInputs}
                  autoComplete="off"
                  value={user.pickedBy.name}
                  onClick={() =>
                    drivers.length === 0 && toast.warn("No Driver Available")
                  }
                />
                <datalist id="mylist">
                  {drivers.map((value) => {
                    return <option value={value.name}></option>;
                  })}
                </datalist>
                <datalist id="phoneList">
                  {/* {phone.map((value) => {
                    return <option value={value.phoneNumber}></option>;
                  })} */}
                </datalist>
                <div>
                  <Fade
                    in={loading}
                    style={{
                      transitionDelay: !loading ? "800ms" : "0ms",
                    }}
                    unmountOnExit
                  >
                    <CircularProgress />
                  </Fade>
                </div>
                <Button
                id="mybutton"
                  ref={btnref}
                  style={{ margin: "10px 0 0px 0", fontSize: "1rem" }}
                  variant="contained"
                  onClick={handleSubmit}
                >
                  {loading
                    ? (document.getElementById("mybutton").style.display =
                        "none")
                    : "Submit"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
