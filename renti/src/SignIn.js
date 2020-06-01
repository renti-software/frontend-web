import React, {useState, useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Colors from "./Colors";
import RentiFooter from "./RentiFooter";
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


//const API_URL = "http://192.168.160.62:8080";

let API_IP = '192.168.160.62';
if (process.env.REACT_APP_API_IP) {
  API_IP = process.env.REACT_APP_API_IP;
}

const API_URL = "http://" + API_IP + ":8080";
console.log(API_URL)

export default function SignIn() {
  const classes = useStyles();
  const history = useHistory();

  let userID = localStorage.getItem('userID')
  console.log('user id is:', userID)
  useEffect(() => {
    localStorage.clear()
    if(userID != null ){
      //history.push('/marketplace')
    }
  }, [])

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleLogin(){
    if (email == "" || password == "") {
      alert("Fill in the login information");
    } else {
      console.log("Fetching:" + `${API_URL}/login`);
      fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      })
        .then(response => response.json())
        .then(json => {
          console.log(json);
          if (json.error) {
            //Credentials incorrect
            alert("Login Credentials are invalid.");
          } else {
            
            alert(`Welcome to Renti, ${json.user.name}`)
            localStorage.setItem('userID', json.user.id)
            history.push('/marketplace')
            //change route

          }
        })
        .catch(error => {
          alert("Error fetching login");
          console.log(error);
        });
    }
  }

  //functions to handle events
  function handleUsername(event) {
    let sv = event.target.value
    setEmail(sv)
  }

  function handlePassword(event) {
    let sv = event.target.value
    setPassword(sv)
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline/>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon/>
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            onChange={handleUsername.bind(this)}
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            onChange={handlePassword.bind(this)}
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary"/>}
            label="Remember me"
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => handleLogin()}
            className={classes.submit}
            style={{backgroundColor: Colors.primary}}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link variant="body2" to="#">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link variant="body2" to="/register">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <RentiFooter/>
      </Box>
    </Container>
  );
}
