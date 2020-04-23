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

export default function UserInteraction() {
  const [followerList, setFollowerList] = useState([]);
  const [followingList, setFollowingList] = useState([]);

  function getFollowers() {
    axios
      .get(
        "http://ec2-18-220-141-147.us-east-2.compute.amazonaws.com:8080/api/user/get/followers/" +
          localStorage.getItem("username")
      )
      .then(function (response) {
        console.log(response.data);
        setFollowerList([].concat(response.data));
      });
  }

  function getFollowering() {
    axios
      .get(
        "http://ec2-18-220-141-147.us-east-2.compute.amazonaws.com:8080/api/user/get/following/" +
          localStorage.getItem("username")
      )
      .then(function (response) {
        console.log(response.data);
        setFollowingList([].concat(response.data));
      });
  }
  function deleteFollowing(name) {
    axios
      .get(
        "http://ec2-18-220-141-147.us-east-2.compute.amazonaws.com:8080/api/user/unfollow/" +
          localStorage.getItem("username") +
          "/" +
          name
      )
      .then(function (response) {
        console.log(response);
        window.location.href =
          "/userinteraction/" + localStorage.getItem("username");
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    getFollowering();
    getFollowers();
  }, []);
  return (
    <div>
      <Navigation />
      <h3>hi {localStorage.getItem("username")}</h3>

      <h4> Your Follower: </h4>
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
      <h4> You are Following: </h4>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>User Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {followingList.map((row) => (
            <TableRow key={row["username"]}>
              <TableCell component="th" scope="row">
                <Link to={"/userDetail/" + row["username"]}>
                  {row["username"]}
                </Link>
                <Button
                  onClick={function () {
                    deleteFollowing(row["username"]);
                  }}
                  variant="contained"
                  color="primary"
                >
                  unfollow{" "}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
