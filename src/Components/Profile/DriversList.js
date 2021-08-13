import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { toast } from "react-toastify";

const DriversList = () => {
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    axios
      .get("https://server.prioritypulse.co.in/hosp/alldriver", {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((res) => {
        //console.log(res);
        setDrivers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [drivers]);

  const removeDriver = (e) => {
    if (localStorage.getItem("miniShowDriverListAction") == "false") {
      toast.error("Unauthorized to delete driver");
    } else {
      axios
        .put(
          "https://server.prioritypulse.co.in/hosp/reverseDriver",
          { driverid: e },
          {
            headers: { Authorization: localStorage.getItem("token") },
          }
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  // console.log(drivers);

  return (
    <div>
      <h4 style={{ color: "#390999", fontWeight: "800", textAlign: "center" }}>
        Drivers Details
      </h4>
      <div className="driverlist">
        <TableContainer component={Paper}>
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Mobile</TableCell>
                <TableCell align="center">Remove</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {drivers.map((driver, id) => (
                <TableRow key={id}>
                  <TableCell align="center">
                    <img src={driver.driverL} className="responsive" />{" "}
                    {driver.name}
                  </TableCell>
                  <TableCell align="center">{driver.mobileNo}</TableCell>
                  <TableCell align="center">
                    <button
                      className="deletebutton"
                      onClick={() => removeDriver(driver._id)}
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
    </div>
  );
};

export default DriversList;
