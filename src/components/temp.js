import React, { useState, useEffect } from "react";
import { Grid, TextField, Button, makeStyles, IconButton } from "@material-ui/core";
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
    GridListTileBar

  } from "@material-ui/core";
  import StarBorderIcon from '@material-ui/icons/StarBorder';
  


  const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList:{
        width:500,
        height:750,
        transform:'translateZ(0)'
    },
    titleBar: {
        background:
          'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
          'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
      },
      icon: {
        color: 'white',
      },
  }));

export default function MovieFun() {
    const { handleSubmit, register } = useForm();
        const [movieList, setMovieList] = useState([]);
        const [redirect, setRedirect] = useState(false);
        const classes = useStyles();
      
        function getMovieList() {
          axios
            .get("http://ec2-18-220-141-147.us-east-2.compute.amazonaws.com:8083/api/movies")
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
                "http://ec2-18-220-141-147.us-east-2.compute.amazonaws.com:8083/api/movies/find/?name=" +
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
    <GridList cellHeight={300} spacing={1} className={classes.gridList}>
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

              {movieList.map((row) => (
                  <GridListTile key={row["poster"]} cols={row.featured ? 2:1 } rows={row.featured ? 2:1}>
                    <img src={row["poster"]} alt={row["name"]}/>
                    <GridListTileBar
                    title={row["name"]}
                    titlePosition="top"
                    actionIcon={
                        <IconButton aria-label={'star${row["name"]}'}
                        className={classes.icon}>
                            <StarBorderIcon color = "primary"/>
                       </IconButton>
                    }
                    actionPosition="left"
                    className={classes.GridListTileBar}
                    />
                  </GridListTile>
                  

              ))}
              

    </GridList>
  </div>
  );
}
}
