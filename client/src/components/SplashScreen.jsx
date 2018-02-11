import React, { Component } from 'react';
let socket;
let appstate;
let changeroom;

export default class SplashScreen extends Component {
  constructor(props) {
    super(props);

    this.joinRoom = this.joinRoom.bind(this);

    socket = this.props.socket;
    appstate = this.props.appstate;
    changeroom = this.props.changeroom;
  }

  componentDidMount() {
    socket.on('connect', function(data) {
      socket.emit('join', 'Hello World from client');
    });
  }

  joinRoom = (e) => {
    e.preventDefault();
    let roomID = this.input.value;
    socket.emit('joinroom', roomID, function(success) {
      if (success) {
        appstate(1);
        changeroom(roomID);
      }
      // TODO: else display some error message
    });
  }

  hostRoom = () => {
    socket.emit('hostroom', (newRoom) => {
      appstate(2);
      changeroom(newRoom);
    });
  }

  render() {
    return (
      <div className="SplashScreen">
        <form onSubmit={this.joinRoom}>
          <input
            id="room"
            type="text"
            placeholder="Room ID"
            ref={(input) => this.input = input}/>
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