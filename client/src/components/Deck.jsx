import React, { Component } from 'react';
const wNumb = require('wnumb');
const noUiSlider = require('nouislider');

export default class Deck extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playerState: -1,
      vidready: false,
      playheadTimer: null,
      isMuted: false,
      isLooping: false,
      isLocked: false
    };

    this.loadNewSong = this.loadNewSong.bind(this);
    this.playOrPause = this.playOrPause.bind(this);
    this.mute = this.mute.bind(this);
    // TODO: Check if these need to be bound once adding from queue is implemented
    this.onPlayerStateChange = this.onPlayerStateChange.bind(this);
    this.onPlayerRateChange = this.onPlayerRateChange.bind(this);
  }

  /*
  Necessary API Functions:

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

  componentDidUpdate(prevProps) {
    if (prevProps.currentSong !== this.props.currentSong) {
      this.loadNewSong(this.props.currentSong);
    }
  }

  loadNewSong(song) {
    this.setState({ vidready: false });
    console.log(song);
    let load = new Promise((resolve) => {
      if (this.player) {
        this.player.destroy();
      }
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
          onPlaybackRateChange: this.onPlayerRateChange,
          onReady: resolve
        }
      });
    });

    load.then((success) => {
      console.log("promise complete");

      this.setState({ vidready: true });
      // I put this here because I thought it might start buffering the video, making it so the first "play" click isn't delayed. It may not work though.
      this.player.playVideo();
      this.player.pauseVideo();

      // Init volume slider
      let volslider = document.getElementById(this.props.side + "volume");
      volslider.style.height = '250px';
      noUiSlider.create(volslider, {
        start: this.player.getVolume(),
        orientation: 'vertical',
        direction: 'rtl',
        connect: [true, false],
        range: {
          'min': 0,
          'max': 100
        }
      });

      volslider.noUiSlider.on('update', (values) => {
        this.player.setVolume(values[0]);
      });

      // Init speed slider
      let speedslider = document.getElementById(this.props.side + "speed");
      speedslider.style.width = '300px';
      noUiSlider.create(speedslider, {
        start: 1,
        range: {
          'min': [0.5, .25],
          '82%': [1.5, .5],
          'max': [2]
        },
        pips: {
          mode: 'steps',
          filter: () => 1,
          format: wNumb({ decimals: 2 }),
          density: 100
        }
      });
      speedslider.noUiSlider.on('update', (values) => {
        this.player.setPlaybackRate(values[0]);
      });

      // Init playhead slider/controls
      // TODO: Make sure this doesn't break when loading a new song. May have to delete it and readd it or something
      let playslider = document.getElementById(this.props.side + "pheadcontrols");
      playslider.style.width = '300px';
      noUiSlider.create(playslider, {
        start: [0, 0, this.player.getDuration()],
        connect: true,
        range: {
          'min': 0,
          'max': this.player.getDuration()
        }
      });
      playslider.noUiSlider.on('change', (values, handle) => {
        if (handle === 1) {
          // "Start" handle has been updated/set
          this.player.seekTo(values[1], true);
        }
      });
      playslider.noUiSlider.on('start', (values, handle) => {
        if (handle === 1) {
          // "Start" handle has grabbed
          clearInterval(this.state.playheadTimer);
        }
      });
      let handles = playslider.querySelectorAll(".noUi-handle");
      handles[0].classList.add("barhandle");
      handles[1].classList.add("playheadhandle");
      handles[2].classList.add("barhandle");
    });
  }

  onPlayerStateChange(e) {
    this.setState({ playerState: e.data });

    if (e.data === window.YT.PlayerState.PLAYING) {
      let slider = document.getElementById(this.props.side + "pheadcontrols");
      this.state.playheadTimer = setInterval(() => {
        slider.noUiSlider.set([null, this.player.getCurrentTime(), null]);
      }, (1000*this.player.getPlaybackRate()));
    } else {
      clearInterval(this.state.playheadTimer);
    }
  }

  onPlayerRateChange(e) {
    setInterval(this.state.playheadTimer, (1000*this.player.getPlaybackRate()));
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
      this.setState({ isMuted: false });
    } else {
      this.player.mute();
      this.setState({ isMuted: true });
    }
  }

  // TODO: Make play/pause and lock buttons a toggle. Eventually same for loops and stuff.
  // TODO: Ok so here's how looping is going to work. We're going to check the distance between the start and end handles for the loop interval. Every tick, we set the playback to the location of the start handle
  // The problem with the above is that if you change the playhead or something, everything gets thrown off. Figure this out.
  render() {
    return (
      <div className={this.props.side + "-Deck d-flex " + (this.props.side === "Right" ? "justify-content-end" : "justify-content-start")}>
        <div ref={(r) => { this.ytcontainer = r }}/>
        {this.props.currentSong && this.state.vidready ?
          <div>
            <div className="row">
              <div className={"col-8 p-5" + (this.props.side === "Right" ? " order-2" : " order-1")}>
                <div className={this.props.side + "thumb"}>
                  <img src={this.props.currentSong.thumbnail} />
                </div>
                <div className={this.props.side + "songinfo mb-5"}>
                  {this.props.currentSong.title}
                  <br/>
                  <p className="channel-name">{this.props.currentSong.channelName} - {this.player.getDuration()} seconds</p>
                </div>
                <div className={this.props.side + "buttons mb-5"}>
                  <div className="btn-group" role="group">
                    <button onClick={this.playOrPause} className="btn btn-default" aria-label="Play/Pause" title="Play/Pause">
                      {this.state.playerState === 1 ?
                        <i className="fa fa-pause"/>
                      :
                        <i className="fa fa-play"/>
                      }
                    </button>
                    <button className={"btn btn-" + (this.state.isLocked === 1 ? "secondary" : "default")} title="Autoplay lock">
                      <i className="fa fa-lock"/>
                    </button>
                    <button className="btn btn-default" title="Load the next top rated song">
                      <i className="fa fa-forward"/>
                    </button>
                  </div>
                </div>
              </div>
              <div className={this.props.side + "volume col-4 mt-5" + (this.props.side === "Right" ? " order-1" : " order-2")}>
                <div className="d-flex flex-column justify-content-center mt-5">
                  <div id={this.props.side + "volume"} className="noUiSlider m-2"/>
                  <button onClick={this.mute} className={"btn btn-" + (this.state.isMuted ? "secondary" : "default") + " mt-2"} title="Mute">
                    <i className="fa fa-volume-off"/>
                  </button>
                </div>
              </div>
            </div>

            <div className="row pl-5 pr-5 p-4 align-items-center flex-column">
              <p className="mt-2">Speed:</p>
              <div id={this.props.side + "speed"} className="noUiSlider"/>
            </div>
            <div className="row pl-5 pr-5 p-4 align-items-center flex-column">
              <p className="mt-2">Playhead:</p>
              <div id={this.props.side + "pheadcontrols"} className="noUiSlider"/>
            </div>
            <div className="row pl-5 pr-5 justify-content-center">
              <div className="btn-toolbar" role="toolbar">
                <div className="btn-group mr-2" role="group">
                  <button className={"btn btn-" + (this.state.isLooping ? "secondary" : "default")} onClick={() => this.setState({ isLooping: !this.state.isLooping })}>Loop</button>
                </div>
                <div className="btn-group" role="group">
                  <button className="btn btn-default" title="Set loop start point">Start</button>
                  <button className="btn btn-default" title="Set loop end point">End</button>
                </div>
                {/* TODO: For now, we'll just not have these implemented until we work it out */}
                {/*<div className="btn-group mr-2" role="group">*/}
                  {/*<button className="btn btn-default">Set</button>*/}
                {/*</div>*/}
                {/*<div className="btn-group" role="group">*/}
                  {/*<button className="btn btn-default">A</button>*/}
                  {/*<button className="btn btn-default">B</button>*/}
                  {/*<button className="btn btn-default">C</button>*/}
                {/*</div>*/}
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
