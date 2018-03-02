import React, { Component } from 'react';
const noUiSlider = require('nouislider');

export default class Deck extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentSong: '', // Stores the id of the currently playing song
      playerState: -1
    };

    this.loadNewSong = this.loadNewSong.bind(this);
    this.playOrPause = this.playOrPause.bind(this);
    this.setPlaySpeed = this.setPlaySpeed.bind(this);
    this.setVolume = this.setVolume.bind(this);
    this.mute = this.mute.bind(this);
    // TODO: Check if this needs to be bound once adding from queue is implemented
    this.onPlayerStateChange = this.onPlayerStateChange.bind(this);
  }

  /*
  Necessary API Functions:
  player.playVideo()
  player.pauseVideo()
  player.seekTo(seconds:Number, allowSeekAhead:Boolean)
  player.mute()
  player.unMute()
  player.isMuted()
  player.setVolume(volume:Number)
  player.getVolume()
  player.setPlaybackRate(suggestedRate:Number)
  player.getAvailablePlaybackRates() - potentially not necessary. We'll see.
  player.getPlayerState() - Maybe
  player.getCurrentTime()
  player.getDuration()

  Player parameters to set:
  autoplay = 0 if normal, 1 if autoplay mode
  controls = 0 assuming we actually show the vid. Otherwise don't bother.
  disablekb = 1
  enablejsapi = 1
  end = duration
  loop = 0 if loop is off, 1 if on
  origin = ???
  playsinline = 1, probably
  rel = 0
  start = 0:00

  Use componentWillReceiveProps to reset to default? or just get values from the player itself?

   */

  componentDidMount() {
    // TODO: This is only here for testing, get rid of it eventually
    this.loadNewSong({
      id: 'dQw4w9WgXcQ',
      title: 'Rick Astley - Never Gonna Give You Up',
      thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/0.jpg'
    });
  }

  loadNewSong(song) {
    let load = new Promise((resolve) => {
      this.player = new window.YT.Player(this.ytcontainer, {
        height: '0',
        width: '0',
        videoId: song.id,
        playerVars: {
          enablejsapi: 1,
          rel: 0
        },
        events: {
          onStateChange: this.onPlayerStateChange,
          onReady: resolve
        }
      });
    });

    load.then((success) => {
      this.setState({ currentSong: song });
      // I put this here because I thought it might start buffering the video, making it so the first "play" click isn't delayed. It may not work though.
      this.player.playVideo();
      this.player.pauseVideo();

      // TODO: Make sure this doesn't break when loading a new song. May have to delete it and readd it or something
      let slider = document.getElementById(this.props.side + "pheadcontrols");
      slider.style.width = '400px';
      noUiSlider.create(slider, {
        start: [20, 80],
        connect: true,
        range: {
          'min': 0,
          'max': this.player.getDuration()
        }
      });

      slider.noUiSlider.on('update', function(values, handle) {
        this.target.setAttribute('handle-num', handle);

        if (handle === 0) {
          // "Start" handle has been updated/set

        }
      });
    });
  }

  onPlayerStateChange(e) {
    this.setState({ playerState: e.data });
  }

  playOrPause() {
    if (this.state.playerState === 1) {
      this.player.pauseVideo();
    } else {
      this.player.playVideo();
    }
  }

  mute() {
    if (this.player.isMuted()) {
      this.player.unMute();
    } else {
      this.player.mute();
    }
  }

  setPlaySpeed(event) {
    let rates = [.5, .75, 1, 1.25, 1.5, 2];
    this.player.setPlaybackRate(rates[event.target.value]);
  }

  setVolume(event) {
    this.player.setVolume(event.target.value);
  }

  setMarker(num) {

  }

  // TODO: use icons for play pause etc
  // TODO: Make play/pause and lock buttons a toggle. Eventually same for loops and stuff.
  render() {
    return (
      <div className={this.props.side + "-Deck col"}>
        <div ref={(r) => { this.ytcontainer = r }}/>
        {this.state.currentSong ?
          <div>
            <div className="row">
              <img src={this.state.currentSong.thumbnail} />
              {this.state.currentSong.title}
              {this.state.currentSong.channelName}
              {this.player.getDuration()} seconds (convert this to (H:)MM:SS)
            </div>
            <input type="range" orient="vertical" min="0" max="100" defaultValue="80" onInput={this.setVolume}/>
            <button onClick={this.mute} className="btn btn-default">Mute</button>
            <input type="range" name="speed" min="0" max="5" defaultValue="2" onInput={this.setPlaySpeed}/>
            <div className="row">
              <div className="btn-group" role="group">
                <button onClick={this.playOrPause} className="btn btn-default" aria-label="Play/Pause">
                  {this.state.playerState === 1 ?
                    'Pause'
                  :
                    'Play'
                  }
                </button>
                <button className="btn btn-default">Eject</button>
                <button className="btn btn-default">Lock</button>
              </div>
            </div>
            <div className="row">
              <div id={this.props.side + "pheadcontrols"} className="noUiSlider"/>
            </div>
            <div className="row">
              <div className="btn-toolbar" role="toolbar">
                <div className="btn-group mr-2" role="group">
                  <button className="btn btn-default">Loop</button>
                </div>
                <div className="btn-group mr-5" role="group">
                  <button className="btn btn-default">In</button>
                  <button className="btn btn-default">Out</button>
                </div>
                <div className="btn-group mr-2" role="group">
                  <button className="btn btn-default">Set</button>
                </div>
                <div className="btn-group" role="group">
                  <button className="btn btn-default">A</button>
                  <button className="btn btn-default">B</button>
                  <button className="btn btn-default">C</button>
                </div>
              </div>
            </div>
          </div>
          :
          <div>
            No song loaded
          </div>
        }
      </div>
    );
  }
}
