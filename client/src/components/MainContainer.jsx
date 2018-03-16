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
    let searchResults;
    let closeButton =
      <button type="button" className="btn btn-circle" onClick={this.hideResults} aria-label="Close">
        <i className="fa fa-times"/>
      </button>;

    if (this.props.mode === 1) {
      // User is a guest. Use CSS to put the results on top. Check if results are currently visible:
      // TODO
      // If not, content will be the search results.
      content = searchResults;
    } else {
      // User is a host. See if search results should be displayed:
      if (this.state.resultsAreVisible) {
        content =
          <div className="row">
            <div className="col-1">
              {closeButton}
            </div>
            <div className="col-11">
              {searchResults}
            </div>
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
                      mode={this.props.mode}
                      sendResults={this.showResults}/>
          <div className="col-sm-12 main">
            <Topbar room={this.props.room} mode={this.props.mode}/>
            {this.props.mode === 2 ? <Turntable hidden={this.state.resultsAreVisible} room={this.props.room}/> : ""}
            <SearchResults visible={this.state.resultsAreVisible}
                           socket={this.props.socket}
                           results={this.state.results}
                           room={this.props.room}
                           mode={this.props.mode}
                           hideResults={this.hideResults}/>
          </div>
        </div>
      </div>
    );
  }
}
