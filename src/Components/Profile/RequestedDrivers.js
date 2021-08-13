import React, { useState, useEffect } from "react";
import axios from "axios";
import { Profiler } from "react";
import "../../css/profile.css";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { toast } from "react-toastify";

const RequestedDrivers = () => {
  const [reqDrivers, setReqDrivers] = useState([]);

  useEffect(() => {
    axios
      .get("https://server.prioritypulse.co.in/hosp/requestedDrivers", {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((res) => {
        setReqDrivers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [reqDrivers]);

  const addDriver = (e) => {
    if (localStorage.getItem("miniShowRequestAction") === "false") {
      toast.error("Unauthorized to accept driver request");
    } else {
      axios
        .put(
          "https://server.prioritypulse.co.in/hosp/acceptRequest",
          { driverid: e },
          {
            headers: { Authorization: localStorage.getItem("token") },
          }
        )
        .then((res) => {
          console.log(res);
          toast.success("Driver Added");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const removeDriver = (e) => {
    if (localStorage.getItem("miniShowRequestAction") === "false") {
      toast.error("Unauthorized to remove driver request");
    } else {
      axios
        .put("https://server.prioritypulse.co.in/hosp/rejectRequest", {
          data: { driverid: e },
          headers: { Authorization: localStorage.getItem("token") },
        })
        .then((res) => {
          console.log(res);
          toast.success("Driver Rejected");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div>
      <h4 style={{ color: "#390999", fontWeight: "800", textAlign: "center" }}>
        Drivers Request
      </h4>
      <div className="reqdriver">
        <TableContainer component={Paper}>
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Mobile</TableCell>
                <TableCell align="center">Invitation</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reqDrivers.map((driver, id) => (
                <TableRow key={id}>
                  <TableCell align="center">
                    <img src={driver.driverL} className="responsive" />{" "}
                    {driver.name}{" "}
                  </TableCell>
                  <TableCell align="center">{driver.mobileNo}</TableCell>
                  <TableCell align="center">
                    <button
                      className="acceptbutton"
                      onClick={() => addDriver(driver._id)}
                    >
                      Accept
                    </button>{" "}
                    <span></span>{" "}
                    <button
                      className="rejectbutton"
                      onClick={() => removeDriver(driver._id)}
                    >
                      Reject
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default RequestedDrivers;
