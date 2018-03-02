import React, { Component } from 'react';
import SearchBar from './SearchBar';
import Queue from './Queue';

export default class VoteScreen extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className="VoteScreen border-right border-dark">
          <div className="border-bottom border-dark p-3">
              <div className="row">
                  <div className="col-8">
                      <h2>Up Next</h2>
                  </div>
                  <div className="col-4">
                      <button type="button" className="btn btn-secondary" aria-label="Auto">
                          Autoplay
                      </button>
                  </div>
              </div>
              <div className="row pl-3">
                  <SearchBar sendResults={this.props.sendResults}/>
              </div>
          </div>
        <Queue socket={this.props.socket} songs={this.props.songlist} room={this.props.room} mode={this.props.mode}/>
      </div>
    );
  }
}
