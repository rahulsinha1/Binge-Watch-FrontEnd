import React, { useState, useEffect } from "react";
import { Grid, TextField, Button, makeStyles } from "@material-ui/core";
import axios from "axios";

export default function LoginPage() {
  return (
    <div>
      <Grid container justify="center">
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <form noValidate autoComplete="off">
            <Grid container justify="center" style={{ paddingBottom: "1rem" }}>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <TextField
                  id="standard-basic"
                  label="User Name"
                  fullwidth="true"
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <TextField
                  id="standard-basic"
                  label="Password"
                  fullwidth="true"
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
                <Button variant="contained" color="primary">
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
