import React, { Component } from 'react';
import logo from '../logo.png';

export default class Topbar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Topbar navbar navbar-inverse">
          <div className="w-100 d-flex align-items-center">
              <div className="col-1">
                  <button type="button" onClick="">
                      <i className="fa fa-pause"></i>
                      <i className="fa fa-play d-none"></i>
                  </button>
              </div>
              <div className="col-3">
                  {/* master volume slider goes here */}
              </div>
              <div className="col-4">
                  {/* <img src={logo} className="App-logo" alt="logo" />*/}
                  <h1 className="App-title text-center">YouMix</h1>
              </div>
              <div className="col-2 offset-2">
                  <p className="mb-1">Room code:</p>
                  <p className="mb-0">{this.props.room}</p>
              </div>
          </div>
      </div>
    );
  }
}
