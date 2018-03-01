import React, { Component } from 'react';

export default class SearchResults extends Component {
  constructor(props) {
    super(props);

    this.addSong = this.addSong.bind(this);
  }

  componentDidMount() {
    this.props.socket.on('dupesong', (data) => {
      // TODO: better handling when this happens
      alert("Song already in queue.");
    });
  }

  addSong(song) {
    this.props.socket.emit('addsong', song, this.props.room);
  }

  render() {
    return (
      <div className="SearchResults">
          <h2>Search Results</h2>
          <div className="row flex-wrap justify-content-between">
              {this.props.results.map((result) => {
                  let s = result.snippet;
                  let id = result.id.videoId;
                  let thumbnail = s.thumbnails.default.url;
                  let title = s.title;
                  return (
                      <div key={id} className="col-3">
                          <div className="row justify-content-center flex-column p-2 pb-3">
                              <img src={thumbnail} className="pb-2"/>
                              <span className="pb-2">{title}</span>
                              <button onClick={() => { this.addSong({ id: id, title: title, thumbnail: thumbnail }) }}>
                                  Suggest to Queue
                              </button>
                          </div>
                      </div>
                  );
              })}
          </div>
      </div>
    );
  }
}
