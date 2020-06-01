import React , {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Colors from "./Colors";
import {Link, useHistory} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow:1,
    alignItems:'flex-start',
    justifyContent:'flex-start',
    flex:1,
  },
}));

export default function NavBar() {
  const classes = useStyles();
  let userID = localStorage.getItem('userID')
  const history = useHistory();

  function handleLogout(){
    localStorage.clear()
  }

  if (userID==null) {
    return (
      <div className={classes.root}>
        <AppBar position="relative" style={{backgroundColor: Colors.primary}}>
          <Toolbar>
            <Button color="inherit" align="right" href="/login">Sign In</Button>
            <Button color="inherit" align="right" href="/sign_up">Sign Up</Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  } else {
    return (
      <div className={classes.root}>
        <AppBar position="relative" style={{backgroundColor: Colors.primary}}>
          <Toolbar>
            <Button color="inherit" noWrap className={classes.title} align="left" href="/marketplace">Renti Marketplace</Button>
            <Button color="inherit" href="/create">Rent Product</Button>
            <Button color="inherit" href="/favourites">Favourites</Button>
            <Button color="inherit" href="/my_rentals">My Rentals</Button>
            <Button color="inherit" href="/login">Sign Out</Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

