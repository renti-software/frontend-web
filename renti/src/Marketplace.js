import React from 'react';
import colors from './Colors';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
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
import Link from '@material-ui/core/Link';
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import {MdPhone, MdPlace, MdSearch} from "react-icons/md";
import {IoMdCalendar} from 'react-icons/io';
import Row from "react-bootstrap/Row";

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

const cards = [
  {
      "id" : "1",
      "name" : "GoPro Hero5",
      "image" : "https://www.backscatter.com/ITEM_IMAGES/gp-chdhx-501_1.jpg",
      "location" : "Aveiro, Portugal",
      "price" : "20.00"
  },
  {
      "id" : "2",
      "name" : "Muletas",
      "image" : "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQaQif8TkLykf9ABY2Bm4JK_TE_F_o_zDdXkucVpHkUA9N07TQ1&usqp=CAU",
      "location" : "Porto, Portugal",
      "price" : "2.00"
  },
  {
      "id" : "3",
      "name" : "Boss RC-505",
      "image" : "https://static.fnac-static.com/multimedia/Images/PT/NR/78/a6/0a/697976/1540-6/tsp20160818141512/Bo-Loop-Station-RC-505.jpg",
      "location" : "Aveiro, Portugal",
      "price" : "52.50"
  },
  {
      "id" : "4",
      "name" : "Fato Homem - M",
      "image" : "https://www.youlikeitstore.com/wp-content/uploads/2019/08/8718475994657_a_en_hd_1.jpg",
      "location" : "Lisboa, Portugal",
      "price" : "18.00"
  },
  {
      "id" : "5",
      "name" : "Fato Homem - XL",
      "image" : "https://www.youlikeitstore.com/wp-content/uploads/2019/08/8718475994657_a_en_hd_1.jpg",
      "location" : "Lisboa, Portugal",
      "price" : "19.30"
  },
];

export default function Marketplace() {
  const classes = useStyles();
  let alignLeft = {textAlign: 'left'};

  let padding = {marginLeft: 12};
  return (
    <React.Fragment>
      <CssBaseline/>
      <AppBar position="relative">
        <Toolbar>
          <CameraIcon className={classes.icon}/>
          <Typography variant="h6" color="inherit" noWrap>
            Renti Marketplace
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="md">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Renti Marketplace
            </Typography>
            <div>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Search product or equipment..."
                  aria-label="Search product or equipment..."
                  aria-describedby="basic-addon2"
                />
                <InputGroup.Append>
                  <Button variant="primary" class="btn btn-primary">
                    <MdSearch/>
                  </Button>
                </InputGroup.Append>
              </InputGroup>
            </div>
            <InputGroup className="mb-3" size="sm">
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <MdPlace/>
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                placeholder="Local"/>
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <IoMdCalendar/>
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                placeholder="From"/>
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <IoMdCalendar/>
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                placeholder="To"/>

            </InputGroup>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card.id} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={card.image}
                    title="Image title"
                  />
                  <CardContent style={{textAlign: 'center'}} className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h3">
                      {card.name}
                    </Typography>
                  </CardContent>
                  <CardContent style={{textAlign: 'center'}} className={classes.cardContent}>
                    <Typography gutterBottom>
                      {card.location}
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
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Something here to give the footer a purpose!
        </Typography>
        <Copyright/>
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}
