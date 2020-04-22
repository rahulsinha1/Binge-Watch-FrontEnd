import React, { useState, useEffect } from "react";
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
import LoginPage from "./login";
import MovieFun from "./movie.js";
import PostForm from "./PostForm";
import Cookies from "js-cookie";
import { Route, Link } from "react-router-dom";
import Navigation from "./Navigation";

import { Grid, Paper, TextField, Button } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

export default function UserList() {
  const [userList, setUserList] = useState([]);
  const classes = useStyles();
  const { handleSubmit, register, control } = useForm();
  const [redirect, setRedirect] = useState(false);
  const [role, setRole] = React.useState("");
  const handleChange = (event) => {
    setRole(event.target.value);
  };

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

  function deleteUser(param) {
    axios
      .get("http://localhost:8080//api/user/delete/" + param)
      .then(function (response) {
        console.log(response);
        alert("user deleated");
        window.location.href = "/userList/";
      })
      .catch(function (error) {
        alert("the user is too valuable to delete, try other user");
        console.log(error);
      });
  }

  function updateRoleUser(param) {
    axios
      .get("http://localhost:8080//api/user/updateRole/" + param + "/" + "USER")
      .then(function (response) {
        console.log(response);
        window.location.href = "/userList/";
      });
  }
  function updateRoleCritic(param) {
    axios
      .get(
        "http://localhost:8080//api/user/updateRole/" + param + "/" + "CRITIC"
      )
      .then(function (response) {
        console.log(response);
        window.location.href = "/userList/";
      });
  }
  function updateRoleAdmin(param) {
    axios
      .get(
        "http://localhost:8080//api/user/updateRole/" + param + "/" + "ADMIN"
      )
      .then(function (response) {
        console.log(response);
        window.location.href = "/userList/";
      });
  }
  function singup(params) {
    const newUser = {
      email: params["email"],
      username: params["user"],
      pass: params["pass"],
      role: params["role"].toUpperCase(),
    };
    fetch("http://localhost:8080/api/user/create", {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {
        "content-type": "application/json",
      },
      credentials: "include",
    })
      .then(() => {
        alert("You've successful created an user as admin");
        window.location.href = "/userList";
      })

      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    getUserList();
  }, []);

  if (
    localStorage.getItem("username") != null &&
    localStorage.getItem("role") === "ADMIN"
  ) {
    return (
      <div className={classes.root}>
        <Navigation />
        <Grid container justify="center">
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <h1>{localStorage.getItem("user")}</h1>
            <TableContainer component={Paper}>
              <br></br>
              <a>create new user:</a>
              <Grid container justify="center">
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <FormControl required className={classes.formControl}>
                    <InputLabel id="demo-simple-select-required-label">
                      Select role
                    </InputLabel>

                    <Controller
                      as={
                        <Select
                          labelId="demo-simple-select-required-label"
                          id="demo-simple-select-required"
                          value={role}
                          onChange={handleChange}
                          className={classes.selectEmpty}
                        >
                          <MenuItem value={"admin"}>admin</MenuItem>
                          <MenuItem value={"critic"}>critic</MenuItem>
                          <MenuItem value={"user"}>user</MenuItem>
                        </Select>
                      }
                      control={control}
                      name="role"
                    />
                    <FormHelperText>Required</FormHelperText>
                  </FormControl>

                  <form
                    noValidate
                    autoComplete="off"
                    onSubmit={handleSubmit(singup)}
                  >
                    <Grid
                      container
                      justify="center"
                      style={{ paddingBottom: "1rem" }}
                    >
                      <Grid item xs={12} sm={12} md={12} lg={12}>
                        <TextField
                          name="email"
                          id="standard-basic"
                          label="Email"
                          fullwidth="true"
                          inputRef={register}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} lg={12}>
                        <TextField
                          name="user"
                          id="standard-basic"
                          label="User Name"
                          fullwidth="true"
                          inputRef={register}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} lg={12}>
                        <TextField
                          name="pass"
                          id="standard-basic"
                          label="Password"
                          fullwidth="true"
                          inputRef={register}
                          type="password"
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
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                        >
                          Create a new user
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </Grid>
              </Grid>

              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>UserProfile</TableCell>
                    {/* <TableCell>UserDetail</TableCell> */}
                    <TableCell>Current Role</TableCell>
                    <TableCell>Update Role to:</TableCell>
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

                      <TableCell>{row["role"]}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          onClick={function () {
                            updateRoleUser(row["username"]);
                          }}
                        >
                          User
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={function () {
                            updateRoleCritic(row["username"]);
                          }}
                        >
                          Critic
                        </Button>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={function () {
                            updateRoleAdmin(row["username"]);
                          }}
                        >
                          Admin
                        </Button>
                      </TableCell>
                      <TableCell>
                        <button
                          onClick={function () {
                            deleteUser(row["username"]);
                          }}
                        >
                          delete
                        </button>
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
  } else {
    return <h1>you do not have access</h1>;
  }
}
