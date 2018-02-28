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
        <h2>Up Next</h2>
        <SearchBar sendResults={this.props.sendResults}/>
        <Queue socket={this.props.socket} songs={this.props.songlist}/>
      </div>
    );
  }
}
