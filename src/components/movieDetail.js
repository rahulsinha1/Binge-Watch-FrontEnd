import React, { useState, useEffect } from "react";
import { Grid, TextField, Button, makeStyles } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Text, View } from "react-native";
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
    <div class="container-fluid app-container" className={classes.root}>
    <Grid container justify="center">
      <Grid item xs={12} sm={12} md={6} lg={6}>
          <h3>
          {movieList.map((row)=>(
<h1 key={row["name"]}>
    <h1>{row["name"]}</h1>
    <img src={row["poster"]} alt={row["name"]} />
    <View style={{flexDirection:'row'}}>
    <h4>Country:     <h5>{row["country"]}</h5> </h4>

    </View>


    <body>{row["year"]}</body>

</h1>
))

          }
          </h3>

  
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

      </Grid>
      
    </Grid>
  </div>
  );
}
}
