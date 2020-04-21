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
import Cookies from "js-cookie";
import { Route, Link } from "react-router-dom";
import Navigation from "./Navigation";

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

  function deleteUser(param){
    axios.get("http://localhost8080/api/user/delete/"+param)
    // alert("user deleated")
  }

  useEffect(() => {
    getUserList();
  }, []);

  if (localStorage.getItem("username") != null && localStorage.getItem("role")==="ADMIN") {
    return (
      <div className={classes.root}>
        <Navigation/>
        <Grid container justify="center">
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <h1>{localStorage.getItem("user")}</h1>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>UserName</TableCell>
                    <TableCell>Password</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Delete User</TableCell>
                  </TableRow>
                </TableHead>
                
                <TableBody>
                  {userList.map((row) => (


                    <TableRow key={row["username"]}>
                      <TableCell component="th" scope="row">
                      <Link to={"/userdetail/" + row["username"]}>
                      {row["username"]}
              </Link>
                        
                      </TableCell>
                      <TableCell>{row["pass"]}</TableCell>
                      <TableCell>
                        {row["role"]}
                      </TableCell>
                      <TableCell>
                      <button 
                      onClick={
                        function(){
                          deleteUser(row["username"])
                        }
                        }
                      >delete</button>
                      </TableCell>

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
  else{
    return(
<h1>you do not have access</h1>
      )
  }
}

