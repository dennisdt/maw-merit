import React, { Component } from "react";
import { Grid, Row, Col, FormGroup, Label } from "react-bootstrap";
import { Card, CardBody, CardFooter, CardHeader, CardTitle } from "reactstrap";
import { GetUserInfo } from "../services/rewards.service";
import { RedeemReward, CancelReward } from "../services/administator.service";
class Administrator extends Component {
  state = {
    username: "",
    firstName: "",
    lastName: "",
    points: null,
    joined: "",
    pendingRewards: [],
    searched: false
  };

  searchUser = () => {
    GetUserInfo(this.state.username).then(response => {
      console.log(response);
      const data = response.data;
      this.setState({
        points: data.points,
        name: data.firstname + " " + data.lastname,
        joined: data.date,
        pendingRewards: data.pending_rewards,
        searched: true
      });
    });
  };
  onChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  onRedeem = id => {
    RedeemReward(this.state.username, id).then(() => {
      this.searchUser();
    });
  };
  onCancel = id => {
    CancelReward(this.state.username, id).then(() => {
      this.searchUser();
    });
  };
  render() {
    return (
      <Grid className="first">
        <Row>
          <Col md={12}>
            <h1>Administrator</h1>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <img className="banner" src="/assets/img/makeawish/vconnex.png" />
          </Col>
        </Row>
        <br/>
        <Row>
          <Col md={12}>
            <FormGroup>
              <Label style={{ fontSize: "18px" }}>Search Username: </Label>
              <input
                className="inline ip2"
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.onChange}
                style={{ fontSize: "18px" }}
              />
              <span> </span>
              <button
                className="button"
                input="button"
                style={{ fontSize: "18px" }}
                onClick={() => this.searchUser()}
              >
                Search
              </button>
            </FormGroup>
          </Col>
        </Row>
        {this.state.searched ? (
          <div>
            <Row>
              <Col md={12}>
                <Card className="user-data">
                  <h2>Volunteer Info:</h2>
                  Name: {this.state.name}
                  <br />
                  Points: {this.state.points}
                  <br />
                  Joined: {this.state.joined}
                  <br />
                </Card>
              </Col>
            </Row>
            <br />
            <Row>
              <Col md={12}>
                <h2>Pending Events & Referrals:</h2>
                <table className="table table-hover table-bordered">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Description</th>
                      <th>Point Value</th>
                      <th>Redeem</th>
                      <th>Cancel</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.pendingRewards
                      ? this.state.pendingRewards.map(rewards => (
                          <tr>
                            <td>{rewards.date}</td>
                            <td>{rewards.description}</td>
                            <td>{rewards.point_value}</td>
                            <td
                              onClick={() =>
                                this.onRedeem(JSON.stringify(rewards))
                              }
                            >
                              <i className="fas fa-check" />
                            </td>
                            <td onClick={() => this.onCancel(rewards.id)}>
                              <i className="fas fa-trash-alt" />
                            </td>
                          </tr>
                        ))
                      : ""}
                  </tbody>
                </table>
              </Col>
            </Row>
          </div>
        ) : (
          ""
        )}
      </Grid>
    );
  }
}
export default Administrator;
