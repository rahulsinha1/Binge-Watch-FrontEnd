import React, { useState, useEffect } from "react";
import { Grid, TextField, Button, makeStyles } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

export default function MovieFun() {
  const { handleSubmit, register } = useForm();
  const [movieList, setMovieList] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const classes = useStyles();

  function getMovieList() {
    axios
      .get("http://localhost:8080/api/movies")
      .then(function (response) {
        console.log(response);
        setMovieList([].concat(response["data"]));
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function search(params) {
    axios
      .get("http://localhost:8080/api/movies/find/?name=" + params["name"])
      .then(function (response) {
        console.log(response);
        setRedirect(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    getMovieList();
  }, []);

  if (redirect) {
    return <Redirect to="/movie" />;
  } else {
    return (
      <div class="container-fluid app-container" className={classes.root}>
        <Grid container justify="center">
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <h3>
              {movieList.map((row) => (
                <text key={row["name"]}>
                  <h1>{row["name"]}</h1>
                  <img src={row["poster"]} alt={row["name"]} />
                  <br></br>
                  <text style={{ flexShrink: 2 }}>
                    Country:      <h10>{row["country"]}</h10>{" "}
                  </text>
                  <br></br>
                  <text style={{ flexShrink: 2 }}>
                    IMDB rating:     <h9>{row["imdbRating"]}</h9>{" "}
                  </text>
                  <br></br>
                  <text style={{ flexShrink: 2 }}>
                    Type:   <h9>{row["type"]}</h9>{" "}
                  </text>
                  <br></br>
                  <text style={{ flexShrink: 2 }}>
                  Genre: <h9>{row["genre"]}</h9>{" "}
                  </text>
                  <br></br>
                  <text style={{ flexShrink: 2 }}>
                    Year: <h9>{row["year"]}</h9>{" "}
                  </text>
                  <br></br>
                  <text style={{ flexShrink: 2 }}>
                    Director: <h9>{row["director"]}</h9>{" "}
                  </text>
                  <br></br>
                  <text style={{ flexShrink: 2 }}>
                    Lenght: <h9>{row["runtime"]}</h9>{" "}
                  </text>
                  <br></br>
                  <text style={{ flexShrink: 2 }}>
                    Introduction: <text>{row["storyLine"]}</text>{" "}
                  </text>

                </text>
                )
                )}
            </h3>


          </Grid>
        </Grid>
      </div>
    );
  }
}
