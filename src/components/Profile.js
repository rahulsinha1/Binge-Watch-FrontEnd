import React, { useRef, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { Grid, TextField, Button, makeStyles } from "@material-ui/core";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";
import Editable from "./Editable";
import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import Navigation from "./Navigation";
// import EditableLabel from 'react-inline-edit';

export default function Profile() {
  const { handleSubmit, register, control } = useForm();
  const initState = {
    redirect: false,
    currentUser: {
      username: "",
      firstName: "",
      lastName: "",
    },
  };
  const inputRef = useRef();

  const [state, setState] = useState(initState);

  const check_user = localStorage.getItem("username");

  const [task, setTask] = useState("");

  function update(params) {
    const state = {
      firstName: params["firstName"],
      lastName: params["lastName"],
      email: params["email"],
      pass: params["pass"]
    };
    console.log(state);
    fetch("http://localhost:8080/api/user/update/"+localStorage.getItem("username"), {
      method: "POST",
      body: JSON.stringify(state),
      headers: {
        "content-type": "application/json",
      },
      credentials:"include"
    })
    .then(function(respond){
            console.log(respond);
      localStorage.setItem("username", respond.data.username);
      localStorage.setItem("email", respond.data.email);
      localStorage.setItem("id", respond.data.id);
      localStorage.setItem("role", respond.data.role);
      localStorage.setItem("first_name", respond.data.firstName);
      localStorage.setItem("last_name", respond.data.lastName);
      // window.location.href = "/profile";

    })
    .catch(function (error) {
      console.log(error);
    });


    // axios
    //   .post("http://localhost:8080/api/user/update", state)
    //   .then(function (response) {
    //     console.log(response);
        // localStorage.setItem("username", response.data.username);
        // localStorage.setItem("email", response.data.email);
        // localStorage.setItem("id", response.data.id);
        // localStorage.setItem("role", response.data.role);
        // localStorage.setItem("first_name", response.data.firstName);
        // localStorage.setItem("last_name", response.data.lastName);

        // window.location.href = "/profile";
     
  }
  // useEffect(() => {
  //   axios
  //     .get("http://localhost:8080/api/user/currentUser")
  //     .then(function (response) {
  //       console.log(this);
  //       if (response["date"] !== "") {
  //         setState({
  //           currentUser: response,
  //         });
  //       }
  //       localStorage.setItem("username", state.currentUser.username);
  //       localStorage.setItem("userrole", state.currentUser.role);
  //       console.log(localStorage.getItem("user"));
  //       console.log(state);
  //     });
  // }, []);

  // componentDidMount() {

  //   // fetch("http://localhost:8080/api/user/currentUser", {
  //   //   method: "GET",
  //   //   credentials: "include",
  //   // })
  //   //   .then((response) => response.json())
  //   //   .then((currentUser) => {
  //   //     this.setState({
  //   //       currentUser: currentUser,
  //   //     });
  //   //     localStorage.setItem("username", currentUser.username);
  //   //     localStorage.setItem("userrole", currentUser.role);
  //   //     console.log(localStorage.getItem("user"));
  //   //     console.log(currentUser);
  //   //   });
  // }

  function profile() {
    fetch("http://localhost:8080/api/user/logout", {
      method: "POST",
      credentials: "include",
    })
      .then(() => setState({ redirect: true }))
      .then(() => console.log(state.redirect))
      .then(() => localStorage.clear())
      .then(() => {
        localStorage.clear();
        window.location.href = "/movie";
      });
    // .then({Redirect:true})
    // .then(Router.browserHistory.push("/movie"));
    // .then(render(){
    //   return <Redirect to="/movie"/>});
  }

  if (state.redirect) {
    return <Redirect to="/movie" />;
  } else {
    return (
      /*
    Enclose the input element as the children to the Editable component to make it as inline editable.
  */
      //  <Editable
      //  placeholder="Write a task name"
      //  childRef={inputRef}
      //  type="input"
      // >
      //  <input
      //    ref={inputRef}
      //    type="text"
      //    name="task"
      //    placeholder="Write a task name"
      //    value={task}
      //    onChange={e => setTask(e.target.value)}
      //  />
      // </Editable>

      <div>
        <Navigation/>
        <h1> {localStorage.getItem("username")}'s profile</h1>
        <form
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit(update)}
            >
        <TableRow>
          <TableCell>Your Role:</TableCell>
          <TableCell>{localStorage.getItem("role")}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Your First Name:</TableCell>
          <TableCell>{localStorage.getItem("first_name")}</TableCell>
          <TableCell>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <TextField
                name="firstName"
                id="standard-basic1"
                label="Change First Name"
                fullwidth="true"
                inputRef={register}
              />
            </Grid>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Your Last Name:</TableCell>
          <TableCell>{localStorage.getItem("last_name")}</TableCell>
          <TableCell>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <TextField
                name="lastName"
                id="standard-basic1"
                label="Change Last Name"
                fullwidth="true"
                inputRef={register}
              />
            </Grid>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Your Email :</TableCell>
          <TableCell>{localStorage.getItem("email")}</TableCell>
          <TableCell>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <TextField
                name="email"
                id="standard-basic1"
                label="Change email"
                fullwidth="true"
                inputRef={register}
              />
            </Grid>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Your password :</TableCell>
          <TableCell>Now Showing for Security Reason</TableCell>
          <TableCell>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <TextField
                name="pass"
                id="standard-basic1"
                label="Change password"
                fullwidth="true"
                inputRef={register}
              />
            </Grid>
          </TableCell>
        </TableRow>
        <Button variant="contained" color="primary" type="submit">
                    Update info
                  </Button>
        </form>

        <h1>{localStorage.getItem("username")}</h1>
        <button onClick={profile}>Log out</button>
        <a href={"/"}>home</a>
        <a>{localStorage.getItem("role")}</a>
        <a>{state.currentUser.username}</a>
        <br />
      </div>
    );
  }
}


// export default class Profile extends React.Component {
// constructor(props) {
//   super(props);
//   this.state = {
//     redirect: false,
//     currentUser: {
//       username: "",
//       firstName: "",
//       lastName: "",
//     },
//   };
// }
// }
