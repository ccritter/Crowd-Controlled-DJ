/* global gapi */
import React, { Component } from 'react';
import logo from './logo.svg';
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
      room: ''
    }

  }

  loadYoutubeApi() {
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/client.js";

    script.onload = () => {
      gapi.load('client', () => {
        gapi.client.setApiKey(ytApi);
        gapi.client.load('youtube', 'v3', () => {
          console.log("Youtube API Loaded.");
          console.log(process.env);
          // this.setState({ gapiReady: true });
        });
      });
    };

    document.body.appendChild(script);
  }

  componentDidMount() {
    this.testInit(); // TODO: Get rid of this and the corresponding function
    this.loadYoutubeApi();
  }

  testInit = () => {
    fetch('/api/test')
      .then(res => res.json())
      .then(resj => this.setState({ name: resj.name }));
  }

  changeMode = (mode) => {
    this.setState({ mode: mode});
  }

  render() {
    let screen = null;
    switch (this.state.mode) {
      case 0:
        screen = <SplashScreen socket={socket} appstate={this.changeMode}/>;
        break;
      case 1:
        screen = <VoteScreen socket={socket} appstate={this.changeMode}/>;
        break;
      case 2:
        screen = <Turntable socket={socket} appstate={this.changeMode}/>;
        break;
      default:
        screen = <SplashScreen socket={socket} appstate={this.changeMode}/>;
    }

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React, {this.state.name} </h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        {screen}
      </div>
    );
  }
}

export default App;
