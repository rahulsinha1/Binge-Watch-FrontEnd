import React, { useState, useEffect } from "react";
import { Grid, TextField, Button, makeStyles, colors } from "@material-ui/core";
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
  TablemovieDetail,
  Paper,
  TableRow,
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
  const [followerList, setFollowerList] = useState([]);
  const [followingList, setFollowingList] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const classes = useStyles();
  const [watchList, setWatchList] = useState([]);
  const [listReview, setListReview] = useState([]);

  function search(params) {
    axios
      .get("http://ec2-18-220-141-147.us-east-2.compute.amazonaws.com:8080/api/user/find/username/" + params["name"])
      .then(function (response) {
        // console.log(response);
        // console.log(response.data.watchList);
        setUserDetail(response.data);
        setWatchList([].concat(response.data.watchList));
        // console.log(watchList);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function getFollowers() {
    axios
      .get("http://ec2-18-220-141-147.us-east-2.compute.amazonaws.com:8080/api/user/get/followers/" + name["name"])
      .then(function (response) {
        console.log(response.data);
        setFollowerList([].concat(response.data));
      });
  }

  function getFollowering() {
    axios
      .get("http://ec2-18-220-141-147.us-east-2.compute.amazonaws.com:8080/api/user/get/following/" + name["name"])
      .then(function (response) {
        console.log(response.data);
        setFollowingList([].concat(response.data));
      });
  }

  function removeMovie(params) {
    axios
      .get(
        "http://ec2-18-220-141-147.us-east-2.compute.amazonaws.com:8080/api/user/remove/watchlist/" +
          name["name"] +
          "/" +
          params
      )
      .then(function(result){
        console.log(result);
        // setRedirect(true);
        window.location.href = ("/userDetail/" + name["name"]);
      })

      .catch(function (error) {
        console.log(error);
      });
  }

  function deleteFollowing(params){
    axios
    .get("http://ec2-18-220-141-147.us-east-2.compute.amazonaws.com:8080/api/user/unfollow/" +name["name"] +"/"+ params)
    .then(function(response){
        console.log(response);
        window.location.href = ("/userDetail/" + name["name"]);
    })
    .catch(function(error){
        console.log(error);
    })
}

function getCritic(){

  axios
  .get("http://ec2-18-220-141-147.us-east-2.compute.amazonaws.com:8080/api/movieReview/find/user/"+ name["name"])
  .then(function(response){
    console.log(response);
    setListReview([].concat(response.data));
  })
}

  useEffect(() => {
    console.log(name);
    search(name);
    getFollowers();
    getFollowering();
    getCritic();
  }, []);

  return (
    <div>
      <Navigation />
      <h3>Detail about user: {userDetail.username}</h3>
      <br />
      <text>username: {userDetail.username}</text>
      <br />
      <text>id: {userDetail.id}</text>
      <br />
      <text>role: {userDetail.role}</text>
      <br />
      <text>First Name: {userDetail.firstName}</text>
      <br />
      <text>last Name: {userDetail.lastName}</text>
      <br></br>
      <br></br>

      <h4> {userDetail.username}'s Critic List: </h4>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Movie Name</TableCell>
            <TableCell>Review</TableCell>
            <TableCell>Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listReview.map((row) => (
            <TableRow key={row["id"]}>
              <TableCell component="th" scope="row">
                <Link to={"/movieDetail/" + row["movieName"]}>{row["movieName"]}</Link>
              </TableCell>
              <TableCell>{row["comment"]}</TableCell>
              <TableCell>{row["grade"]}</TableCell>
            
            </TableRow>
          ))}
        </TableBody>
      </Table>


      <h4> {userDetail.username}'s WatchList: </h4>
      <br />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Movie Name</TableCell>
            <TableCell>Imdb Rating</TableCell>
            <TableCell>Genre</TableCell>
            <TableCell>Year</TableCell>{localStorage.getItem("role")==="ADMIN"? 
            <TableCell>Action</TableCell> :""
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {watchList.map((row) => (
            <TableRow key={row["name"]}>
              <TableCell component="th" scope="row">
                <Link to={"/movieDetail/" + row["name"]}>{row["name"]}</Link>
              </TableCell>
              <TableCell>{row["imdbRating"]}</TableCell>
              <TableCell>{row["genre"]}</TableCell>
              <TableCell>{row["year"]}</TableCell>
              {localStorage.getItem("role")==="ADMIN"? 
            <TableCell>
              

              <Button variant="contained" color="primary" onClick={function(){
                removeMovie(row["name"]);
              }    }>
                Delete for {name["name"]}
              </Button>
            </TableCell> :""
            }
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <br />
      <h4> {userDetail.username}'s Follower: </h4>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>User Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {followerList.map((row) => (
            <TableRow key={row["username"]}>
              <TableCell component="th" scope="row">
                <Link to={"/userDetail/" + row["username"]}>
                  {row["username"]}
                </Link>
                
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <br />
      <h4> {userDetail.username}'s Following: </h4>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>User Name</TableCell>{localStorage.getItem("role")==="ADMIN"? 
            <TableCell>Action</TableCell> :""
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {followingList.map((row) => (
            <TableRow key={row["username"]}>
              <TableCell component="th" scope="row">
                <Link to={"/userDetail/" + row["username"]}>
                  {row["username"]}
                </Link>
              </TableCell>
              {localStorage.getItem("role")==="ADMIN"? 
            <TableCell>
              

              <Button variant="contained" color="primary" onClick={function(){
                deleteFollowing(row["username"]);
              }    }>
                Delete for {name["name"]}
              </Button>
            </TableCell> :""
            }
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
