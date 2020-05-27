import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Colors from "./Colors";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function NavBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="relative" style={{backgroundColor: Colors.primary}}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap className={classes.title} align="left">
            Renti Marketplace
          </Typography>
          <Button color="inherit" href="/login">Sign In</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

