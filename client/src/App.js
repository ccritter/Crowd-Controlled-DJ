/* global gapi */
import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import io from 'socket.io-client';
import SplashScreen from './components/SplashScreen'
import Turntable from './components/Turntable'
import VoteScreen from './components/VoteScreen'
const socket = io();
const ytApi = process.env.REACT_APP_YT_API_KEY;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mode: 0, // 0 is not in room, 1 is voter, 2 is DJ. This may be unnecessary if we get user state from the server.
      room: '',
      songlist: []
    }

  }

  // TODO: Figure out when do define functions like this, or as an arrow function.

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
    // this.testInit(); // TODO: Get rid of this and the corresponding function
    this.loadYoutubeDataApi();

    // TODO: consolidate these two functions? they are identical
    socket.on('song added', (songlist) => {
      this.setState({ songlist: songlist });
    });

    socket.on('welcome', (songlist) => {
      this.setState({ songlist: songlist });
    });
  }

  // testInit = () => {
  //   fetch('/api/test')
  //     .then(res => res.json())
  //     .then(resj => this.setState({ name: resj.name }));
  // }

  changeMode = (mode) => {
    this.setState({ mode: mode});
  }

  changeRoom = (room) => {
    this.setState({ room: room});
  }

  render() {
    let screen = null;
    switch (this.state.mode) {
      case 0:
        screen = <SplashScreen socket={socket}
                               appstate={this.changeMode}
                               changeroom={this.changeRoom}/>;
        break;
      case 1:
        screen = <VoteScreen socket={socket}
                             songlist={this.state.songlist}
                             appstate={this.changeMode}
                             room={this.state.room}/>;
        break;
      case 2:
        screen = <Turntable socket={socket}
                            songlist={this.state.songlist}
                            appstate={this.changeMode}
                            room={this.state.room}/>;
        break;
      default:
        console.log("Something broke, unknown mode.");
    }

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to YouMix</h1>
        </header>
        <br/>
        {screen}
      </div>
    );
  }
}

export default App;
