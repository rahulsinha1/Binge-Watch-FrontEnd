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
import AuthApi from "./components/AuthApi";
import { HashRouter, Route} from 'react-router-dom';
import ls from 'local-storage';
import Navigation from "./components/Navigation";
import SignUpPage from "./components/register";
import MovieDetail from "./components/movieDetail";
import UserDetail from "./components/UserDetail";
import Profile from "./components/Profile";
import UserList from "./components/userList";
// const cookies = new Cookies();
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

<div className="App">
<HashRouter>
  <ul>
    <li><Link to='/movie'>Movie</Link></li>
    <li><Link to='/signup'>signup</Link></li>
    <li><Link to='/login'>login</Link></li>
    <li><Link to='/userList'>User List</Link></li>
    <li><Link to='/profile'>profile</Link></li>
  </ul>
  <Switch>
  <Route path="/movie"component={MovieFun}/>
  <Route path="/signup"component={SignUpPage}/>
  <Route path="/login"component={LoginPage}/>
  <Route path="/userList"component={UserList}/>
  <Route path="/profile"component={Profile}/>
  </Switch>
</HashRouter>

</div>
  

    
// {/* <div>
//   <Navigation/>
//   <MovieFun/>


// </div> */}








    // <div >
    //   <Grid container justify="center">
    //     <Grid item xs={12} sm={12} md={6} lg={6}>

    //       <Button href="/login" variant="contained">
    //         login
    //       </Button>
    //       <Button href="/movie" variant="contained">
    //         movie
    //       </Button>
    //       <Button href="/userList" variant="contained">
    //         userList
    //       </Button>
    //     </Grid>
    //   </Grid>
    // </div>
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
