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

  function makeProductRequest() {
    //change this line into the users ID, so we can fetch only his
    fetch(`${API_URL}/products?userId=4`)
    //here have the user ID to show only his
      .then(res => res.json())
      .then(result => {
          console.log(`Products fetched:`)
          console.log(result)
          setCards(result)
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          alert("Error fetching products!")
        }
      )
  }

  useEffect(() => {
    makeProductRequest()
  })

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
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card) => {
              return checkSearchValue(card.name) ?
                <Grid item xs={12} sm={6} md={4}>
                  <Card className={classes.card}>
                    <CardMedia
                      className={classes.cardMedia}
                      image={'https://gitlab.com/uploads/-/system/group/avatar/7865598/icon.png?width=64'}
                      title="Image title"
                    />
                    <CardContent style={{textAlign: 'center'}} className={classes.cardContent}>
                      <Typography gutterBottom variant="h5" component="h3">
                        {card.name}
                      </Typography>
                    </CardContent>
                    <CardContent style={{textAlign: 'center'}} className={classes.cardContent}>
                      <Typography gutterBottom>
                        {card.location.cityName}, {card.location.country}
                      </Typography>
                    </CardContent>
                    <Row style={{textAlign: 'center'}}>
                      <CardContent
                        style={{flex: 1, alignItems: 'center', justifyContent: 'center', alignContent: 'center'}}>
                        <Typography gutterBottom>
                          {card.price}€ /day
                        </Typography>
                      </CardContent>
                      <CardActions
                        style={{flex: 1, alignItems: 'center', justifyContent: 'center', alignContent: 'center'}}>
                        <Button size="large" style={{color: 'white', backgroundColor: colors.primary}}>
                          <IoMdCheckmark/>
                        </Button>
                      </CardActions>
                      <CardActions
                        style={{flex: 1, alignItems: 'center', justifyContent: 'center', alignContent: 'center'}}>
                        <Button size="large" style={{color: 'white', backgroundColor: colors.orange}}>
                          <IoMdTrash/>
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
