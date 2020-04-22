import React, { useState, useEffect } from "react";
import { Route, Link } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
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
  GridList,
  GridListTile,
  GridListTileBar,
} from "@material-ui/core";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import { Router } from "react-router";
import Navigation from "./Navigation";
import background from "../background.jpg"

const imageResult={
  // position: absolute,
  //   opacity: 0.3
  backgroundImage: `url(${background})`,
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat'

}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 600,
    // height: 750,
    // transform: "translateZ(0)",
  },
  titleBar: {
    background:
      "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
      "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
  icon: {
    color: "white",
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
        // console.log(response);
        // console.log(response["data"]);
        setMovieList([].concat(response["data"]));
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  function addWatchList(params) {
    axios
      .get(
        "http://localhost:8080/api/user/add/watchlist/" +
          localStorage.getItem("username") +
          "/" +
          params
      )
      .then(function (response) {
        // console.log(response);
        // window.location.href = {"/watchlist/" + localStorage.getItem("username")};
        // setRedirect(true);
        alert("added to watchlist");
        window.location.href = "/movie";
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function search(params) {
    axios
      .get("http://localhost:8080/api/movies/find/", {
        params: { name: params["name"] },
      })
      .then(function (response) {
        // console.log(response);
        if (response["data"] !== {}) {
          setMovieList([response["data"], ...movieList]);
        }
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
      <div className={classes.root}>
        <Navigation />

        {localStorage.getItem("username") ? (
          <h1>hi {localStorage.getItem("username")}</h1>
        ) : (
          ""
        )}

        <GridList  cellHeight={300} spacing={1} className={classes.gridList}>
          <form noValidate autoComplete="off" onSubmit={handleSubmit(search)}>
            <Grid container justify="center" style={{ paddingBottom: "1rem" }}>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <TextField
                  name="name"
                  id="standard-basic"
                  label="Movie name"
                  fullwidth="true"
                  inputRef={register}
                />
              </Grid>
            </Grid>
            <Grid container item justify="center">
              <Grid
                container
                justify="center"
                item
                xs={12}
                sm={12}
                md={6}
                lg={6}
                fullwidth="true"
              >
                <Button variant="contained" color="primary" type="submit">
                  search movie
                </Button>
              </Grid>
            </Grid>
          </form>
          {/* <Router> */}

          {movieList.map((row) => (
            <GridListTile 
              key={row["poster"]}
              // cols={row.featured ? 2 : 1}
              // rows={row.featured ? 2 : 1}
            >
              <Link to={"/moviedetail/" + row["name"]}>
                <img src={row["poster"]} alt={row["name"] } />
              </Link>
              {localStorage.getItem("username") ? (
                <GridListTileBar
                  title={row["name"]}
                  titlePosition="top"
                  
                  actionIcon={
                    <IconButton
                      onClick={function () {
                        addWatchList(row["name"]);
                      }}
                      aria-label={'star${row["name"]}'}
                      className={classes.icon}
                    >
                      <StarBorderIcon color="secondary" />
                    </IconButton>

                  }
                   
                  actionPosition="left"
                  // sName={classes.GridListTileBar}
                />
              ) : (
                <GridListTileBar
                  title={row["name"]}
                  titlePosition="top"
                  actionPosition="left"
                  // sName={classes.GridListTileBar}
                />
              )}
              {/* 
              <GridListTileBar
                title={row["name"]}
                titlePosition="top"
                actionPosition="left"
                clas
                sName={classes.GridListTileBar}
              /> */}
            </GridListTile>
          ))}
          {/* </Router> */}
        </GridList>
      </div>
    );
  }
}
