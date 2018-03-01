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
    socket.on('connect', function(data) {
      socket.emit('join', 'Hello World from client');
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
          <div class="container">
            <div class="pt-5 pb-5">
            </div>
            <div class="row justify-content-center pt-5 pb-5">
              <h1>YouMix</h1>
            </div>
            <div class="pt-5 pb-5">
            </div>
            <div class="row align-items-end pt-5">
              <div class="col-4 offset-2">
                <form onSubmit={this.joinRoom}>
                  <div class="pb-2">
                    <span class="pr-2">Room code:</span>
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
              <div class="col-4 offset-2">
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