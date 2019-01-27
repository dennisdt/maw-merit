import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import { GetData } from "../services/rewards.service";
import { GetEvents } from "../services/events.service";
import { Doughnut } from 'react-chartjs-2';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
} from 'reactstrap';

const brandPrimary = getStyle('--primary')
const brandSuccess = getStyle('--success')
const brandInfo = getStyle('--info')
const brandWarning = getStyle('--warning')
const brandDanger = getStyle('--danger')

const data = {
  labels: [
    'Volunteer',
    'Referrals',
    'Events'
  ],
  datasets: [{
    data: [300, 50, 100],
    backgroundColor: [
    '#FF6384',
    '#36A2EB',
    '#FFCE56'
    ],
    hoverBackgroundColor: [
    '#FF6384',
    '#36A2EB',
    '#FFCE56'
    ]
  }]
};

class UserDash extends Component {
  state = {
    points: null,
    name: "",
    pending_rewards: [],
    eventHistory: []
  };
  componentDidMount() {
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
    GetEvents().then(response => {
      const eventData = response.data;
      console.log(eventData);
      this.setState({
        events: eventData
      });
    });
  }
  render() {
    return (
      <div>
        <Grid className="first">
          <Row>
            <Col md={4}>
              <Card style={{ height: 200 }}>
                <h2
                  style={{
                    color: "#0057b8",
                    textAlign: "center"
                  }}
                >
                  Current Points
                  <h3 style={{ textAlign: "center" }}>
                    {this.state.points}
                  </h3>
                </h2>
              </Card>
            </Col>
            <Col md={6}>
              <Card style={{ height: 200 }}>
                <h2
                  style={{
                    color: "#0057b8",
                    textAlign: "center"
                  }}
                >
                  Rankings:
                  <h3>
                    1st: Dennis Tran
                  </h3>
                </h2>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <Card style={{ height: 200 }}>
                <h2 style={{
                    color: "#0057b8",
                    textAlign: "center"
                  }}
                >
                  Activity Breakdown
                </h2>
                <Doughnut data={data} height={200} />
              </Card>
            </Col>

            <Col md={6}>
              <Card style={{ height: 200 }}>
                <h2
                  style={{
                    color: "#0057b8",
                    textAlign: "center"
                  }}
                >
                  All Over Baby
                </h2>
              </Card>
            </Col>

          </Row>
        </Grid>
      </div>
    );
  }
}
export default UserDash;