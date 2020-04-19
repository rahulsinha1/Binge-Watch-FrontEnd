import React, { useState, useEffect } from "react";
import { Grid, Paper, Checkbox } from "@material-ui/core";
import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// import ContainedButtons from "./button";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import LoginPage from "./login";
import MovieFun from "./movie.js";
import PostForm from "./PostForm";
import Cookies from 'js-cookie';
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
  }));

export default function UserList() {
    const [userList, setUserList] = useState([]);
    const classes = useStyles();

    function getUserList() {
        axios
          .get("http://localhost:8080//api/users/select/all")
          .then(function (response) {
            console.log(response);
            setUserList([].concat(response["data"]));
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    
      useEffect(() => {
        getUserList();
      }, []);
      
  return (
    <div className={classes.root}>
      <Grid container justify="center">
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>UserName</TableCell>
                  <TableCell>Password</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userList.map((row) => (
                  <TableRow key={row["username"]}>
                    <TableCell component="th" scope="row">
                      {row["username"]}
                    </TableCell>
                    <TableCell>{row["pass"]}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  );
}
