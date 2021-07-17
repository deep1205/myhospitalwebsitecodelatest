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
import { toast } from "react-toastify";

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

  //console.log(accounts);

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
  const [showPutForm, SetShowPutForm] = useState(false);

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

  const editAcco = (e) => {
    if (localStorage.getItem("miniShowMiniAccoActions") === "false") {
      toast.error("Unauthorized to edit account");
    } else {
      console.log(e);
      console.log(data);
      SetShowPutForm(!showPutForm);
      axios
        .put("https://server.prioritypulse.co.in/hosp/editMini", data, {
          headers: { Authorization: localStorage.getItem("token") },
        })
        .then((res) => {
          console.log(res);
          toast.success("Account edited successfully");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const removeAcco = (e) => {
    console.log(e);
    // axios.delete('https://server.prioritypulse.co.in/hosp/deleteMini', { "accountid": e },
    //     {
    //         headers: { "Authorization": localStorage.getItem("token") }
    //     })

    // axios.delete('https://server.prioritypulse.co.in/hosp/deleteMIni',
    //     { data: { accountid: e }, headers: { "Authorization": "Bearer " + localStorage.getItem("token") } })

    if (localStorage.getItem("miniShowMiniAccoDelete") === "false") {
      toast.error("Unauthorized to delete account");
    } else {
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
          toast.success("account deleted succesfully");
        })
        .catch((err) => {
          console.log(err);
        });
    }
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
        toast.success("Account added succesfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const func = (e) => {
    setEmail(e);
    SetShowPutForm(!showPutForm);
  };

  return (
    <div className="miniaccount">
      <h4 style={{ color: "#390999", fontWeight: "800", textAlign: "center" }}>
        Mini Accounts{" "}
        <span style={{ float: "right" }}>
          <button
            className="addbutton"
            onClick={() => {
              localStorage.getItem("miniShowMiniAccoActions") === "true"
                ? SetShowForm(!showForm)
                : toast.error("Unauthorized to add account");
            }}
          >
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
                      onClick={() => {
                        localStorage.getItem("miniShowMiniAccoActions") ===
                        "true"
                          ? func(account.email)
                          : toast.error("Unauthorized to edit account");
                      }}
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
                  {userType === "mini" ? (
                    <div>
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
                          <h6>Driver Request Action : </h6>
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
                  ) : null}
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
      ) : null}
      {showPutForm ? (
        <div className="miniform">
          <div>
            <Dialog
              open={showPutForm}
              onClose={() => SetShowPutForm(!showPutForm)}
            >
              <DialogTitle>Edit Account</DialogTitle>
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
                        placeholder="New Password..."
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
                  {userType === "mini" ? (
                    <div>
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
                          <h6>Driver Request Action : </h6>
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
                  ) : null}
                </div>
              </DialogContent>
              <DialogContent align="center">
                <Button color="primary" onClick={() => editAcco()}>
                  Submit
                </Button>
                <Button
                  color="secondary"
                  onClick={() => SetShowPutForm(!showPutForm)}
                >
                  Cancel
                </Button>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default MiniAccounts;
