import React, { useState , useEffect} from 'react';
import {Grid, Paper,Checkbox} from '@material-ui/core';
import {TableContainer,Table,TableBody,TableCell,TableHead,TableRow} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));


function App() {
  const [userList, setUserList] = useState([]);
  const classes = useStyles();

  function getUserList() {
    axios.get("http://localhost:8080/api/user/description")
    .then(function(response) {
      console.log(response);
      setUserList([].concat(response['data']))
    })
    .catch(function(error){
      console.log(error);
    });
  }

  useEffect(() => {
    getUserList();
  }, []);
  
  const colums=[
      {key: 'column1', name:'UserName', fileName: 'userName', minWidth: 100, maxWidth: 200, isResizable: true},
      {key: 'column2', name:'Password', fileName: 'passWord', minWidth: 100, maxWidth: 200, isResizable: true},
    ];


  return (
    <div className={classes.root}>
      <Grid container justify="center">
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>UserName</TableCell>
                  <TableCell>Password</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                  {userList.map((row) => (
                    <TableRow key={row['userName']}>
                      <TableCell component="th" scope="row">{row['userName']}</TableCell>
                      <TableCell>{row['password']}</TableCell>
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

export default App;
