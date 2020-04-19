import React, { useState, useEffect, Component } from "react";
import { Grid, Paper, Checkbox } from "@material-ui/core";
import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { BrowserRouter as Router, Switch, Redirect,Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import ContainedButtons from "./button";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import LoginPage from "./components/login";
import MovieFun from "./components/movie.js";
import PostForm from "./components/PostForm";
import Cookies from "js-cookie";
import AuthApi from "./components/AuthApi";
import { Route } from "react-router-dom";

const cookies = new Cookies();
// cookies.set('myCat', 'Pacman', { path: '/' });
// console.log(cookies.get('myCat'));

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

function App() {
  const [auth, setAuth] = React.useState(false);
  const [userList, setUserList] = useState([]);
  const classes = useStyles();

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

  useEffect(() => {
    getUserList();
  }, []);

  return (
    <div >
      {/* <AuthApi.Provider value={(auth, setAuth)}>
        <Router>
          <Routes />
        </Router>
      </AuthApi.Provider> */}

      <Grid container justify="center">
        <Grid item xs={12} sm={12} md={6} lg={6}>
          {/* <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>UserName</TableCell>
                  <TableCell>Password</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userList.map((row) => (
                  <TableRow key={row["username"]}>
                    <TableCell component="th" scope="row">
                      {row["username"]}
                    </TableCell>
                    <TableCell>{row["pass"]}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer> */}
          {/* <LoginPage /> */}
          <Button href="/login" variant="contained">
            login
          </Button>
          <Button href="/movie" variant="contained">
            movie
          </Button>
          <Button href="/userList" variant="contained">
            userList
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

// const Routes = () => {
//   const Auth = React.useContext(AuthApi);
//   return (
//     <Switch>
//       <Route path="/login1" component={test} />
//       <ProtectdRoute path="/dashboard" auth={Auth.auth} component={Dashboard} />
//     </Switch>
//   );
// };

// const Dashboard = () => {
//   return (
//     <div>
//       <h1>Dashboard</h1>
//       <button >logout</button>
//     </div>
//   );
// };

// const Test = () => {
//   const Auth = React.useContext(AuthApi)
//   const handleOnClick = ()=>{
//     Auth.setAuth(true)
//   }
//   return (
//     <div>
//       <h1>test</h1>
//       <button onClick={handleOnClick}>login</button>
//     </div>
//   );
// };

// const ProtectdRoute = ({ auth, component: Component, ...rest }) => {
//   return (
//     <Route
//       {...rest}
//       render={() => (auth ? <Component /> : <Redirect to="/login1" />)}
//     />
//   );
// };

export default App;
