import React, {useState} from 'react';
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
import {IoMdPricetag} from 'react-icons/io';
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

export default function Marketplace() {
  const classes = useStyles();

  const [cards, setCards] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [paramLocation, setParamLocation] = useState('');
  const [paramCategory, setParamCategory] = useState('');
  const [paramMinPrice, setParamMinPrice] = useState('');
  const [paramMaxPrice, setParamMaxPrice] = useState('');
  const [paramOrder, setParamOrder] = useState('');
  const [paramOrderAsc, setParamOrderAsc] = useState('');

  function makeProductRequest() {
    console.log(`Params: \nLocation: ${paramLocation}\nCategory: ${paramCategory}\nMinPrice: ${paramMinPrice}\nMaxPrice: ${paramMaxPrice} `)
    let base_link = `${API_URL}/products?`
    if (paramLocation!=''){
      base_link = base_link + `location=${paramLocation}&`
    }
    if (paramCategory!=''){
      base_link = base_link + `category=${paramCategory}&`
    }
    if (paramMinPrice!=''){
      base_link = base_link + `minPrice=${paramMinPrice}&`
    }
    else{
      base_link = base_link + `minPrice=0&`
    }
    if (paramMaxPrice!=''){
      base_link = base_link + `maxPrice=${paramMaxPrice}&`
    }

    if (paramOrder!=''){
      base_link = base_link + `orderParameter=${paramOrder}&`
    }
    else{
      base_link = base_link + `orderParameter=name&`
    }

    if (paramOrderAsc!=''){
      base_link = base_link + `order=${paramOrderAsc}`
    }
    else{
      base_link = base_link + `order=asc`
    }
    fetch(base_link)
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

  //These functions handle inputForm changes
  function handleSearch(event) {
    let sv = event.target.value
    setSearchValue(sv)
  }

  function handleParamLocation(event) {
    let sv = event.target.value
    setParamLocation(sv)
  }

  function handleParamCategory(event) {
    let sv = event.target.value
    setParamCategory(sv)
  }

  function handleParamMinPrice(event) {
    let sv = event.target.value
    setParamMinPrice(sv)
  }

  function handleParamMaxPrice(event) {
    let sv = event.target.value
    setParamMaxPrice(sv)
  }

  function handleParamOrder(event) {
    let sv = event.target.value
    setParamOrder(sv)
  }

  function handleParamOrderAsc(event) {
    let sv = event.target.value
    setParamOrderAsc(sv)
  }

  //This renders conditionally using card mapping
  function checkSearchValue(card_name) {
    return card_name.toLowerCase().includes(searchValue.toLowerCase())
  }

  return (
    <React.Fragment>
      <CssBaseline/>
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
                  onChange={handleSearch.bind(this)}
                />
                <InputGroup.Append>
                  <Button onClick={() => makeProductRequest()} variant="primary" class="btn btn-primary"
                          style={{backgroundColor: colors.primary}}>
                    <MdSearch/>
                  </Button>
                </InputGroup.Append>
              </InputGroup>
            </div>
            <InputGroup className="mb-3" size="sm">
              <InputGroup.Prepend>
                <InputGroup.Text style={{backgroundColor: colors.secondary}}>
                  <MdPlace style={{color: 'white'}}/>
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                placeholder="Local"
                onChange={handleParamLocation.bind(this)}/>
              <InputGroup.Prepend>
                <InputGroup.Text style={{backgroundColor: colors.secondary}}>
                  <IoMdPricetag style={{color: 'white'}}/>
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                placeholder="Category"
                onChange={handleParamCategory.bind(this)}/>
              <InputGroup.Prepend>
                <InputGroup.Text style={{backgroundColor: colors.secondary}}>
                  <IoMdPricetag style={{color: 'white'}}/>
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                placeholder="Minimum Price"
                onChange={handleParamMinPrice.bind(this)}/>
              <InputGroup.Prepend>
                <InputGroup.Text style={{backgroundColor: colors.secondary}}>
                  <IoMdPricetag style={{color: 'white'}}/>
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                placeholder="Maximum Price"
                onChange={handleParamMaxPrice.bind(this)}/>
            </InputGroup>
            <InputGroup className="mb-3" size="sm">
              <InputGroup.Prepend>
                <InputGroup.Text style={{backgroundColor: colors.secondary}}>
                  <MdPlace style={{color: 'white'}}/>
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                placeholder="Ordering filter"
                onChange={handleParamOrder.bind(this)}/>
                <InputGroup.Prepend>
                <InputGroup.Text style={{backgroundColor: colors.secondary}}>
                  <MdPlace style={{color: 'white'}}/>
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                placeholder="Asc/Desc"
                onChange={handleParamOrderAsc.bind(this)}/>
            </InputGroup>
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
                          <MdPhone/>
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
