import React, {
  useState,
  useEffect,
  createRef,
  useContext,
  useRef,
} from "react";
import Header from "../Components/Myheader/Header";
import Button from "@material-ui/core/Button";
import { toast } from "react-toastify";
import MyGoogleMap from "../Components/Googlemaps/HomepageGoogleMaps";
import "../css/HomePage.css";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Horizontalscrolltext from "../Components/Horizontalscrollingtext"
const delay = require("delay");
const Homepage = (props) => {
  let btnref = useRef();

  const [disable, setDisable] = useState(false);
  const map = createRef();
  const [drivers, setDriver] = useState([]);
  const [guardianCoordinates, setguardianCoordinates] = useState([]);
  const setaddressCoordinates = (coords) => {
    setguardianCoordinates(coords);
  };
  console.log(guardianCoordinates);
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
    pickedBy: "",
    pickUplocation: {
      coordinates: [],
    },
  });
  let name, value;
  const [guardian, setGuardian] = useState({});
  const selectDriver = (e) => {
    for (var i = 0; i < phone.length; ++i) {
      if (e.target.value == phone[i].phoneNumber) {
        if (phone[i].location.coordinates.length == 0) {
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
      if (name == "guardianNo") {
        selectDriver(e);
      }
    }
  };

  const onBtnClick = (e) => {
    setDisable(true);
    if (btnref.current) {
      btnref.current.setAttribute("disabled", "true");
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onBtnClick();
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
    };
    console.log(user.guardianNo);
    axios
      .post("https://server.prioritypulse.co.in/hosp/createRide", newUser, {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then(async (res) => {
        toast.success("Form Submitted Sucessfully");
        await delay(1000);
        console.log("Form Submitted SuccessFully");
        window.location.reload();
        console.log(res);
      })
      .catch((err) => {
        console.log(err.status);
        console.log(err.error);
        toast.error("Please fill Form correctly");
        console.log(`Please Fill form Correctly`);
        setDisable(false);
        if (btnref.current) {
          btnref.current.setAttribute("disabled", "false");
        }
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
        <Horizontalscrolltext />
        <div
          id="googlemaphomepagekiposition"
          className="main-wrapper"
          style={{ order: "2" }}
        >
          <MyGoogleMap
            ref={map}
            myusers={guardian}
            setGuardianCoords={setaddressCoordinates}
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
                  onChange={handleInputs}
                />
                <input
                  name="pcase"
                  type="text"
                  placeholder="Patient Case"
                  autoComplete="on"
                  id="text"
                  onChange={handleInputs}
                />
                <input
                  name="age"
                  type="text"
                  placeholder="Age"
                  autoComplete="on"
                  id="number"
                  onChange={handleInputs}
                />

                <input
                  name="guardianNo"
                  type="text"
                  placeholder="Guardian No."
                  autoComplete="off"
                  id="text"
                  list="phoneList"
                  onChange={handleInputs}
                />
                <input
                  name="casePrior"
                  type="text"
                  placeholder="Case priority"
                  autoComplete="on"
                  id="text"
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
                  {phone.map((value) => {
                    return <option value={value.phoneNumber}></option>;
                  })}
                </datalist>
                {!disable && (
                  <Button
                    ref={btnref}
                    style={{ margin: "10px 0 0px 0", fontSize: "1rem" }}
                    variant="contained"
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
