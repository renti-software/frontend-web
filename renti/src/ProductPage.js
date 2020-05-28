import React from "react";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

// API stuff
let API_IP = '192.168.160.62';
if (process.env.REACT_APP_API_IP) {
  API_IP = process.env.REACT_APP_API_IP;
}

let API_URL = "http://" + API_IP + ":8080/products/";

export default class ProductPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {product: {}};
  }

  componentDidMount() {
    this.Product();
  }

  Product() {
    fetch(API_URL + this.props.match.params.id)
      .then(res => res.json())
      .then(result => {
        this.setState({product: result});
      });
  }

  render() {
    const p = this.state.product;
    console.log(p);
    return (
      <React.Fragment>
        <Container>
          <Typography variant="h4">
            {p.name}
          </Typography>
          <Typography variant="h4">
            {p.price} €
          </Typography>
          <Typography variant="h4">
            {/*{p.location.cityName}, */}
          </Typography>

        </Container>
      </React.Fragment>
    )
  };
}
