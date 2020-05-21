import React from 'react';
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

const hook_cards = [
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
                  <Button variant="primary" class="btn btn-primary" style={{backgroundColor:colors.primary}}>
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
            {hook_cards.map((card) => (
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
