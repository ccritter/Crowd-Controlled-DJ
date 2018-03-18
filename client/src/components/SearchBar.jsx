/* global gapi */
import React, { Component } from 'react';

export default class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.search = this.search.bind(this);
  }

  search(e) {
    e.preventDefault();
    let query = this.input.value;
    let request = gapi.client.youtube.search.list({
      type: 'video',
      videoEmbeddable: true,
      maxResults: 12,
      part: 'snippet',
      q: query
    });

    request.execute((res) => {
      this.props.sendResults(res);
      // this.setState({
      //   results: res.items
      // });
    });
  }

  // showResults = (res) => {
  //   // TODO: do some error handling
  //   return <SearchResults items={res.items}/>
  // }

  render() {
    return (
      <div className="SearchBar">
        <form className="input-group" onSubmit={this.search}>
          <input
            type="text"
            className="form-control"
            placeholder="Search for a song"
            ref={(input) => this.input = input}/>
          <button className="btn btn-default" type="submit">Search</button>
        </form>
      </div>
    );
  }
}
