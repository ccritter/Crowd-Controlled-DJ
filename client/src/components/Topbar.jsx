import React, { Component } from 'react';
import logo from '../logo.png';
const noUiSlider = require('nouislider');

export default class Topbar extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // Init master volume slider
    let volslider = document.getElementById("mastervol");
    volslider.style.width = '300px';
    noUiSlider.create(volslider, {
      start: 80,
      connect: [true, false],
      range: {
        'min': 0,
        'max': 100
      }
    });

    volslider.noUiSlider.on('update', (values) => {
      // TODO
    });
  }

  render() {
    return (
      <div className="Topbar navbar navbar-inverse">
          <div className="w-100 d-flex align-items-center">
              <div className="col-1">
                  <button type="button" className="btn btn-default" onClick="" title="Master play/pause">
                      <i className="fa fa-pause"/>
                      <i className="fa fa-play d-none"/>
                  </button>
              </div>
              <div className="col-3">
                <div id="mastervol" className="noUiSlider"/>
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
