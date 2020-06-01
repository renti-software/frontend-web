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
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';

// API stuff
let API_IP = '192.168.160.62';
if (process.env.REACT_APP_API_IP) {
  API_IP = process.env.REACT_APP_API_IP;
}

let API_URL = "http://" + API_IP + ":8080/products/";

export default class ProductPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {}, 
      location: {},
      flag_range: false,
      ranges: 
        {
          startDate: new Date(),
          endDate: new Date(),
          key: 'selection',
        }
    };
  }

  componentDidMount() {
    this.fetchProduct();
  }


  handleProduct(prod_id){
    if (this.state.flag_range) {
      fetch(API_URL + this.props.match.params.id)
      .then(res => res.json())
      .then(result => {
        this.setState({product: result, location: result.location});
      });
    } else {
      alert("Choose a date!")
    }
  }

  fetchProduct() {
    fetch(API_URL + this.props.match.params.id)
      .then(res => res.json())
      .then(result => {
        this.setState({product: result, location: result.location});
      });
  }

  handleSelect(ranges){
    console.log(ranges);
    this.setState({
      ranges: ranges.selection,
      flag_range : true
    })
    // {
    //   selection: {
    //     startDate: [native Date Object],
    //     endDate: [native Date Object],
    //   }
    // }
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
          <DateRange
            showMonthArrow={false}
            showDateDisplay={false}
            showSelectionPreview={false}
            showMonthAndYearPickers={false}
            showPreview={false}
            minDate={new Date()}
            ranges={[this.state.ranges]}
            onChange={(ranges) => this.handleSelect(ranges)}
          />
        </Container>
        <Box mt={5}>
          <RentiFooter/>
        </Box>
      </React.Fragment>
    )
  };
}
