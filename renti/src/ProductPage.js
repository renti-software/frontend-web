import React from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import RentiFooter from "./RentiFooter";
import colors from './Colors';
import Button from '@material-ui/core/Button';
import Box from "@material-ui/core/Box";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Row from "react-bootstrap/Row";
import {MdPhone, MdPlace, MdSearch, MdLooks} from "react-icons/md";
import {IoMdPricetag} from 'react-icons/io';
import {Link, useHistory} from "react-router-dom";

// API stuff
let API_IP = '192.168.160.62';
if (process.env.REACT_APP_API_IP) {
  API_IP = process.env.REACT_APP_API_IP;
}

let API_URL = "http://" + API_IP + ":8080/products/";

export default class ProductPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {product: {}, location: {}};
  }

  componentDidMount() {
    this.Product();
  }


  handleProduct(prod_id){
    fetch(API_URL + this.props.match.params.id)
      .then(res => res.json())
      .then(result => {
        this.setState({product: result, location: result.location});
      });
  }

  Product() {
    fetch(API_URL + this.props.match.params.id)
      .then(res => res.json())
      .then(result => {
        this.setState({product: result, location: result.location});
      });
  }

  render() {
    const p = this.state.product;
    const l = this.state.location;
    console.log(p);
    return (
      <React.Fragment>

        <Container style={{alignItems:'flex-start',justifyContent:'flex-start', marginTop: 40}}>
          <img
            src={p.imageLink}
            style={{maxHeight:200}}
          />
          <Typography variant="h4" style={{marginTop: 20}}>
            {p.name}
          </Typography>
          <Typography variant="body1">
            {l.cityName}, {l.country}
          </Typography>
          <Typography variant="body1">
            {p.price} €
          </Typography>
          <Typography variant="body1">
            {p.description}
          </Typography>

          <Row style={{textAlign: 'center', justifyContent:'center'}}>
            <CardActions
              style={{ alignItems: 'center', justifyContent: 'center', alignContent: 'center'}}>
              <Button onClick={() => this.addFavourites(p.id)} size="large" style={{color: 'white', backgroundColor: colors.orange}}>
                Favourite
              </Button>
            </CardActions>
            <CardActions
              style={{ alignItems: 'center', justifyContent: 'center', alignContent: 'center'}}>
              <Button onClick={() => this.handleProduct(p.id)} size="large" style={{color: 'white', backgroundColor: colors.primary}}>
                Buy
              </Button>
            </CardActions>
          </Row>

        </Container>
        <Box mt={5}>
          <RentiFooter/>
        </Box>
      </React.Fragment>
    )
  };
}
