import React, { Component } from 'react';
import VoteScreen from './VoteScreen'
import Topbar from './Topbar'
import Turntable from './Turntable'
import SearchResults from './SearchResults'

export default class MainContainer extends Component {
  constructor(props) {
    super(props);

    this.state = { results: [], resultsAreVisible: false};
    this.showResults = this.showResults.bind(this);
    this.hideResults = this.hideResults.bind(this);
  }

  showResults(res) {
    this.setState({ results: res.items });

    this.setState({ resultsAreVisible: true });
  }

  hideResults() {
    this.setState({ resultsAreVisible: false });
  }

  render() {
    // Logic for displaying the search results when necessary
    let content;
    let searchResults = <SearchResults socket={this.props.socket} results={this.state.results} room={this.props.room}/>;
    let closeButton =
      <button type="button" className="close" onClick={this.hideResults} aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>

    // TODO: BIG ASS BUG!! When results are visible for the DJ, the decks are gone and so audio stops and the iframe is reloaded. Move players/data out of the decks? or just draw the results on top?
    if (this.props.mode === 1) {
      // User is a guest. See if they're on mobile. If so, we need to check if results are currently visible:
      // TODO
      // If not, content will be the search results.
      content = searchResults;
    } else {
      // User is a host. See if search results should be displayed:
      if (this.state.resultsAreVisible) {
        content =
          <div>
            {closeButton}
            {searchResults}
          </div>;
      } else {
        content = <Turntable room={this.props.room}/>;
      }
    }

    return (
      <div className="MainContainer container-fluid">
        <div className="row">
          <VoteScreen socket={this.props.socket}
                      songlist={this.props.songlist}
                      room={this.props.room}
                      sendResults={this.showResults}/>
          <div className="col-sm-12 main">
            <Topbar room={this.props.room}/>
            {content}
          </div>
        </div>
      </div>
    );
  }
}
