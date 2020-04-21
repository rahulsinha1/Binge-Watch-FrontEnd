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
  const [redirect, setRedirect] = useState(false);
  const classes = useStyles();
  const [watchList,setWatchList]=useState([])

  function search(params) {
    axios
      .get("http://localhost:8080/api/user/find/username/" + params["name"])
      .then(function (response) {
        console.log(response);
        console.log(response.data.watchList);
        setUserDetail(response.data);
        setWatchList([].concat(response.data.watchList));
        console.log(watchList);
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
      <text> {userDetail.username}'s WatchList: </text>
      <br />
      <Table>
      <TableHead>
                  <TableRow>
                    <TableCell>Movie Name</TableCell>
                    <TableCell>Imdb Rating</TableCell>
                    <TableCell>Genre</TableCell>
                    <TableCell>Year</TableCell>
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
          </TableRow>
        ))}
      </TableBody>


      </Table>


    </div>
  );
}
