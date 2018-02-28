import React, { Component } from 'react';

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
    this.loadNewSong({ id: 'dQw4w9WgXcQ' });
  }

  loadNewSong(song) {
    this.player = new window.YT.Player(this.ytcontainer, {
      height: '0',
      width: '0',
      videoId: song.id,
      playerVars: {
        enablejsapi: 1,
        rel: 0
      },
      events: {
        onStateChange: this.onPlayerStateChange
      }
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

  setPlaySpeed(event) {
    // TODO: Make this use getAvailablePlaybackRates()?
    let rates = [.5, .75, 1, 1.25, 1.5, 2];
    this.player.setPlaybackRate(rates[event.target.value]);
  }

  setVolume(event) {
    this.player.setVolume(event.target.value);
  }

  // TODO: For the start, end, and playhead slider we can use https://refreshless.com/nouislider/

  render() {
    return (
      <div className={this.props.side + "-Deck"}>
        <div  ref={(r) => { this.ytcontainer = r }}/>
        <button onClick={this.playOrPause}>{this.state.playerState === 1 ? 'Pause' : 'Play'}</button>
        <input type="range" name="speed" min="0" max="5" defaultValue="2" onInput={this.setPlaySpeed} />
        <input type="range" orient="vertical" min="0" max="100" defaultValue="80" onInput={this.setVolume} />
      </div>
    );
  }
}
