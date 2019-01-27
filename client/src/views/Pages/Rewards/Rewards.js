import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import { GetData, SubtractPoints } from "../services/rewards.service";
class Rewards extends Component {
  state = {
    points: "",
    name: "",
    pending_rewards: [],
    eventHistory: [],
    disp_query: false,
    disp_confirm: false,
    disp_reject: false,
    prize_desc: "",
    prize_value: ""
  };
  componentDidMount() {
    this.getData();
  }
  getData() {
    GetData().then(response => {
      console.log(response);
      const data = response.data;
      this.setState({
        points: data.points,
        name: data.firstname,
        eventHistory: data.rewards_history,
        pending_rewards: data.pending_rewards
      });
    });
  }
  selectPrize(desc, pts) {
    this.setState({
      disp_query: true,
      disp_reject: false,
      disp_confirm: false,
      prize_desc: desc,
      prize_value: pts
    });
  }
  renderQuery() {
    if (this.state.disp_query)
      return (
        <Row>
          <Col md={12}>
            <div className="confirm">
              <div className="hspread vcenter inline">
                <div>
                  Do you want to redeem {this.state.prize_desc} for{" "}
                  {this.state.prize_value} points?
                </div>
                <div>
                  <i
                    onClick={() => this.subtractPoints()}
                    className="fa fa-check"
                    aria-hidden="true"
                  />
                  &nbsp;&nbsp;
                  <i
                    onClick={() => this.closeConfirm()}
                    className="fa fa-times"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>
          </Col>
        </Row>
      );
  }
  renderConfirm() {
    if (this.state.disp_confirm)
      return (
        <Row>
          <Col md={12}>
            <div className="confirm">
              {this.state.prize_desc} was redeemed for {this.state.prize_value}{" "}
              points
            </div>
          </Col>
        </Row>
      );
  }
  renderReject() {
    if (this.state.disp_reject)
      return (
        <Row>
          <Col md={12}>
            <div className="confirm">Insufficient points!</div>
          </Col>
        </Row>
      );
  }
  subtractPoints() {
    var pts = this.state.prize_value;
    if (pts <= this.state.points)
      SubtractPoints(pts).then(() => {
        console.log("hello");
        this.getData();
        this.setState({
          disp_query: false,
          disp_confirm: true
        });
      });
    else {
      this.setState({
        disp_query: false,
        disp_reject: true
      });
    }
  }
  closeConfirm() {
    this.setState({ disp_query: false });
  }
  render() {
    return (
      <div>
        <Grid className="first">
          <Row>
            <Col md={8}>
              <h1>My Rewards</h1>
            </Col>
            <Col md={4}>
              <h2
                style={{
                  color: "#0057b8",
                  textAlign: "center"
                }}
              >
                Total Points: {this.state.points}
              </h2>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <img className="banner" src="/assets/img/makeawish/vconnex.png" />
            </Col>
          </Row>
          <br />
          <Row>
            <Col md={12}>
              <h2>Hi, {this.state.name}!</h2>
              <h2>Rewards Available:</h2>
            </Col>
          </Row>
          <Row>
            <Col
              md={3}
              onClick={() => this.selectPrize("Starbucks Giftcard", 100)}
            >
              <div className="reward img1" />
            </Col>
            <Col md={3}>
              <div className="reward img2" />
            </Col>
            <Col md={3}>
              <div className="reward img3" />
            </Col>
            <Col md={3}>
              <div className="reward img4" />
            </Col>
            <Col md={3}>
              <div className="reward img5" />
            </Col>
            <Col md={3}>
              <div className="reward img6" />
            </Col>
            <Col md={3}>
              <div className="reward img7" />
            </Col>
            <Col md={3}>
              <div className="reward img8" />
            </Col>
          </Row>
          {this.renderQuery()}
          {this.renderConfirm()}
          {this.renderReject()}
          <br />
          <Row>
            <Col md={12}>
              <h2>Reward History</h2>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <table className="table table-hover table-bordered">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Point Value</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.eventHistory
                    ? this.state.eventHistory.map(history => (
                        <tr>
                          <td>{history.date}</td>
                          <td>{history.description}</td>
                          <td>{history.point_value}</td>
                        </tr>
                      ))
                    : ""}
                </tbody>
              </table>
            </Col>
          </Row>
          <br />
          <Row>
            <Col md={12}>
              <h2>Pending Rewards</h2>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <table className="table table-hover table-bordered">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Point Value</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.pending_rewards
                    ? this.state.pending_rewards.map(event => (
                        <tr>
                          <td>{event.date}</td>
                          <td>{event.description}</td>
                          <td>{event.point_value}</td>
                        </tr>
                      ))
                    : ""}
                </tbody>
              </table>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
export default Rewards;
