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
  const [listReview,setListREview]=useState([]);
  const classes = useStyles();

  // function getMovieList() {
  //   axios
  //     .get("http://ec2-18-220-141-147.us-east-2.compute.amazonaws.com:8080/api/movies")
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
        "http://ec2-18-220-141-147.us-east-2.compute.amazonaws.com:8080/api/user/add/watchlist/" +
          localStorage.getItem("username") +
          "/" +
          name["name"]
      )
      .then(function (response) {
        alert("added to watchlist");
        window.location.href = "/movieDetail/" + name["name"];
      })
      .catch(function (error) {
        alert("You already added this movie");
        console.log(error);
      });
  }

  function search(params) {
    axios
      .get("http://ec2-18-220-141-147.us-east-2.compute.amazonaws.com:8080/api/movies/find/?name=" + params["name"])
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
        "http://ec2-18-220-141-147.us-east-2.compute.amazonaws.com:8080/api/user/follow/" +
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
      .get("http://ec2-18-220-141-147.us-east-2.compute.amazonaws.com:8080//api/streamers/find/" + name["name"])
      .then(function (response) {
        console.log(response);
        setListStreamer([].concat(response.data));
      });
  }

  function getListUser() {
    axios
      .get("http://ec2-18-220-141-147.us-east-2.compute.amazonaws.com:8080//api/likedBy/" + name["name"])
      .then(function (response) {
        // console.log(response.data);
        setListUser([].concat(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function deleteStreamer(params) {
    axios
      .get("http://ec2-18-220-141-147.us-east-2.compute.amazonaws.com:8080//api/streamers/delete/" + params)
      .then(function (response) {
        // console.log(response.data);
        window.location.href = "/movieDetail/" + name["name"];
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function review(feedback) {
    const result = {
      comment: "never saw it",
      grade: 9,
    };
    axios
      .post(
        "http://ec2-18-220-141-147.us-east-2.compute.amazonaws.com:8080/api/user/addmovieReview/" +
          localStorage.getItem("username") +
          "/" +
          name["name"],
        {},
        {
          params: {
            comment: feedback["comment"],
            grade: feedback["grade"],
          },
        }
      )
      .then(function (response) {
        console.log(response);
        window.location.href = "/movieDetail/" + name["name"];

      });
  }

  function showReview(name){
      axios
      .get("http://ec2-18-220-141-147.us-east-2.compute.amazonaws.com:8080/api/movieReview/find/"+ name["name"])
      .then(function(response){
        console.log(response);
        setListREview([].concat(response.data));
      })
  }

  useEffect(() => {
    // console.log(name);
    search(name);
    getListUser();
    getStreamer();
    showReview(name);
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
              {localStorage.getItem("role")==="CRITIC"?
              ""
              :<Button
              variant="contained"
              color="primary"
              onClick={function () {
                addWatchList(name);
              }}
            >
              Add to watchlist
            </Button>}
              
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
      {localStorage.getItem("role") === "CRITIC" ? (
        <form noValidate autoComplete="off" onSubmit={handleSubmit(review)}>
          <TextField
            required
            name="grade"
            id="standard-basic1"
            label="Grading"
            fullwidth="true"
            inputRef={register}
          />

          <TextField
            required
            name="comment"
            id="standard-basic1"
            label="Write Review"
            fullwidth="true"
            inputRef={register}
          />
          <Button
            // onClick={function () {
            //   review();
            // }}
            variant="contained"
            color="primary"
            type="submit"
          >
            submit
          </Button>
        </form>
      ) : (
        ""
      )}

<Table>
        <TableHead>
          <TableRow>
          <TableCell>Critic</TableCell>
            <TableCell>Review</TableCell>
            <TableCell>Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listReview.map((row) => (
            <TableRow key={row["id"]}>
              <TableCell component="th" scope="row">
                <Link to={"/userDetail/" + row["userName"]}>
                  {row["userName"]}
                </Link>{" "}
                {/* <Button
                  onClick={function () {
                    followUser(row["username"]);
                  }}
                  variant="contained"
                  color="primary"
                >
                  Follow{" "}
                </Button> */}
              </TableCell>
              <TableCell>
                {row["comment"]} </TableCell>
                <TableCell>
                {row["grade"]} </TableCell>
                
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>other users who add this movie to watchlist:</TableCell>
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
                <a target="_blank" href={row["streamingUrl"]}>
                  <img src={row["logoUrl"]} alt={row["logoUrl"]} />
                </a>
              </TableCell>
              {localStorage.getItem("role") === "ADMIN" ? (
                <TableCell>
                  <Button
                    onClick={function () {
                      deleteStreamer(row["id"]);
                    }}
                    variant="contained"
                    color="primary"
                    type="submit"
                  >
                    Delete
                  </Button>
                </TableCell>
              ) : (
                ""
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
