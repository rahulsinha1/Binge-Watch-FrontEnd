import React, { useState, useEffect } from "react";
import { Grid, TextField, Button, makeStyles } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));



export default function SignUpPage() {
  const { handleSubmit, register, control } = useForm();
  const [redirect, setRedirect] = useState(false);
  const classes = useStyles();
  const [role, setRole] = React.useState("");

  // state = {
  //   user: {
  //     username: '',
  //     pass: '',
  //     email:'',
  //     role:'',
  //   //   verifyPassword: "",
  //   },
  // };


  const handleChange = (event) => {
    setRole(event.target.value);
  };

  function singup(params) {

    const newUser = {
      email: params["email"],
      username: params["user"],
      pass: params["pass"],
      role: params["role"].toUpperCase(),
    };
    fetch("http://ec2-18-220-141-147.us-east-2.compute.amazonaws.com:8083/api/user/create", {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {
        "content-type": "application/json",
      },
      credentials:"include"
    })
    .then(()=>alert("You've successful registered! Please log in now"))
    
      .then((response) => response.json())
      .then (setRedirect(true))
      .catch(function (error) {
        console.log(error);
      });
    }

          // console.log(params);
    // const newUser = {
    //   email: params["email"],
    //   username: params["user"],
    //   pass: params["pass"],
    //   role: params["role"].toUpperCase(),
    // };
    // axios
    //   .post("http://ec2-18-220-141-147.us-east-2.compute.amazonaws.com:8083/api/user/create", newUser)
    //   .then(function (response) {
    //     console.log(response);
    //     setRedirect(true);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });

  if (redirect) {
    return <Redirect to="/" />;
  } else {
    return (
      <div>
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

            <form noValidate autoComplete="off" onSubmit={handleSubmit(singup)}>
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
                  <Button variant="contained" color="primary" type="submit">
                    Register
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
