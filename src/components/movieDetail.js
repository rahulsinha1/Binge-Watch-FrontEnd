import React, { useState, useEffect } from "react";
import { Grid, TextField, Button, makeStyles } from "@material-ui/core";
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

export default function MovieFun(name) {
  const { handleSubmit, register } = useForm();
  const [movieList, setMovieList] = useState([]);
  const [movieDetail, setMovieDetail] = useState({});
  const [redirect, setRedirect] = useState(false);
  const classes = useStyles();

  // function getMovieList() {
  //   axios
  //     .get("http://localhost:8080/api/movies")
  //     .then(function (response) {
  //       console.log(response);
  //       setMovieList([].concat(response["data"]));
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }

  function search(params) {
    axios
      .get("http://localhost:8080/api/movies/find/?name=" + params["name"])
      .then(function (response) {
        console.log(response);
        setMovieDetail(response.data);
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
    <div class="container-fluid app-container" className={classes.root}>
      <Navigation/>
      <Grid container justify="center">
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <h3>
            <text key={movieDetail["name"]}>
              <h1>{movieDetail["name"]}</h1>
              <img src={movieDetail["poster"]} alt={movieDetail["name"]} />
              <br></br>
              <text style={{ flexShrink: 2 }}>
                Country: <h10>{movieDetail["country"]}</h10>{" "}
              </text>
              <br></br>
              <text style={{ flexShrink: 2 }}>
                IMDB rating: <h9>{movieDetail["imdbRating"]}</h9>{" "}
              </text>
              <br></br>
              <text style={{ flexShrink: 2 }}>
                Type: <h9>{movieDetail["type"]}</h9>{" "}
              </text>
              <br></br>
              <text style={{ flexShrink: 2 }}>
                Genre: <h9>{movieDetail["genre"]}</h9>{" "}
              </text>
              <br></br>
              <text style={{ flexShrink: 2 }}>
                Year: <h9>{movieDetail["year"]}</h9>{" "}
              </text>
              <br></br>
              <text style={{ flexShrink: 2 }}>
                Director: <h9>{movieDetail["director"]}</h9>{" "}
              </text>
              <br></br>
              <text style={{ flexShrink: 2 }}>
                Lenght: <h9>{movieDetail["runtime"]}</h9>{" "}
              </text>
              <br></br>
              <text style={{ flexShrink: 2 }}>
                Introduction: <text>{movieDetail["storyLine"]}</text>{" "}
              </text>
            </text>
          </h3>
        </Grid>
      </Grid>
    </div>
  );
}
