import React, {useState, useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import RentiFooter from "./RentiFooter";
import Colors from "./Colors";
import {Link, useHistory} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: Colors.primary
  },
}));

//const API_URL = "http://192.168.160.62:8080";

let API_IP = '192.168.160.62';
if (process.env.REACT_APP_API_IP) {
  API_IP = process.env.REACT_APP_API_IP;
}

const API_URL = "http://" + API_IP + ":8080";
console.log(API_URL)

export default function SignUp() {
  const classes = useStyles();
  const history = useHistory();

  const [email, setEmail] = useState('');
  //start these off as empty, then fill with get of locations
  const [cities, setCities] = useState([]);
  const [location, setLocation] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  useEffect( () => {
    getCities()
  }, []) //this empty array makes the use effect only once

  function getCities(){
    let base_link = `${API_URL}/locations`
    console.log(base_link)
      fetch(base_link, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        }
      })
        .then((response) => response.json())
        .then(json => {
          console.log(json)
          if (json.error) {
            alert("Failed fetching cities!");
          } else {
            // Success
            let message = json
            let new_cities = []

            for (let index = 0; index < message.length; index++) {
              const city = message[index];

              var dict = {
                label : city.cityName,
                value : city.id,
              }

              new_cities.push(dict)
              
            }

            console.log(new_cities)

            // solution nº46
            setCities(new_cities)

          }
        })
        .catch(error => {
          alert("Error fetching cities.");
          console.log(error);
        });
  }

  //functions to handle events
  function handleEmail(event) {
    let sv = event.target.value
    setEmail(sv)
  }

  function handleName(event) {
    let sv = event.target.value
    setName(sv)
  }

  function handlePassword(event) {
    let sv = event.target.value
    setPassword(sv)
  }

  function handleRegister(){
    if (email=='' || name=='' || location=='' || password=='') {
      alert("Fill in the required information!")
  } else {
      console.log("Fetching:" + `${API_URL}/users`)
      console.log(JSON.stringify({ //change these params later
          email:email,
          name:name,
          location: location,
          password:password, //this shouldnt go out as clear text
      }))
  fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ //change these params later
          email:email,
          name:name,
          location: { id :location},
          password:password, //this shouldnt go out as clear text
      }),
    }).then((response) => response.json())
    .then((json) => {
          console.log(json);
          if (json.error){
          //Credentials incorrect
              alert(json.message)
          }
          else { 
              alert("Account created with success!")
              history.push('/')
          }
    })
    .catch((error) => {
        alert("Error fetching login")
        console.log(error);
    });
  }
  }

  function handleLocation(text){
    setLocation(text.value)
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                name="firstName"
                variant="outlined"
                required
                onChange={handleName.bind(this)}
                fullWidth
                id="firstName"
                label="Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                onChange={handleEmail.bind(this)}
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                onChange={handlePassword.bind(this)}
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Dropdown onChange={(text) => handleLocation(text)} options={cities} placeholder="Select an option" />
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => handleRegister()}
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <RentiFooter />
      </Box>
    </Container>
  );
}
