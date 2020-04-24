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
import background from "../background.jpg";
import binge from "../binge.jpg";
import logo from "../logo.png";

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
        console.log(response);
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
        alert("You already added this movie");
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
        alert("could not find it : ( try a different name?")
      });
  }
  function createMovie(params){
    const state = {
      name: params["movieName"],
      genre: params["genre"],
      country: params["country"],
      runtime: params["runtime"],
      year: params["year"]
    };
    console.log(params);
    axios
    .post("http://localhost:8080/api/movies/create/?"+"country="+params["country"]+"&"+
    "genre="+params["genre"]+"&"+
    "name="+params["movieName"]+"&"+
    "runtime="+params["runtime"]+"&"+
    "year="+params["year"])
    .then(function(response){
      console.log(response)
    })
    .catch(function(error){
      console.log(error);
    })
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
<img src={logo} style={{  
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat'
}}/>
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

{localStorage.getItem("role")==="ADMIN"? 

<form
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit(createMovie)}
            >
              <Grid
                container
                justify="center"
                style={{ paddingBottom: "1rem" }}
              >
                <Grid  item xs={12} sm={12} md={12} lg={12}>
                  <TextField required
                    name="movieName"
                    id="standard-basic1"
                    label="Movie Name"
                    fullwidth="true"
                    inputRef={register}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <TextField required
                    name="genre"
                    id="standard-basic"
                    label="genre"
                    fullwidth="true"
                    inputRef={register}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <TextField required
                    name="country"
                    id="standard-basic"
                    label="country"
                    fullwidth="true"
                    inputRef={register}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <TextField required
                    name="runtime"
                    id="standard-basic"
                    label="runtime"
                    fullwidth="true"
                    inputRef={register}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <TextField required
                    name="year"
                    id="standard-basic"
                    label="year"
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
                  md={5}
                  lg={5}
                  fullwidth="true"
                >
                  <Button variant="contained" color="primary" type="submit">
                    Create a new Movie
                  </Button>
                </Grid>
                <Grid
                  container
                  justify="center"
                  item
                  xs={12}
                  sm={12}
                  md={5}
                  lg={5}
                  fullwidth="true"
                >
                </Grid>
              </Grid>
            </form>: ""}
          {movieList.map((row) => (
            <GridListTile 
              key={row["id"]}
              // cols={row.featured ? 2 : 1}
              // rows={row.featured ? 2 : 1}
            >
              <Link to={"/moviedetail/" + row["name"]}>
                <img src={row["poster"]} alt={row["name"] } />
              </Link>
              {localStorage.getItem("role")!=="CRITIC"&&localStorage.getItem("username") ? (



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
