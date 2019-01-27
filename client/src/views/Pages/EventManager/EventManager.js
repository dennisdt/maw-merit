import React, { Component } from "react";
import { Grid, Row, Col, FormGroup, Label, Button } from "react-bootstrap";
import { GetEvents, SubmitEvent, CancelEvent } from "../services/events.service";
class EventManager extends Component {
  state = {
    name: "",
    description: "",
    date: "",
    reward: "",
    events: [],
    disp_message: false
  };

  renderMessage() {
    if (this.state.disp_message) {
      return <div className="disp-message">Event added!</div>;
    }
  }

  componentDidMount() {
    GetEvents().then(response => {
      console.log(response);
      const data = response.data;
      this.setState({
        events: data,
        searched: true
      });
    });
  }
  onChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({
      [name]: value,
      disp_message: false
    });
  };
  onEdit = () => {};
  onCancel = id => {
    CancelEvent(id).then(() => {
      GetEvents().then(response => {
        console.log(response);
        const data = response.data;
        this.setState({
          events: data,
          searched: true
        });
      });
    });
  };
  submitEvent = () => {
    SubmitEvent({
      name: this.state.name,
      date: this.state.date,
      description: this.state.description,
      reward: this.state.reward
    })
      .then(() => {
        GetEvents().then(response => {
          console.log(response);
          const data = response.data;
          this.setState({
            events: data,
            searched: true,
            name: "",
            description: "",
            date: "",
            reward: "",
            disp_message: true
          });
        });
      })
      .then();
  };
  render() {
    return (
      <div>
        <Grid className="first">
          <Row>
            <Col md={12}>
              <h1>Events Manager</h1>
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
              <h2>Add New Event</h2>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <FormGroup>
                <div>
                  <Label style={{ fontSize: "18px" }}>Event Name: </Label>
                </div>
                <input
                  style={{ fontSize: "18px" }}
                  className="inline ip2"
                  type="text"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                />
              </FormGroup>
              <FormGroup>
                <div>
                  <Label style={{ fontSize: "18px" }}>Date: </Label>
                </div>
                <input
                  style={{ fontSize: "18px" }}
                  className="inline ip2"
                  type="text"
                  name="date"
                  value={this.state.date}
                  onChange={this.onChange}
                />
              </FormGroup>
              <FormGroup>
                <div>
                  <Label style={{ fontSize: "18px" }}>Description: </Label>
                </div>
                <input
                  style={{ fontSize: "18px" }}
                  className="inline ip2"
                  type="text"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                />
              </FormGroup>
              <FormGroup>
                <div>
                  <Label style={{ fontSize: "18px" }}>Reward: </Label>
                </div>
                <input
                  style={{ fontSize: "18px" }}
                  className="inline ip2"
                  type="text"
                  name="reward"
                  value={this.state.reward}
                  onChange={this.onChange}
                />
              </FormGroup>
              <div>
                <button
                  className="button"
                  style={{ fontSize: "18px" }}
                  input="button"
                  onClick={() => this.submitEvent()}
                >
                  Submit
                </button>
              </div>
            </Col>
          </Row>
          <br />
          {this.renderMessage()}
          <br />
          <Row>
            <Col md={12}>
              <h2>Events List</h2>
            </Col>
          </Row>
          {this.state.searched ? (
            <div>
              <table className="table table-hover table-bordered">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Reward</th>
                  <th>Edit Event</th>
                  <th>Delete Event</th>
                </tr>
                </thead>
                <tbody>
                {this.state.events
                  ? this.state.events.map(event => (
                      <tr>
                        <td>{event.name}</td>
                        <td className="nowrap">{event.date}</td>
                        <td>{event.description}</td>
                        <td>{event.reward}</td>
                        <td onClick={() => this.onEdit(event.id)}>
                          <i className="fas fa-edit" />
                        </td>
                        <td onClick={() => this.onCancel(event.id)}>
                          <i className="fas fa-trash-alt" />
                        </td>
                      </tr>
                    ))
                  : ""}
                  </tbody>
              </table>
            </div>
          ) : (
            ""
          )}
        </Grid>
      </div>
    );
  }
}
export default EventManager;
