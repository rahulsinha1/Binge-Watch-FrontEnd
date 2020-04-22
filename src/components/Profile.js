import React, { useRef, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { Grid, TextField, Button, makeStyles } from "@material-ui/core";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";
import Editable from "./Editable";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import FormHelperText from "@material-ui/core/FormHelperText";
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
  const [addressDetail, setaddressDetail] = useState({});
  const [number, setNumber] = useState([]);
  const [primary, setprimary] = React.useState("");
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

  const handleChange = (event) => {
    setprimary(event.target.value);
  };

  function addAddress(params) {
    const state = {
      city: params["city"],
      country: params["country"],
      state: params["state"],
      streetAddress: params["streetAddress"],
      zipCode: params["zipCode"],
    };
    axios
      .post(
        "http://localhost:8080/api/user/addAddress/" +
          localStorage.getItem("username"),
        state
      )
      .then(function (response) {
        console.log(response);
        setaddressDetail(response.config.data);
        console.log(response.config.data);
        console.log(response.config.data["country"]);
        console.log(response.config.data.country);

        localStorage.setItem("street", response.config.data["streetAddress"]);
        console.log(localStorage.getItem("street"));
        window.location.href = "/profile";
      });
  }

  function addPhone(params) {
    const state = {
      number: params["number"],
      primary: params["primary"],
    };
    console.log(state);
    axios
      .post(
        "http://localhost:8080/api/user/addPhone/" +
          localStorage.getItem("username"),
        state
      )
      .then(function (response) {
        console.log(response);
        console.log(response.data);
        console.log(response.data.phone);
        window.location.href = "/profile";
        // setNumber([].concat(response.data.phone));
        // setNumber([].concat(response.data.phone))
        // localStorage.setItem("address",)
      });
  }

  function getPhone() {
    const state = {};
    console.log(state);
    axios
      .post(
        "http://localhost:8080/api/user/find/username/" +
          localStorage.getItem("username"),
        state
      )
      .then(function (response) {
        console.log(response);
        // console.log(response.data);
        // console.log(response.data.phone);
        setaddressDetail(response.data.address);
        setNumber([].concat(response.data.phone));
        // localStorage.clear();
        localStorage.setItem("username", response.data.username);
        localStorage.setItem("email", response.data.email);
        // localStorage.setItem("id", response.data.id);
        // localStorage.setItem("role", response.data.role);
        localStorage.setItem("first_name", response.data.firstName);
        localStorage.setItem("last_name", response.data.lastName);
        // setNumber([].concat(response.data.phone))
        // localStorage.setItem("address",)
      });
  }

  // function getPhone() {
  //   const state = {

  //   };
  //   console.log(state);
  //   axios
  //     .post(
  //       "http://localhost:8080/api/user/addPhone/" +
  //         localStorage.getItem("username"),
  //       state
  //     )
  //     .then(function (response) {
  //       console.log(response);
  //       console.log(response.data);
  //       console.log(response.data.phone);
  //       setNumber([].concat(response.data.phone));
  //       // setNumber([].concat(response.data.phone))
  //       // localStorage.setItem("address",)
  //     });
  // }

  function update(params) {
    const state = {
      firstName: params["firstName"],
      lastName: params["lastName"],
      email: params["email"],
      pass: params["pass"],
    };
    console.log(state);
    axios
      .post(
        "http://localhost:8080/api/user/update/" +
          localStorage.getItem("username"),
        state
      )
      .then(function (respond) {
        console.log(respond);
        // localStorage.setItem("username", respond.data.username);
        // localStorage.setItem("email", respond.data.email);
        // localStorage.setItem("id", respond.data.id);
        // localStorage.setItem("role", respond.data.role);
        // localStorage.setItem("first_name", respond.data.firstName);
        // localStorage.setItem("last_name", respond.data.lastName);
        window.location.href = "/profile";
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

  function removePhone(params) {
    const result={ 
      phone:{
      id: params["id"],
      number:params["number"],
      primary:params["primary"]
    },
    }
    console.log(params);
    console.log(result);
    axios
      .post(
        "http://localhost:8080/api/user/removePhone/" +
          localStorage.getItem("username"),
        params
      )
      .then(function (response) {
        console.log(response);
        window.location.href = "/profile";
      });
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
  useEffect(() => {
    console.log(localStorage.getItem("street"));
    getPhone();
  }, []);
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
        <Navigation />
        <h1> {localStorage.getItem("username")}'s profile</h1>
        <form noValidate autoComplete="off" onSubmit={handleSubmit(update)}>
          <TableRow>
            <TableCell>Your Role:</TableCell>
            <TableCell>{localStorage.getItem("role")}</TableCell>
            <TableCell>(please update all, and refresh after update)</TableCell>
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
        {localStorage.getItem("street") ? (
          <Grid>
            <h3>Your Address</h3>
            <br />
            <text>Stree: {addressDetail.streetAddress}</text>
            <br />
            <text>City: {addressDetail.city}</text>
            <br />
            <text>State: {addressDetail.state}</text>
            <br />
            <text>Country: {addressDetail.country}</text>
            <br />
            <text>Zip: {addressDetail.zipCode}</text>
            <br></br>
            <br></br>
            <br />
          </Grid>
        ) : (
          <form
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(addAddress)}
          >
            <Grid container justify="center" style={{ paddingBottom: "1rem" }}>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <TextField
                  required
                  name="streetAddress"
                  id="standard-basic"
                  label="street"
                  fullwidth="true"
                  inputRef={register}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <TextField
                  required
                  name="city"
                  id="standard-basic"
                  label="city"
                  fullwidth="true"
                  inputRef={register}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <TextField
                  required
                  name="state"
                  id="standard-basic"
                  label="state"
                  fullwidth="true"
                  inputRef={register}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <TextField
                  required
                  name="country"
                  id="standard-basic"
                  label="country"
                  fullwidth="true"
                  inputRef={register}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <TextField
                  required
                  name="zipCode"
                  id="standard-basic"
                  label="zipCode"
                  fullwidth="true"
                  inputRef={register}
                />
              </Grid>
            </Grid>
            <Grid container item>
              <Grid
                container
                item
                xs={12}
                sm={12}
                md={6}
                lg={6}
                fullwidth="true"
              >
                <Button variant="contained" color="primary" type="submit">
                  Add address
                </Button>
              </Grid>
            </Grid>
          </form>
        )}

        <form noValidate autoComplete="off" onSubmit={handleSubmit(addPhone)}>
          <Grid container justify="center" style={{ paddingBottom: "1rem" }}>
            <Grid container item xs={12} sm={12} md={6} lg={6} fullwidth="true">
              <FormControl
                required
                // className={classes.formControl}
              >
                <InputLabel id="demo-simple-select-required-label">
                  Primary
                </InputLabel>
                <Controller
                  as={
                    <Select
                      labelId="demo-simple-select-required-label"
                      id="demo-simple-select-required"
                      value={primary}
                      onChange={handleChange}
                      // className={classes.selectEmpty}
                    >
                      <MenuItem value={true}>Yes</MenuItem>
                      <MenuItem value={false}>No</MenuItem>
                    </Select>
                  }
                  control={control}
                  name="primary"
                />
                <FormHelperText>Required</FormHelperText>
              </FormControl>

              <Grid item xs={12} sm={12} md={12} lg={12}>
                <TextField
                  name="number"
                  id="standard-basic"
                  label="number"
                  fullwidth="true"
                  inputRef={register}
                />
              </Grid>
            </Grid>
            <Grid container item>
              <Button variant="contained" color="primary" type="submit">
                Add number
              </Button>
            </Grid>
          </Grid>
        </form>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Your numbers</TableCell>
              <TableCell>Is Primary</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {number.map((row) => (
              <TableRow key={row["number"]}>
                <TableCell component="th" scope="row">
                  {row["number"]}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row["primary"] ? "yes" : ""}
                </TableCell>
                <TableCell>
                  <Button onClick={function(){
                    removePhone(row)
                  }} variant="contained" color="primary" type="submit">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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
