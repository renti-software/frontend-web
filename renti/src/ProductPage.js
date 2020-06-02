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

let API_URL = "http://" + API_IP + ":8080/";

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

  smallerThan4Days(){

    // To calculate the time difference of two dates 
    var Difference_In_Time = this.state.ranges.endDate.getTime() - this.state.ranges.startDate.getTime(); 
      
    // To calculate the no. of days between two dates 
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24); 

    return Difference_In_Days <= 4 ? true : false
  }


  handleProduct(prod_id){
    const userID = localStorage.getItem('userID')

    //Rentals for longer than 4 days
    if (this.smallerThan4Days()){
      if (this.state.flag_range && userID !=null) {
        fetch(`${API_URL}/rentals`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({   
            renter : { id: userID},
            product : { id : prod_id},
            startDate : this.state.ranges.startDate,
            endDate : this.state.ranges.endDate,
            approved: false
          }
        )})
        //here have the user ID to show only his
          .then(res => res.json())
          .then(result => {
              alert("You have requested this product to the owner!")
            },
  
            (error) => {
              alert("Error requesting!")
            }
          );
          
      } else {
        alert("Choose a date!")
      }
    } else {
      alert("Contact us: info@renti , for discounted prices on rentals longer than 4 days!")
    }
  }

  fetchProduct() {
    fetch(API_URL + '/products/' + this.props.match.params.id)
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

  addFavourites(prod_id){
    let userID = localStorage.getItem('userID')
    if (userID !=null) {
      fetch(`${API_URL}/favourites`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({   
          renter : { id: userID},
          product : { id : prod_id},
        }
      )})
      //here have the user ID to show only his
        .then(res => res.json())
        .then(result => {
            alert("You have added this product to your favourites!")
          },

          (error) => {
            alert("Error adding!")
          }
        );
        
    } else {
      alert("Login first!")
    }
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
