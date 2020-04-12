import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import ContainedButtons from "./button";
import SignUpPage from "./components/register";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import MovieFun from "./components/movie";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route exact path="/">
          <App />
        </Route>
        <Route path="/signup">
          <SignUpPage />
        </Route>
        <Route path="/movie">
          <MovieFun/>
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
