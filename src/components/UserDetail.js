import React, { useState, useEffect } from "react";
import { Grid, TextField, Button, makeStyles, colors } from "@material-ui/core";
import { Redirect, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablemovieDetail,
  Paper,
} from "@material-ui/core";
import Navigation from "./Navigation";


const useStyles = makeStyles((theme) => ({
    root: {
      flexGmovieDetail: 1,
    },
  }));

export default function UserDetail(name) {

    const { handleSubmit, register } = useForm();
    const [movieList, setMovieList] = useState([]);
    const [userDetail, setUserDetail] = useState({});
    const [redirect, setRedirect] = useState(false);
    const classes = useStyles();

  function search(params) {
    axios
      .get("http://localhost:8080/api/user/find/username/" + params["name"])
      .then(function (response) {
        console.log(response);
        setUserDetail(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    console.log(name);
    search(name);
  }, []);

  return (
<div>
    <Navigation/>
<text>
    username:
{console.log(localStorage.getItem["username"])}
    {localStorage.getItem["username"]}
</text>
<br/>
<text>
    id:

    {localStorage.getItem["id"]}
</text>
<br/>
<text>
    role:

    {localStorage.getItem["role"]}
</text>
<br/>
</div>
  );

  }