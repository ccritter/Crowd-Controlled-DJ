import React, { Component } from 'react';

export default class Queue extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Queue">
        {this.props.songs.map((song) => {
          return (
            <div key={song.id}>
              <img src={song.thumbnail} alt="thumbnail" />
              <p>{song.title}</p>
              <p>{song.numVotes}</p>
            </div>
          );
        })}
      </div>
    );
  }
}
