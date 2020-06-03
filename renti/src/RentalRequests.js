import React, {useState, useEffect} from 'react';
import colors from './Colors';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import {MdPhone, MdPlace, MdSearch} from "react-icons/md";
import {IoMdPricetag, IoMdTrash, IoMdCheckmark} from 'react-icons/io';
import {FaGitlab} from 'react-icons/fa';
import Row from "react-bootstrap/Row";
import RentiFooter from "./RentiFooter";
import {Link, useHistory} from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  cardDescription: {
    textAlign: 'left',
    marginLeft: 12
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

//const API_URL = "http://192.168.160.62:8080";

let API_IP = '192.168.160.62';
if (process.env.REACT_APP_API_IP) {
  API_IP = process.env.REACT_APP_API_IP;
}

const API_URL = "http://" + API_IP + ":8080";
console.log(API_URL)

export default function MyRentals() {

  const [cards, setCards] = useState([]);
  const classes = useStyles();

  //only fetch prodcuts with approval=false
  function makeProductRequest() {
    let userID = localStorage.getItem('userID')
    console.log('user id is: ', userID)
    if (userID==null) {
      alert("Login to see your rentals.")
    } else {
    fetch(`${API_URL}/rentals?ownerId=${userID}&approved=false`)
    //here have the user ID to show only his
      .then(res => res.json())
      .then(result => {
          console.log(`Products fetched:`)
          console.log(result)
          if(Array.isArray(result)){
            setCards(result)
          }
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          alert("Error fetching products!")
        }
      )
      }
  }

  function approveRental(rental_id){
      putApproval(rental_id)
  }

  //PUT, change product approval to true
  function putApproval(rental_id) {
    if (rental_id==null) {
      alert("Failed to approve rental")
    } else {
    fetch(`${API_URL}/rentals`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({     
        id : rental_id,     
        approved : true,    
      }
    )})
    //here have the user ID to show only his
      .then(res => res.json())
      .then(result => {
          alert("Approved with success")
          makeProductRequest()
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          alert("Error approving!")
        }
      )
      }
  }

  function deleteRental(rental_id){
    delApproval(rental_id)
  }

//PUT, change product approval to true
function delApproval(rental_id) {
  if (rental_id==null) {
    alert("Failed to delete rental")
  } else {
  fetch(`${API_URL}/rentals`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({     
        id : rental_id,     
      })
    })
  //here have the user ID to show only his
    .then(res => res)
    .then(result => {
        alert("Deleted with success")
        makeProductRequest()
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
        alert("Error deleting rentals!")
      }
    )
    }
}

  useEffect(() => {
    makeProductRequest()
  }, [])

  //dumb hardcoded flag to bypass refactoring and precious time
  function checkSearchValue() {
    return true
  }

  return (
    <React.Fragment>
      <CssBaseline/>
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="md">
            <Typography component="h4" variant="h3" align="center" color={colors.secondary} gutterBottom>
              Check your rentals
            </Typography>  
            <Link variant="h2" to="/my_rentals">
                Go back to rentals
              </Link>         
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card) => {
              console.log("EACH CARD SHOWS: ")
              console.log(card)
              let image = card.product.imageLink;
              if (image==null || image=="") {
                image = 'https://www.geographicexperiences.com/wp-content/uploads/revslider/home5/placeholder-1200x500.png'
              };
              return checkSearchValue(card.product.name) ?
                <Grid item xs={12} sm={6} md={4}>
                  <Card className={classes.card}>
                    <CardMedia
                      className={classes.cardMedia}
                      image={image}
                      title="Image title"
                    />
                    <CardContent style={{textAlign: 'center'}} className={classes.cardContent}>
                      <Typography gutterBottom variant="h5" component="h3">
                        {card.product.name}
                      </Typography>
                    </CardContent>
                    <CardContent style={{textAlign: 'center'}} className={classes.cardContent}>
                      <Typography gutterBottom>
                        {card.startDate} to {card.endDate}
                      </Typography>
                      <Typography gutterBottom>
                        From user: {card.renter.name} 
                      </Typography>
                    </CardContent>
                    <Row style={{textAlign: 'center'}}>
                      <CardActions
                        style={{flex: 2, alignItems: 'center', justifyContent: 'center', alignContent: 'center'}}>
                        <Button size="medium" onClick={() => approveRental(card.id)} style={{color: 'white', backgroundColor: colors.primary, minWidth:110}}>
                          Approve
                        </Button>
                      </CardActions>
                      <CardActions
                        style={{flex: 2, alignItems: 'center', justifyContent: 'center', alignContent: 'center'}}>
                        <Button size="medium" onClick={() => deleteRental(card.id)} style={{color: 'white', backgroundColor: 'red', minWidth:110}}>
                          Dissaprove
                        </Button>
                      </CardActions>
                    </Row>
                  </Card>
                </Grid>
                :
                <Grid/>
            })}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <RentiFooter/>

      {/* End footer */}
    </React.Fragment>
  );
}
