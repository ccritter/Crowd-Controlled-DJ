import React, { Component } from 'react';
import SearchBar from './SearchBar';

export default class VoteScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="VoteScreen">
        Yer tha audience
        <SearchBar/>
      </div>
    );
  }
}
