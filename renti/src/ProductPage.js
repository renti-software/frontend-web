import React from "react";
import Typography from "@material-ui/core/Typography";
import RentiFooter from "./RentiFooter";
import Box from "@material-ui/core/Box";
import {Button, Container} from "@material-ui/core";
import Image from "react-bootstrap/Image";
import Colors from "./Colors";
import {MdShoppingCart} from "react-icons/all";
import Row from "react-bootstrap/Row";

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
        <Container style={{paddingTop: 32}}>
          <div style={{display: 'flex', flexDirection: 'row'}}>
            <Image
              width={320}
              height="100%"
              src={p.imageLink}
              style={{flex: 1}}/>
            <div align="start" style={{flex: 1}}>
              <Typography variant="h4">
                {p.name}
              </Typography>
              <Typography variant="inherit">
                {l.cityName}, {l.country}
              </Typography>

              <Typography variant="body1" style={{paddingTop: 32}}>
                {(() => {
                  if (p.description !== null)
                    return p.description;
                  return "This is a description template, just for test, delete later"
                })()}
              </Typography>
              <Row style={{alignEnd: true}}>
                {/*TODO: Align at end - make it more pretty*/}
                <Typography variant="body2">
                  {p.price} €
                </Typography>
                <Button onClick={() => null} variant="primary" class="btn btn-primary"
                        style={{backgroundColor: Colors.primary}}>
                  <MdShoppingCart/>
                </Button>
              </Row>
            </div>
            <div style={{flex: 1}}>
              <Typography variant="h4">
                3rd row -> User
              </Typography>
            </div>
          </div>

        </Container>
        <Box mt={5}>
          <RentiFooter/>
        </Box>
      </React.Fragment>
    )
  };
}
