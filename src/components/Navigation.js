import React from "react";
import Button from "@material-ui/core/Button";
import { Grid, Paper, Checkbox } from "@material-ui/core";
import { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

function Navigation() {
  // const [state, setState] = useState();

  let isLoggedIn = localStorage.getItem["username"];

  // if(localStorage.getItem["username"]!==null){
  //   isLoggedIn = true;
  // }
  var role = localStorage.getItem["role"];
  var logout = () =>
    fetch("http://localhost:8080/api/user/logout", {
      method: "POST",
      credentials: "include",
    })
      // .then(() => setState({ redirect: true }))
      // .then(() => console.log(state.redirect))
      .then(() => localStorage.clear())
      .then(() => {
        localStorage.clear();
        console.log(localStorage.getItem["username"]);
        window.location.href = "/";
      });

if(isLoggedIn==null){

  return (
    <div>
      <Grid container justify="center">
        <Grid item xs={12} sm={12} md={6} lg={6}>
          {isLoggedIn ? (
            <Button onClick={logout} href="/movie" variant="contained">
              logout
            </Button>
          ) : (
            <Button href="/login" variant="contained">
              login
            </Button>
          )}
<span>
  {isLoggedIn?"yes":role?"role":
    <Button href="/login" variant="contained">
    login\\\
  </Button>
  }
</span>
          <Button href="/movie" variant="contained">
            movie
          </Button>
          <Button href="/userList" variant="contained">
            userList
          </Button>
          <Button href="/profile" variant="contained">
            profile
          </Button>
        </Grid>
      </Grid>
    </div>
  );}
  else{
    return(
    <div>
    <Button href="/movie" variant="contained">
    movie
  </Button>
  <Button href="/userList" variant="contained">
    userList
  </Button>
  <Button href="/profile" variant="contained">
    profile
  </Button>
    </div>
    )
  }
}

export default Navigation;
