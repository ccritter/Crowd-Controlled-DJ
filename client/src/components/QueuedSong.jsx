import React, { Component } from 'react';
// import '../../node_modules/bootstrap/dist/js/bootstrap'
require('bootstrap');

export default class QueuedSong extends Component {
  constructor(props) {
    super(props);

    this.upvote = this.upvote.bind(this);
    this.downvote = this.downvote.bind(this);
  }

  upvote() {
    this.props.socket.emit('upvote', this.props.song, this.props.room);
  }

  downvote() {
    this.props.socket.emit('downvote', this.props.song, this.props.room);
  }

  render() {
    return (
      <div className="QueuedSong container">
        <div className="row">
          <div className="col-4">
            <img src={this.props.song.thumbnail} alt="thumbnail" />
          </div>
          <div className="col-6">
            {/*<p className="mb-1">{this.props.song.id}</p>*/}
            <p title={this.props.song.title} className="mb-1">{this.props.song.title.length < 35 ?
                this.props.song.title
              :
                this.props.song.title.substring(0, 35) + "..."}</p>
            <p title={this.props.song.channelName} className="mb-0">{this.props.song.channelName.length < 20 ?
              this.props.song.channelName
              :
              this.props.song.channelName.substring(0, 20) + "..."}</p>
          </div>
          <div className="col-1 align-self-center">
            <div className="row align-items-center flex-column">
              <div className="arrow arrow-upvote" onClick={this.upvote}>
                <i className="fa fa-arrow-circle-up"/>
              </div>
              <p className="m-1">{this.props.song.numVotes}</p>
              <div className="arrow arrow-downvote" onClick={this.downvote}>
                <i className="fa fa-arrow-circle-down"/>
              </div>
            </div>
          </div>
          {this.props.mode === 2 ?
            <div className="col-1 align-self-center">
              <div className="row align-items-center flex-column">
                <div className="dropright">
                  {/*<div className="songMenu dropdown-toggle" data-toggle="dropdown">*/}
                    {/*<i className="fa fa-ellipsis-h"/>*/}
                  {/*</div>*/}
                  <button type="button" className="btn btn-circle btn-default" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="fa fa-ellipsis-h"/>
                  </button>
                  <div className="dropdown-menu">
                    <a className="dropdown-item" onClick={() => alert("Song Added (not really)")}>Add to Deck 1</a>
                    <a className="dropdown-item" onClick={() => alert("Song Added (not really)")}>Add to Deck 2</a>
                    <div className="dropdown-divider"/>
                    <a className="dropdown-item" onClick={() => alert("Song Removed (not really)")}>Remove from Queue</a>
                  </div>
                </div>
              </div>
            </div>
          :
            ""
          }
        </div>
      </div>
    );
  }
}
