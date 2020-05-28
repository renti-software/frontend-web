import React from "react";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

export default class ProductPage extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Container>
          <Typography variant="h3">
            GoPro S3
          </Typography>
          <Row>
            <Image src='https://source.unsplash.com/random' height="100%" width="320"/>
            <div align="left">
              <Typography variant="body1">
                Location: Aveiro, Portugal
              </Typography>
              <Typography variant="body1">
                Price: 13€ p/ day
              </Typography>
            </div>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}
