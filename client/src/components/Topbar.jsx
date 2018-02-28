import React, { Component } from 'react';
import logo from '../logo.png';

export default class Topbar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Topbar navbar navbar-inverse">
        {/* <img src={logo} className="App-logo" alt="logo" />*/}
        <h1 className="App-title">YouMix</h1>
        <p>Room: {this.props.room}</p>
      </div>
    );
  }
}
