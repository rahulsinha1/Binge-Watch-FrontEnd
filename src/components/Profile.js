import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";
// import EditableLabel from 'react-inline-edit';

export default function Profile() {
  const initState = {
    redirect: false,
    currentUser: {
      username: "",
      firstName: "",
      lastName: "",
    },
  };

  const [state, setState] = useState(initState);

  const check_user = localStorage.getItem("username");

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
      <div>
        <h1> {localStorage.getItem("username")}'s profile</h1>
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
