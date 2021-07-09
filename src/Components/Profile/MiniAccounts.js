import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";

const MiniAccounts = () => {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    axios
      .get("https://server.prioritypulse.co.in/hosp/accounts", {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((res) => {
        setAccounts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [accounts]);

  console.log(accounts);

  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState("mini");
  const [password, setPassword] = useState("");
  const [showHome, setShowHome] = useState(false);
  const [showTrack, setShowTrack] = useState(false);
  const [showPast, setShowPast] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showDriverList, setShowDriverList] = useState(false);
  const [showDriverListAction, setShowDriverListAction] = useState(false);
  const [showRequest, setShowRequest] = useState(false);
  const [showRequestAction, setShowRequestAction] = useState(false);
  const [showMiniAcco, setShowMiniAcco] = useState(false);
  const [showMiniAccoActions, setShowMiniAccoActions] = useState(false);
  const [showMiniAccoDelete, setShowMiniAccoDelete] = useState(false);
  const [showForm, SetShowForm] = useState(false);

  const data = {
    email: email,
    userType: userType,
    password: password,
    showHome: showHome,
    showTrack: showTrack,
    showPast: showPast,
    showProfile: showProfile,
    showDriverList: showDriverList,
    showDriverListAction: showDriverListAction,
    showRequest: showRequest,
    showRequestAction: showRequestAction,
    showMiniAcco: showMiniAcco,
    showMiniAccoActions: showMiniAccoActions,
    showMiniAccoDelete: showMiniAccoDelete,
  };

  const editAcco = (e) => {};

  const removeAcco = (e) => {
    console.log(e);
    // axios.delete('https://server.prioritypulse.co.in/hosp/deleteMini', { "accountid": e },
    //     {
    //         headers: { "Authorization": localStorage.getItem("token") }
    //     })

    // axios.delete('https://server.prioritypulse.co.in/hosp/deleteMIni',
    //     { data: { accountid: e }, headers: { "Authorization": "Bearer " + localStorage.getItem("token") } })

    fetch("https://server.prioritypulse.co.in/hosp/deleteMini", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        accountid: e,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const sendData = (e) => {
    console.log(data);
    SetShowForm(!showForm);
    axios
      .post("https://server.prioritypulse.co.in/hosp/createMini", data, {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="miniaccount">
      <h4 style={{ color: "#390999", fontWeight: "800", textAlign: "center" }}>
        Mini Accounts{" "}
        <span style={{ float: "right" }}>
          <button className="addbutton" onClick={() => SetShowForm(!showForm)}>
            +
          </button>
        </span>{" "}
      </h4>
      <div className="driverlist">
        <TableContainer component={Paper}>
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Type</TableCell>
                <TableCell align="center">Change</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {accounts.map((account, id) => (
                <TableRow key={id}>
                  <TableCell align="center">{account.email} </TableCell>
                  <TableCell align="center">{account.userType}</TableCell>
                  <TableCell align="center">
                    {" "}
                    <button
                      className="editbutton"
                      onClick={() => editAcco(account._id)}
                    >
                      Edit
                    </button>{" "}
                    <span></span>
                    <button
                      className="deletebutton"
                      onClick={() => removeAcco(account._id)}
                    >
                      Delete
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      {showForm ? (
        <div className="miniform">
          {/* <Form onSubmit={(e) => e.preventDefault()}  >
                        <FormGroup className="formgroup" row>
                            <Label sm={3}>Email</Label>
                            <Col sm={9}>
                                <Input type="email" name="email" id="exampleEmail" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </Col>
                        </FormGroup>
                        <FormGroup className="formgroup" row>
                            <Label sm={3}>Password</Label>
                            <Col sm={9}>
                                <Input type="password" name="password" id="examplePassword" placeholder="Your Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </Col>
                        </FormGroup>
                        <FormGroup className="formgroup" row>
                            <Label sm={3}>UserType</Label>
                            <Col sm={9}>
                                <Input type="select" name="select" id="exampleSelect" value={userType} onChange={(e) => setUserType(e.target.value)}>
                                    <option>admin</option>
                                    <option>mini</option>
                                </Input>
                            </Col>
                        </FormGroup>
                        <FormGroup className="formgroup" row>
                            <Label sm={3}>Controls</Label>
                            <Col sm={9} style={{ textAlign: "start" }}>
                                <CustomInput type="switch" id="exampleCustomSwitch" name="customSwitch" label="Home Page" value={showHome} onChange={(e) => setShowHome(!showHome)} />
                                <CustomInput type="switch" id="exampleCustomSwitch2" name="customSwitch" label="TrackAmbulance Page" value={showTrack} onChange={(e) => setShowTrack(!showTrack)} />
                                <CustomInput type="switch" id="exampleCustomSwitch2" name="customSwitch" label="PastRide Page" value={showPast} onChange={(e) => setShowPast(!showPast)} />
                                <CustomInput type="switch" id="exampleCustomSwitch2" name="customSwitch" label="Profile Page" value={showProfile} onChange={(e) => setShowProfile(!showProfile)} />
                                <CustomInput type="switch" id="exampleCustomSwitch2" name="customSwitch" label="Driver List" value={showDriverList} onChange={(e) => setShowDriverList(!showDriverList)} />
                                <CustomInput type="switch" id="exampleCustomSwitch2" name="customSwitch" label="Driver Action" value={showDriverListAction} onChange={(e) => setShowDriverListAction(!showDriverListAction)} />
                                <CustomInput type="switch" id="exampleCustomSwitch2" name="customSwitch" label="Driver Request" value={showRequest} onChange={(e) => setShowRequest(!showRequest)} />
                                <CustomInput type="switch" id="exampleCustomSwitch2" name="customSwitch" label="Request Action" value={showRequestAction} onChange={(e) => setShowRequestAction(!showRequestAction)} />
                                <CustomInput type="switch" id="exampleCustomSwitch2" name="customSwitch" label="Mini Accounts" value={showMiniAcco} onChange={(e) => setShowMiniAcco(!showMiniAcco)} />
                                <CustomInput type="switch" id="exampleCustomSwitch2" name="customSwitch" label="Mini Account Action" value={showMiniAccoActions} onChange={(e) => setShowMiniAccoActions(!showMiniAccoActions)} />
                                <CustomInput type="switch" id="exampleCustomSwitch2" name="customSwitch" label="Delete Mini Account" value={showMiniAccoDelete} onChange={(e) => setShowMiniAccoDelete(!showMiniAccoDelete)} />
                            </Col>
                        </FormGroup>
                        <FormGroup check row>
                            <Col sm={{ size: 10, offset: 2 }} >
                                <button className="submitbutton" onClick={() => sendData()} >Submit</button>
                            </Col>
                        </FormGroup>
                    </Form> */}
          <div>
            <div>
              <Dialog open={showForm} onClose={() => SetShowForm(!showForm)}>
                <DialogTitle>Add An Account</DialogTitle>
                <DialogContent>
                  <div style={{ textAlign: "center" }}>
                    <Grid container spacing={2}>
                      <Grid item xs>
                        <input
                          style={{}}
                          placeholder="Email..."
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs>
                        <input
                          style={{}}
                          placeholder="Password..."
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                      <Grid item xs>
                        <h6>Choose userType : </h6>
                      </Grid>
                      <Grid item xs>
                        <select
                          value={userType}
                          onChange={(e) => setUserType(e.target.value)}
                        >
                          <option value="mini">Mini</option>
                          <option value="admin">Admin</option>
                        </select>
                      </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                      <Grid item xs>
                        <h6>Home Page : </h6>
                      </Grid>
                      <Grid item xs>
                        <input
                          type="checkbox"
                          value={showHome}
                          onChange={(e) => setShowHome(!showHome)}
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                      <Grid item xs>
                        <h6>Track Ambulance Page : </h6>
                      </Grid>
                      <Grid item xs>
                        <input
                          type="checkbox"
                          value={showTrack}
                          onChange={(e) => setShowTrack(!showTrack)}
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                      <Grid item xs>
                        <h6>Past Ride Page : </h6>
                      </Grid>
                      <Grid item xs>
                        <input
                          type="checkbox"
                          value={showPast}
                          onChange={(e) => setShowPast(!showPast)}
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                      <Grid item xs>
                        <h6>Profile Page : </h6>
                      </Grid>
                      <Grid item xs>
                        <input
                          type="checkbox"
                          value={showProfile}
                          onChange={(e) => setShowProfile(!showProfile)}
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                      <Grid item xs>
                        <h6>See Drivers List : </h6>
                      </Grid>
                      <Grid item xs>
                        <input
                          type="checkbox"
                          value={showDriverList}
                          onChange={(e) => setShowDriverList(!showDriverList)}
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                      <Grid item xs>
                        <h6>Driver List Action : </h6>
                      </Grid>
                      <Grid item xs>
                        <input
                          type="checkbox"
                          value={showDriverListAction}
                          onChange={(e) =>
                            setShowDriverListAction(!showDriverListAction)
                          }
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                      <Grid item xs>
                        <h6>Drivers Requests : </h6>
                      </Grid>
                      <Grid item xs>
                        <input
                          type="checkbox"
                          value={showRequest}
                          onChange={(e) => setShowRequest(!showRequest)}
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                      <Grid item xs>
                        <h6>Drivers request Actions : </h6>
                      </Grid>
                      <Grid item xs>
                        <input
                          type="checkbox"
                          value={showRequestAction}
                          onChange={(e) =>
                            setShowRequestAction(!showRequestAction)
                          }
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                      <Grid item xs>
                        <h6>Mini Account : </h6>
                      </Grid>
                      <Grid item xs>
                        <input
                          type="checkbox"
                          value={showMiniAcco}
                          onChange={(e) => setShowMiniAcco(!showMiniAcco)}
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                      <Grid item xs>
                        <h6>Mini Account Actions : </h6>
                      </Grid>
                      <Grid item xs>
                        <input
                          type="checkbox"
                          value={showMiniAccoActions}
                          onChange={(e) =>
                            setShowMiniAccoActions(!showMiniAccoActions)
                          }
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                      <Grid item xs>
                        <h6>Delete Mini : </h6>
                      </Grid>
                      <Grid item xs>
                        <input
                          type="checkbox"
                          value={showMiniAccoDelete}
                          onChange={(e) =>
                            setShowMiniAccoDelete(!showMiniAccoDelete)
                          }
                        />
                      </Grid>
                    </Grid>
                  </div>
                </DialogContent>
                <DialogContent align="center">
                  <Button color="primary" onClick={() => sendData()}>
                    Submit
                  </Button>
                  <Button
                    color="secondary"
                    onClick={() => SetShowForm(!showForm)}
                  >
                    Cancel
                  </Button>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default MiniAccounts;
