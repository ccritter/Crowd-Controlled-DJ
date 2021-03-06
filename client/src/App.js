/* global gapi */
import React, { Component } from 'react';
// require('bootstrap');
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import io from 'socket.io-client';
import SplashScreen from './components/SplashScreen';
import MainContainer from './components/MainContainer'
const socket = io();
const ytApi = process.env.REACT_APP_YT_API_KEY;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mode: 0, // 0 is not in room, 1 is voter, 2 is DJ. This may be unnecessary if we get user state from the server.
      room: '',
      songlist: [],
      song1: null,
      song2: null,
      autoplay: false
    };

    this.changeMode = this.changeMode.bind(this);
    this.changeRoom = this.changeRoom.bind(this);
    this.leaveRoom = this.leaveRoom.bind(this);
    this.toggleAutoplay = this.toggleAutoplay.bind(this);
  }

  loadYoutubeDataApi() {
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/client.js";

    script.onload = () => {
      gapi.load('client', () => {
        gapi.client.setApiKey(ytApi);
        gapi.client.load('youtube', 'v3', () => {
          console.log("Youtube API Loaded.");
        });
      });
    };

    document.body.appendChild(script);
  }

  componentDidMount() {
    // this.testInit(); // TODO: Get rid of this and the corresponding function. Only still here for reference
    this.loadYoutubeDataApi();

    // TODO: This is wildly inefficient, as we will get a new list every time someone upvotes, downvotes, or submits a new song. Keeping it simple for this project though.
    socket.on('receive songlist', (songlist) => {
      this.setState({ songlist: songlist });
    });
    socket.on('play song deck 1', (song1) => {
      this.setState({ song1: song1 });
    });
    socket.on('play song deck 2', (song2) => {
      this.setState({ song2: song2 });
    });
  }

  // testInit = () => {
  //   fetch('/api/test')
  //     .then(res => res.json())
  //     .then(resj => this.setState({ name: resj.name }));
  // }

  changeMode(mode)  {
    this.setState({ mode: mode});
  }

  changeRoom(room) {
    this.setState({ room: room});
  }

  leaveRoom() {
    this.setState({ mode: 0, room: '', songlist: [] });
  }

  toggleAutoplay() {
    this.setState({ autoplay: !this.state.autoplay });
  }

  render() {
    if (this.state.mode === 0) {
      return (
        <div className="App">
          <SplashScreen socket={socket}
                        appstate={this.changeMode}
                        changeroom={this.changeRoom}/>
        </div>
      );
    } else {
      return (
        <div className="App">
          <MainContainer socket={socket}
                         songlist={this.state.songlist}
                         song1={this.state.song1}
                         song2={this.state.song2}
                         room={this.state.room}
                         mode={this.state.mode}
                         toggleAutoplay={this.toggleAutoplay}
                         leaveRoom={this.leaveRoom}/>
        </div>
      );
    }
  }
}

export default App;
