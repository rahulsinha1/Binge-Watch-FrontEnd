import React, { useState, useEffect } from "react";
import { Grid, TextField, Button, makeStyles } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function SignUpPage() {
  const { handleSubmit, register } = useForm();
  const [redirect, setRedirect] = useState(false);

  function singup(params) {
    axios
      .get(
        "http://localhost:8080/api/user/insert/" +
          params["userName"] +
          "/" +
          params["passWord"]
      )
      .then(function (response) {
        console.log(response);
        setRedirect(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  if (redirect) {
    return <Redirect to="/" />;
  } else {
    return (
      <div>
        <Grid container justify="center">
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <form noValidate autoComplete="off" onSubmit={handleSubmit(singup)}>
              <Grid
                container
                justify="center"
                style={{ paddingBottom: "1rem" }}
              >
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <TextField
                    name="userName"
                    id="standard-basic"
                    label="User Name"
                    fullwidth="true"
                    inputRef={register}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <TextField
                    name="passWord"
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
                  md={6}
                  lg={6}
                  fullwidth="true"
                >
                  <Button variant="contained" color="primary" type="submit">
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
}
