import React, { useState, useEffect } from "react";
import { Grid, TextField, Button, makeStyles } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Paper, Checkbox } from "@material-ui/core";
import { Route, Link } from "react-router-dom";
import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import Navigation from "./Navigation";

export default function WatchList() {
  const { handleSubmit, register } = useForm();
  const [redirect, setRedirect] = useState(false);
  const [watchList, setWatchList] = useState([]);

  //   function ActionLink(){
  //       function handleClick(e){
  //           e.bind
  //       }
  //   }

  const address = "/watchlist/" + localStorage.getItem("username");

  function addWatchList(params) {
    axios
      .get(
        "http://localhost:8080/api/user/add/watchlist/" +
          localStorage.getItem("username") +
          "/" +
          params["movieName"]
      )
      .then(function (response) {
        console.log(response);
        // window.location.href = {"/watchlist/" + localStorage.getItem("username")};
        setRedirect(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  function refreshPage() {
    window.location.reload(false);
  }

  function getWatchList() {
    axios
      .get(
        "http://localhost:8080/api/user/get/watchlist/" +
          localStorage.getItem("username")
      )

      .then(function (response) {
        // console.log(response);
        setWatchList([].concat(response["data"]));
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function removeMovie(params) {
    axios
      .get(
        "http://localhost:8080/api/user/remove/watchlist/" +
          localStorage.getItem("username") +
          "/" +
          params
      )
      .then(function(result){
        console.log(result);
        setRedirect(true);
      })

      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    getWatchList();
  }, []);

  if (redirect) {
    return <Redirect  exact to={"/watchlist/" + localStorage.getItem("username")} />;
  } else {
    return (
      <div>
        <Navigation />
        <Grid container justify="center">
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <form
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit(addWatchList)}
            >
              <Grid
                container
                justify="center"
                style={{ paddingBottom: "1rem" }}
              >
                {/* <Grid item xs={12} sm={12} md={12} lg={12}>
                  <TextField
                    name="userName"
                    id="standard-basic"
                    label="User Name"
                    fullwidth="true"
                    inputRef={register}
                  />
                </Grid> */}
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <TextField
                    name="movieName"
                    id="standard-basic"
                    label="Movie Name"
                    fullwidth="true"
                    inputRef={register}
                  />
                </Grid>
              </Grid>
              <Grid container item justify="center">
                <Grid
                  container
                  justify="center"
                  item
                  xs={12}
                  sm={12}
                  md={6}
                  lg={6}
                  fullwidth="true"
                >
                  <Button variant="contained" color="primary" type="submit">
                    Add movie to watchList
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
        <br></br>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Movie Name</TableCell>
                <TableCell>Genre</TableCell>
                <TableCell>Delete from List</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {watchList.map((row) => (
                <TableRow key={row["id"]}>
                  <TableCell component="th" scope="row">
                    {row["name"]}
                  </TableCell>
                  <TableCell>{row["genre"]}</TableCell>

                  <TableCell>
                    <Button
                      onClick={function () {
                        removeMovie(row["name"]);
                      }}
                    >
                      delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}
