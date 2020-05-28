import React from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import RentiFooter from "./RentiFooter";
import Box from "@material-ui/core/Box";

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
        <Container>
          <Typography variant="h4">
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


        </Container>
        <Box mt={5}>
          <RentiFooter/>
        </Box>
      </React.Fragment>
    )
  };
}
