import React, { Component } from 'react';
const noUiSlider = require('nouislider');

export default class Topbar extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (this.props.mode === 2) {
      // Init master volume slider
      let volslider = document.getElementById("mastervol");
      volslider.style.width = '150px';
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
  }

  render() {
    return (
        <div className="Topbar navbar navbar-inverse row align-items-center">
          {this.props.mode === 2 ?
            <div className="col-4">
              <button type="button" className="btn btn-default mr-3 d-inline-block" onClick="" title="Master play/pause">
                <i className="fa fa-pause"/>
                <i className="fa fa-play d-none"/>
              </button>
              <div className="d-inline-block">
                <div id="mastervol" className="noUiSlider"/>
              </div>
            </div>
          :
            <div className="col-4" />
          }
            <div className="col-4">
              <h1 className="App-title text-center">YouMix</h1>
            </div>
            <div className="col-2">
              <button type="button" className="btn btn-default" onClick={this.props.leaveRoom} title="Exit Room">
                Leave
              </button>
            </div>
            <div className="col-2">
              <p className="mb-1">Room code:</p>
              <b className="mb-0">{this.props.room}</b>
            </div>
        </div>
    );
  }
}
