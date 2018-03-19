import React, { Component } from 'react';
import Deck from './Deck';
const noUiSlider = require('nouislider');

let loadYT;

export default class Turntable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ytready: false
    };
  }

  componentDidMount() {
    if (!loadYT) {
      loadYT = new Promise((resolve) => {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        window.onYouTubeIframeAPIReady = () => resolve(window.YT);
      });
    }
    loadYT.then((YT) => {
      this.setState({ ytready: true });
      console.log("Youtube iFrame API ready");

      // Init crossfade slider
      let xfade = document.getElementById("xfade");
      xfade.style.width = '300px';
      noUiSlider.create(xfade, {
        start: 50,
        range: {
          'min': 0,
          '45%': [45, 5],
          '55%': 55,
          'max': 100
        }
      });

      xfade.noUiSlider.on('update', function(values, handle) {
        // TODO
      });

      // TODO: Get rid of this
      // this.sendSongToDeck({
      //   id: 'dQw4w9WgXcQ',
      //   title: 'Rick Astley - Never Gonna Give You Up',
      //   channelName: 'YaBoiRickAstley',
      //   thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/default.jpg'
      // }, false);
      //
      // this.sendSongToDeck({
      //   id: 'dQw4w9WgXcQ',
      //   title: 'Rick Astley - Never Gonna Give You Up',
      //   channelName: 'YaBoiRickAstley',
      //   thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/default.jpg'
      // }, true);
    });
  }

  render() {
    return (
      <div className={(this.props.hidden ? "d-none " : "") + "Turntable h-85"}>
        {!this.state.ytready ?
          <p>Loading...</p>
          :
          <div className="row h-100">
            <div className="col-6 h-100">
              <Deck side="Left" currentSong={this.props.song1} socket={this.props.socket} room={this.props.room}/>
            </div>
            <div className="xfader">
              <p>Crossfade:</p>
              <div id="xfade" className="noUiSlider"/>
            </div>
            <div className="col-6 h-100">
              <Deck side="Right" currentSong={this.props.song2} socket={this.props.socket} room={this.props.room}/>
            </div>
          </div>
        }
      </div>
    );
  }
}