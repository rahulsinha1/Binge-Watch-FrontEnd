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
    Paper

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
              .get(
                "http://localhost:8080/api/movies/find/?name=" +
                  params["name"] 
              )
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
            return <Redirect to='/movie' />;
          } else {
  return (
    <div className={classes.root}>
    <Grid container justify="center">
      <Grid item xs={12} sm={12} md={6} lg={6}>
      <form noValidate autoComplete="off" onSubmit={handleSubmit(search)}>
      <Grid
                container
                justify="center"
                style={{ paddingBottom: "1rem" }}
              >
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
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
              <TableCell>Name</TableCell>
                <TableCell>Imdb rating</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Genere</TableCell>
                <TableCell>Year</TableCell>
                <TableCell>Rated</TableCell>
                <TableCell>Country</TableCell>
                <TableCell>Poster</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {movieList.map((row) => (
                <TableRow key={row["Movie"]}>
                  <TableCell component="th" scope="row">
                    {row["name"]}
                  </TableCell>
                  <TableCell>{row["imdbRating"]}</TableCell>
                  <TableCell>{row["type"]}</TableCell>
                  <TableCell>{row["genre"]}</TableCell>
                  <TableCell>{row["rated"]}</TableCell>
                  <TableCell>{row["year"]}</TableCell>
                  <TableCell>{row["country"]}</TableCell>
                  <TableCell>{row["poster"]}</TableCell>
                </TableRow>
              ))}
              
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      
    </Grid>
  </div>
  );
}
}
