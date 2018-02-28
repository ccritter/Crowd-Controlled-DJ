import React, { Component } from 'react';

export default class SearchResults extends Component {
  constructor(props) {
    super(props);

    this.addSong = this.addSong.bind(this);
  }

  addSong(song) {
    this.props.socket.emit('addsong', song, this.props.room);
  }

  render() {
    return (
      <div className="SearchResults">
        {this.props.results.map((result) => {
          let s = result.snippet;
          let id = result.id.videoId;
          let thumbnail = s.thumbnails.default.url;
          let title = s.title;
          return (
            <div key={id}>
              <img src={thumbnail} />
              {title}
              <button onClick={() => { this.addSong({ id: id, title: title, thumbnail: thumbnail }) }}>
                Suggest to Queue
              </button>
            </div>
          );
        })}
      </div>
    );
  }
}
