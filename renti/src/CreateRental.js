import React , {useState, useEffect} from 'react';
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

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

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

let API_IP = '192.168.160.62';
if (process.env.REACT_APP_API_IP) {
  API_IP = process.env.REACT_APP_API_IP;
}

const API_URL = "http://" + API_IP + ":8080";
console.log(API_URL)

export default function SignUp() {
  const classes = useStyles();
  const history = useHistory()

  const [name,setName] = useState('')
  const [category,setCategory] = useState('')
  //this will be similar to locations in future iterations, so the admins can add more categories
  const [categories, setCategories] = useState(
    [
      {label: 'Clothing', value: 'Clothing' },
      {label: 'Household', value: 'Household' },
      {label: 'Tools', value: 'Tools' },
      {label: 'Driving', value: 'Driving' },
      {label: 'Electronics', value: 'Electronics' },
      {label: 'Entertainment', value: 'Entertainment' },
      {label: 'Miscellaneous', value: 'Miscellaneous' },
    ]
  )
  const [location,setLocation] = useState('')
  const [locationName,setLocationName] = useState('')
  const [description,setDescription] = useState('')
  const [cities,setCities] = useState([])
  const [price,setPrice] = useState(0)
  const [imageLink,setImageLink] = useState('')

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

  //Category
  function handleName(event) {
    let sv = event.target.value
    setName(sv)
  }

  function handleCategory(event) {
    setCategory(event.value)
    setLocation(location)
  }

  function handleDescription(event) {
    let sv = event.target.value
    setDescription(sv)
  }

  function handleLocation(text){
    setLocation(text.value)
    setLocationName(text.label)
    setCategory(category)
  }

  function handlePrice(event) {
    let sv = event.target.value
    setPrice(sv)
  }

  function handleImageLink(event) {
    let sv = event.target.value
    setImageLink(sv)
  }

  function handleCreate(){
    let userID = localStorage.getItem('userID')
    let priceParsed = parseFloat(price)
    console.log('user id is: ', userID)
    if (userID==null) {
      alert("Login before posting products!")
    } else {
      if (name=='' || location=='' || category=='' || price=='' || imageLink=='') {
        alert("Fill in the required information!")
    } else {
        console.log("Fetching:" + `${API_URL}/products`)
        console.log(JSON.stringify({     
          name : name,     
          price : priceParsed,    
          category : category,
          imageLink : imageLink,
          description : description,
          user : {      id : userID     },     
          location : {      id : location     } 
        }))
    fetch(`${API_URL}/products`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({     
          name : name,     
          price : priceParsed,    
          category : category,
          imageLink : imageLink,
          description : description,
          user : {      id : userID     },     
          location : {      id : location     } 
        }),
      }).then((response) => response.json())
      .then((json) => {
            console.log(json);
            if (json.error){
            //Credentials incorrect
                alert(json.message)
            }
            else { 
                alert("Product created with success!")
                history.push('/')
            }
      })
      .catch((error) => {
          alert("Error posting product!")
          console.log(error);
      });
    }
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Create a Rental
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="product_name"
                variant="outlined"
                required
                fullWidth
                id="product_name"
                onChange={handleName.bind(this)}
                label="Product Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="description"
                onChange={handleDescription.bind(this)}
                label="Description"
                name="description"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="price"
                label="Price"
                onChange={handlePrice.bind(this)}
                type="number"
                id="price"

              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="image"
                onChange={handleImageLink.bind(this)}
                label="Image Link"
                type="text"
                id="image"
              />
            </Grid>

            <Grid item xs={12}>
              <Dropdown value={locationName} onChange={(text) => handleLocation(text)} options={cities} placeholder="Select a city" />
            </Grid>

            <Grid item xs={12}>
              <Dropdown value={category} onChange={(text) => handleCategory(text)} options={categories} placeholder="Select a category" />
            </Grid>

          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => handleCreate()}
            className={classes.submit}
          >
            Create
          </Button>
        </form>
      </div>
      <Box mt={5}>
        <RentiFooter />
      </Box>
    </Container>
  );
}
