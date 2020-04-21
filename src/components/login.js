import React, { useState, useEffect } from "react";
import { Grid, TextField, Button, makeStyles } from "@material-ui/core";
import axios from "axios";
import { Redirect } from "react-router-dom";
import ls from "local-storage";
import { useForm, Controller } from "react-hook-form";
import Navigation from "./Navigation";

export default function LoginPage() {
  const { handleSubmit, register, control } = useForm();
  const [redirect, setRedirect] = useState(false);

  // useEffect(() => {
  //   if(localStorage.getItem("id")!==null){
  //     alert("hello");
  //     window.location.href = "/";
  //   }
  // });

  function authorize(params) {
    const state = {
      username: params["username"],
      pass: params["pass"],
    };
    // console.log(state);
    const login_status = false;
    try {
      axios
      .post("http://localhost:8080/api/user/login", state)
      .then(function (response) {
        console.log(response);
        if(response.data===""){
          alert("no user exist or password not correct, please retry or sign up");
          window.location.href = "/login";
        }
        else{
          localStorage.setItem("username", response.data.username);
          localStorage.setItem("email", response.data.email);
          localStorage.setItem("id", response.data.id);
          localStorage.setItem("role", response.data.role);
          localStorage.setItem("first_name", response.data.firstName);
          localStorage.setItem("last_name", response.data.lastName);

  // setRedirect(true);
  window.location.href = "/movie";

        }
                
      })
    } catch (error) {
      console.log(error);
    }
    
      // .catch(function (error) {
      //   console.log(error);
      // });
      ;
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
        <Navigation/>
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

