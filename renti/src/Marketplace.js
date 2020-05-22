import React, { useState, useEffect } from 'react';
import colors from './Colors';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import {MdPhone, MdPlace, MdSearch} from "react-icons/md";
import {IoMdPricetag} from 'react-icons/io';
import {FaGitlab} from 'react-icons/fa';
import Row from "react-bootstrap/Row";

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

export default function Marketplace() {
  const classes = useStyles();

  const [cards, setCards] = useState([
    {
      "id": 1,
      "name": "GoPro Hero5",
      "category": null,
      "price": 20,
      "location": {
          "id": 1,
          "cityName": "Aveiro",
          "country": "Portugal"
      },
      "user": {
          "id": 2,
          "name": "user1",
          "email": "user1@gmail.com",
          "location": {
              "id": 1,
              "cityName": "Aveiro",
              "country": "Portugal"
          },
          "password": "ola"
      },
      "description": null
  }
  ]);
  const [searchValue, setSearchValue] = useState('');


  function makeProductRequest() {
    fetch(`${API_URL}/products`)
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

  return (
    <React.Fragment>
      <CssBaseline/>
      <AppBar position="relative" style={{backgroundColor:colors.primary}}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Renti Marketplace
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="md">
            <Typography component="h4" variant="h3" align="center" color={colors.secondary} gutterBottom>
              Rent anything!
            </Typography>
            <div>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Search product or equipment..."
                  aria-label="Search product or equipment..."
                  aria-describedby="basic-addon2"
                />
                <InputGroup.Append>
                  <Button onClick={() => makeProductRequest()} variant="primary" class="btn btn-primary" style={{backgroundColor:colors.primary}}>
                    <MdSearch/>
                  </Button>
                </InputGroup.Append>
              </InputGroup>
            </div>
            <InputGroup className="mb-3" size="sm">
              <InputGroup.Prepend >
                <InputGroup.Text style={{backgroundColor:colors.secondary}}>
                  <MdPlace style={{color:'white'}} />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                placeholder="Local"/>
              <InputGroup.Prepend>
                <InputGroup.Text style={{backgroundColor:colors.secondary}}>
                  <IoMdPricetag style={{color:'white'}}/>
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                placeholder="Minimum Price"/>
              <InputGroup.Prepend>
                <InputGroup.Text style={{backgroundColor:colors.secondary}}>
                  <IoMdPricetag style={{color:'white'}}/>
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                placeholder="Maximum Price"/>

            </InputGroup>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            { cards.map((card) => {
              return true ?
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
                    <CardContent style={{flex:1, alignItems: 'center', justifyContent: 'center', alignContent: 'center'}}>
                      <Typography gutterBottom>
                        {card.price}€ /day
                      </Typography>
                    </CardContent>
                    <CardActions style={{flex:1 ,alignItems: 'center', justifyContent: 'center', alignContent: 'center'}}>
                      <Button size="large" style={{color: 'white',backgroundColor:colors.primary}}>
                        <MdPhone/>
                      </Button>
                    </CardActions>
                  </Row>
                </Card>
              </Grid>
            :
              <Grid />
            })}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <div id="footer">
            <footer id="footer" role="contentinfo">
                <a href="#" class="gotop js-gotop"><i class="icon-arrow-up2"></i></a>
                <div class="container">
                    <div class="">
                        <div class="col-md-12 text-center">
                            <p><strong>Renti 2020 &copy;</strong>  All Rights Reserved. <br /><a href="https://www.ua.pt/deti/">Universidade de Aveiro - DETI</a></p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12 text-center">
                            <a href="https://gitlab.com/renti-software/"><FaGitlab size={40} style={{marginBottom:20, color:colors.primary}}/></a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>

      {/* End footer */}
    </React.Fragment>
  );
}
