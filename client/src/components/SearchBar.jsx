/* global gapi */
import React, { Component } from 'react';

export default class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.search = this.search.bind(this);
  }

  search = (e) => {
    e.preventDefault();
    let query = this.input.value;
    let request = gapi.client.youtube.search.list({
      type: 'video',
      videoEmbeddable: true,
      q: query,
      part: 'id' // prob make the part a snippet or something even more if I want thumbs and titles and stuff
    });

    request.execute((res) => { console.log(res)});
  }

  render() {
    // TODO replace the search button with something nicer looking
    return (
      <div className="SearchBar">
        <form onSubmit={this.search}>
          <input
            type="text"
            placeholder="Song Search"
            ref={(input) => this.input = input}/>
          <button type="submit">Search</button>
        </form>
      </div>
    );
  }
}
