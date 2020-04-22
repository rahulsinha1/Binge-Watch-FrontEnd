import React, { useState, useEffect } from "react";
import { Grid, TextField, Button, makeStyles } from "@material-ui/core";
import { Redirect, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Route, Link } from "react-router-dom";
import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablemovieDetail,
  Paper,
} from "@material-ui/core";
import Navigation from "./Navigation";
import UserList from "./userList";

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
  const [listUser, setListUser] = useState([]);
  const [listStreamer, setListStreamer] = useState([]);
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

  function addWatchList(name) {
    axios
      .get(
        "http://localhost:8080/api/user/add/watchlist/" +
          localStorage.getItem("username") +
          "/" +
          name["name"]
      )
      .then(function (response) {

        alert("added to watchlist");
        window.location.href = "/movieDetail/"+name["name"];
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function search(params) {
    axios
      .get("http://localhost:8080/api/movies/find/?name=" + params["name"])
      .then(function (response) {
        // console.log(response);
        setMovieDetail(response.data);
        const respond_tem = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  function followUser(userName) {
    axios
      .get(
        "http://localhost:8080/api/user/follow/" +
          localStorage.getItem("username") +
          "/" +
          userName
      )
      .then(function (response) {
        // console.log(response);
        alert("You followed " + userName);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  function getStreamer() {
    axios
      .get("http://localhost:8080//api/streamers/find/" + name["name"])
      .then(function (response) {
        console.log(response);
        setListStreamer([].concat(response.data));
      });
  }

  function getListUser() {
    axios
      .get("http://localhost:8080//api/likedBy/" + name["name"])
      .then(function (response) {
        // console.log(response.data);
        setListUser([].concat(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function review(){
    // axios
    // .post("http://localhost:8080//api/critic/addmovieReview/")
  }

  useEffect(() => {
    // console.log(name);
    search(name);
    getListUser();
    getStreamer();
  }, []);

  return (
    <div
      class="container-fluid app-container"

      // className={classes.root}
    >
      <Navigation />
      <Grid container justify="center">
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <h3>
            <text key={movieDetail["name"]}>
            <Button variant="contained" color="primary" onClick={function(){
                addWatchList(name);
              }    }>
                Add to watchlist
              </Button>
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
      <form
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit(review)}
            >
      <TextField required
                    name="grade"
                    id="standard-basic1"
                    label="Grading"
                    fullwidth="true"
                    inputRef={register}
                  />

      <TextField required
                    name="comment"
                    id="standard-basic1"
                    label="Write Review"
                    fullwidth="true"
                    inputRef={register}
                  />
                 </form> 
        

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Liked by other user:</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listUser.map((row) => (
            <TableRow key={row["username"]}>
              <TableCell component="th" scope="row">
                <Link to={"/userDetail/" + row["username"]}>
                  {row["username"]}
                </Link>{" "}
                <Button
                  onClick={function () {
                    followUser(row["username"]);
                  }}
                  variant="contained"
                  color="primary"
                >
                  Follow{" "}
                </Button>
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <br />
      <br />

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Available at following streaming platform:</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listStreamer.map((row) => (
            <TableRow key={row["streamingPlatform"]}>
              <TableCell component="th" scope="row">
                <a target="_blank" href={row["streamingUrl"]}
                 
                >
                  <img src={row["logoUrl"]} alt={row["logoUrl"]} />
                </a>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
