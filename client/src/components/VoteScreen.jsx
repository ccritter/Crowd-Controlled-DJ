import React, { Component } from 'react';
import SearchBar from './SearchBar';
import Queue from './Queue';

export default class VoteScreen extends Component {
  constructor(props) {
    super(props);

  }

  // TODO: we may want to observe this in testing: Does the auto-sort-by-vote-count bother the user? like if they're about to click "upvote" and it automatically reorders so you accidentally vote for something else
  // TODO: Also, we should provide some visual feedback to the user when they click the "add to queue" button as well as loading the search results
  // TODO: Also, we need to render the room code and exit button on the QueueHeader somewhere when mobile. See the paper prototype
  // TODO: Need to hide autoplay if not the host in mobile
  // TODO: Make the search results header sticky so that it is always on top
  render() {
    return (
      <div className="VoteScreen border-right border-dark">
        <div className="QueueHeader border-bottom border-dark p-3">
          <div className="row d-flex justify-content-between px-3">
            <div>
              <h2>Up Next</h2>
            </div>
            <div>
              <button type="button" className="btn btn-secondary" aria-label="Auto">
                Autoplay
              </button>
            </div>
          </div>
          <div className="row d-flex flex-column px-3">
            <SearchBar sendResults={this.props.sendResults}/>
          </div>
        </div>
        <Queue socket={this.props.socket} songs={this.props.songlist} room={this.props.room} mode={this.props.mode} hidden={this.props.hideQueue}/>
      </div>
    );
  }
}
