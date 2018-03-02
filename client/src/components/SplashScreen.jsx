import React, { Component } from 'react';
let socket;
let appstate;
let changeroom;

export default class SplashScreen extends Component {
  constructor(props) {
    super(props);

    this.joinRoom = this.joinRoom.bind(this);
    this.hostRoom = this.hostRoom.bind(this);

    // Create global variables so that callbacks can access them
    socket = this.props.socket;
    appstate = this.props.appstate;
    changeroom = this.props.changeroom;
  }

  componentDidMount() {
    socket.on('connect', (data) => {
      socket.emit('join', 'Hello World from client');
    });

    socket.on('nonexistent room', (data) => {
      alert('Room does not exist.');
    });
  }

  joinRoom(e) {
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

  hostRoom() {
    socket.emit('hostroom', (newRoom) => {
      appstate(2);
      changeroom(newRoom);
    });
  }

  render() {
    return (
        <div className="SplashScreen">
          <div className="container">
            <div className="pt-5 pb-5">
            </div>
            <div className="row justify-content-center pt-5 pb-5">
              <i className="fa fa-music fa-large pr-2 mr-5"></i>
              <h1>YouMix</h1>
              <i className="fa fa-headphones fa-large pl-2 ml-5"></i>
            </div>
            <div className="row justify-content-center pt-5 pb-5">
              <p><em>The crowd-controlled YouTube DJ application</em></p>
            </div>
            <div className="row align-items-end pt-5">
              <div className="col-4 offset-2">
                <form onSubmit={this.joinRoom}>
                  <div className="pb-2">
                    <input
                        id="room"
                        type="text"
                        placeholder="Room ID"
                        ref={(input) => this.input = input}/>
                  </div>
                  <button
                      type="submit"
                      className="join btn btn-primary px-5 py-3">
                    Join Room
                  </button>
                </form>
              </div>
              <div className="col-4 offset-2">
                <button
                    className="host btn btn-primary px-5 py-3"
                    onClick={this.hostRoom}>
                  Host Room
                </button>
              </div>
            </div>
          </div>
        </div>
    );
  }
}