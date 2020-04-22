import React from "react";
import Button from "@material-ui/core/Button";
import { Grid, Paper, Checkbox } from "@material-ui/core";
import { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

function Navigation() {
  // const [state, setState] = useState();

  // let isLoggedIn =false;
  //   useEffect(() => {
  //   if(localStorage.getItem("id")===null){
  //       let isLoggedIn =true;
  //       console.log(isLoggedIn)
  //     // alert("hello");
  //     // window.location.href = "/";
  //   }else{
  //     let isLoggedIn=false;
  //     console.log(isLoggedIn)
  //   }
  // });

  // if(localStorage.getItem["username"]!==null){
  //   isLoggedIn = true;
  // }
  var role = localStorage.getItem("role");
   function logout () {
    fetch("http://localhost:8080/api/user/logout", {
      method: "POST",
      credentials: "include",
    })
      // .then(() => setState({ redirect: true }))
      // .then(() => console.log(state.redirect))
      .then(() => localStorage.clear())
      .then(() => {
        localStorage.clear();
        // alert("you've logged out, redirect to movie list")
        window.location.href = "/movie";
      });
    }

  return (
    <Grid container justify="center">
      <Grid item xs={12} sm={12} md={6} lg={6}>
        {localStorage.getItem("username") ? (
          <Grid>
            <Button
              onClick={function () {
                logout()
              }}
              variant="contained"
            >
              logout
            </Button>
            <Button
              href={"/watchlist/" + localStorage.getItem("username")}
              variant="contained"
            >
              Watch List
            </Button>
            <Button href="/profile" variant="contained">
              profile
            </Button>
            <Button href={"/userInteraction/" + localStorage.getItem("username")}
            variant="contained">
              Friend Zone
            </Button>
          </Grid>
        ) : (
          <Button href="/login" variant="contained">
            login
          </Button>
        )}
        <Button href="/movie" variant="contained">
          movie
        </Button>
        {localStorage.getItem("role") === "ADMIN" ? (
          <Button href="/userList" variant="contained">
            userList
          </Button>
        ) : (
          ""
        )}
        {localStorage.getItem("role") === "CRITIC" ? (
          <Button href="/userList" variant="contained">
            Write Critic
          </Button>
        ) : (
          ""
        )}
      </Grid>
    </Grid>
  );
}

export default Navigation;
