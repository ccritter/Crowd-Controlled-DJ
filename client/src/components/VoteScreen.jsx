import React, { Component } from 'react';
import SearchBar from './SearchBar';
import Queue from './Queue';

export default class VoteScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="VoteScreen">
        <SearchBar socket={this.props.socket} room={this.props.room}/>
        <Queue socket={this.props.socket} songs={this.props.songlist}/>
      </div>
    );
  }
}
