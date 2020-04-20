import React, { useState, useEffect } from "react";
import { Grid, TextField, Button, makeStyles } from "@material-ui/core";
import axios from "axios";
import { Redirect } from "react-router-dom";
import ls from "local-storage";
import { useForm, Controller } from "react-hook-form";

export default function LoginPage() {
  const { handleSubmit, register, control } = useForm();
  const [redirect, setRedirect] = useState(false);

  function authorize(params) {
    const state = {
      username: params["username"],
      pass: params["pass"],
    };
    const login_status = false;
    axios
      .post("http://localhost:8080/api/user/login", state)
      .then(function (response) {
        console.log(response);
                localStorage.setItem("username", response.data.username);
                localStorage.setItem("pass", response.data.pass);
                localStorage.setItem("id", response.data.id);
                localStorage.setItem("role", response.data.role);
        setRedirect(true);
        window.location.href = "/";
      });
    // fetch("http://localhost:8080/api/user/login", {
    //   method: "POST",
    //   body: JSON.stringify(state),
    //   headers: {
    //     "content-type": "application/json",
    //   },
    //   credentials: "include",
    // })
    //   .then((response) => response.json())
    //   .then(setRedirect(true))
    //   .catch(function (error) {
    //     console.log(error);
    //   });
    // axios
    // .get("http://localhost:8080//api/user/find/username/"+loginUser.username)
    // .then(function (response) {
    //   // console.log(response.data["pass"])
    //   // console.log(response);
    //   // console.log(loginUser.password)
    //   if(response.data["pass"]===loginUser.password){
    //     login_status = true;

    //   }
    //   else{
    //     console.log("not right");
    //   }
    //   // if (response["data"] !== {}) {
    //   //   setMovieList([response["data"], ...movieList]);
    //   // }
    // })
  }

  // if (redirect) {
  //   return <Redirect to="/movie" />;
  // } else {
    return (
      <div>
        <Grid container justify="center">
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <form
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit(authorize)}
            >
              <Grid
                container
                justify="center"
                style={{ paddingBottom: "1rem" }}
              >
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <TextField
                    name="username"
                    id="standard-basic1"
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
                  md={5}
                  lg={5}
                  fullwidth="true"
                >
                  <Button variant="contained" color="primary" type="submit">
                    Login
                  </Button>
                </Grid>
                <Grid
                  container
                  justify="center"
                  item
                  xs={12}
                  sm={12}
                  md={5}
                  lg={5}
                  fullwidth="true"
                >
                  <Button href="/signup" variant="contained" color="secondary">
                    Sign Up
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </div>
    );
  }

