import React, { Component } from 'react';

export default class QueuedSong extends Component {
  constructor(props) {
    super(props);

    this.upvote = this.upvote.bind(this);
  }

  upvote = () => {
    this.props.socket.emit('upvote', this.props.song);
  }

  downvote = () => {
    this.props.socket.emit('downvote', this.props.song);
  }

  render() {
    return (
      <div className="QueuedSong">
        <img src={this.props.song.thumbnail} alt="thumbnail" />
        <p>{this.props.song.id}</p>
        <p>{this.props.song.title}</p>
        <div className="arrow-upvote" onClick={this.upvote}/>
        <p>{this.props.song.numVotes}</p>
        <div className="arrow-downvote" onClick={this.downvote}/>
      </div>
    );
  }
}
