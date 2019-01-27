import React, { Component } from "react";
import { Grid, Row, Col, FormGroup, Label } from "react-bootstrap";
import { ReferFriend } from "../services/referrals.service";

class Referrals extends Component {
  state = {
    first_name: "",
    last_name: "",
    email: "",
    disp_message: false
  };

  renderMessage() {
    if (this.state.disp_message) {
      return <p className="disp-message">Referral sent!</p>;
    }
  }

  render() {
    return (
      <Grid className="first">
        <Row>
          <Col md={12}>
            <h1>Refer a Friend</h1>
            <img
              className="banner"
              src="./assets/img/makeawish/referbanner.png"
            />
            <br/><br/>
            <h3>
              Collect 100 points for each person you refer who becomes a
              volunteer!
            </h3>
          </Col>
        </Row>
        <br />
        <Row>
          <Col md={12}>
            <FormGroup>
              <div>
                <Label style={{ fontSize: "18px" }}>First Name: </Label>
              </div>
              <input
                className="inline ip2"
                type="text"
                name="first_name"
                value={this.state.first_name}
                onChange={this.onChange}
                style={{ fontSize: "18px" }}
              />
            </FormGroup>
            <FormGroup>
              <div>
                {" "}
                <Label style={{ fontSize: "18px" }}>Last Name: </Label>
              </div>

              <input
                className="inline ip2"
                type="text"
                name="last_name"
                value={this.state.last_name}
                onChange={this.onChange}
                style={{ fontSize: "18px" }}
              />
            </FormGroup>
            <FormGroup>
              <div>
                {" "}
                <Label style={{ fontSize: "18px" }}>Email Address: </Label>
              </div>

              <input
                className="inline ip2"
                style={{ fontSize: "18px" }}
                type="text"
                name="email"
                value={this.state.email}
                onChange={this.onChange}
              />
            </FormGroup>
            <FormGroup>
              <button
                className="button"
                style={{ fontSize: "18px" }}
                input="button"
                onClick={() => this.referFriend()}
              >
                Submit
              </button>
            </FormGroup>
            {this.renderMessage()}
          </Col>
        </Row>
      </Grid>
    );
  }
  onChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({
      [name]: value,
      disp_message: false
    });
  };
  referFriend = () => {
    ReferFriend(
      "jj92",
      this.state.first_name,
      this.state.last_name,
      this.state.email
    ).then(() => {
      this.setState({
        first_name: "",
        last_name: "",
        email: "",
        disp_message: true
      });
    });
  };
}
export default Referrals;
