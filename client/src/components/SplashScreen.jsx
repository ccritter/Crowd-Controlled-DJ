import React, { Component } from 'react';
let socket;
let appstate;

export default class SplashScreen extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.joinRoom = this.joinRoom.bind(this);

    socket = this.props.socket;
    appstate = this.props.appstate;
  }

  componentDidMount() {
    socket.on('connect', function(data) {
      socket.emit('join', 'Hello World from client');
    });
  }

  joinRoom = (e) => {
    e.preventDefault();
    let roomID = this.state.room;
    socket.emit('joinroom', roomID, function(success) {
      if (success) appstate(1);
      // TODO: else display some error message
    });
  }

  hostRoom = () => {
    socket.emit('hostroom');
    appstate(2);
  }

  handleChange = (e) => {
    this.setState({room: e.target.value});
  }

  render() {
    return (
      <div className="SplashScreen">
        <form
          onSubmit={this.joinRoom}>
          <input
            id="room"
            type="text"
            placeholder="Room ID"
            onChange={this.handleChange}/>
          <button
            type="submit"
            className="join">
              Join
          </button>
        </form>
        <br/>
        <button
          className="host"
          onClick={this.hostRoom}>
            Host
        </button>
      </div>
    );
  }
}