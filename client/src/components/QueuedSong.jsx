import React, { Component } from 'react';

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
      <div className="QueuedSong">
          <div className="row">
              <div className="col-4">
                  <img src={this.props.song.thumbnail} alt="thumbnail" />
              </div>
              <div className="col-6 p-2">
                  <p className="mb-1">{this.props.song.id}</p>
                  <p className="mb-0">{this.props.song.title}</p>
                  <p className="mb-0">{this.props.song.channelName}</p>
              </div>
              <div className="col-2 p-2">
                  <div className="row justify-content-end flex-column">
                      <div className="arrow arrow-upvote" onClick={this.upvote}>
                          <i className="fa fa-arrow-circle-up"/>
                      </div>
                      <p className="m-1">{this.props.song.numVotes}</p>
                      <div className="arrow arrow-downvote" onClick={this.downvote}>
                          <i className="fa fa-arrow-circle-down"/>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    );
  }
}
