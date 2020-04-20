import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import ContainedButtons from "./button";
import SignUpPage from "./components/register";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import MovieFun from "./components/movie";
import MovieDetail from "./components/movieDetail";
import LoginPage from "./components/login";
import UserList from "./components/userList";
import Profile from "./components/Profile";
import UserDetail from "./components/UserDetail";

ReactDOM.render(
  <App/>,
  // <React.StrictMode>
  //   <Router>
  //     <Switch>
  //       <Route exact path="/">
  //         <App />
  //       </Route>
  //       <Route path="/signup">
  //         <SignUpPage />
  //       </Route>
  //       <Route path="/movie">
  //         <MovieFun />
  //       </Route>
  //       <Route
  //         exact
  //         path="/movieDetail/:name"
  //         component={(props) => <MovieDetail name={props.match.params.name} />}
  //       ></Route>
  //       <Route
  //         exact
  //         path="/userdetail/:name"
  //         component={(props) => <UserDetail name={props.match.params.name} />}
  //       ></Route>
  //       <Route path="/login">
  //         <LoginPage />
  //       </Route>
  //       <Route path="/userList">
  //         <UserList />
  //       </Route>
  //       <Route path="/profile">
  //         <Profile />
  //       </Route>
  //     </Switch>
  //   </Router>
  // </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
