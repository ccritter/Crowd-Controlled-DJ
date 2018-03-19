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
      <div className={(this.props.visible ? "" : "d-none ") + "SearchResults"}>
        <div className="row">
          {this.props.mode === 2 || this.props.isMobile ?
            <button type="button" className="btn btn-circle" onClick={this.props.hideResults} aria-label="Close">
              <i className="fa fa-times"/>
            </button>
          :
            null}
          <h2 className="pl-2">Search Results</h2>
        </div>
        <div className="row flex-wrap justify-content-between">
          {this.props.results.map((result) => {
            let s = result.snippet;
            let id = result.id.videoId;
            let title = s.title;
            let channelName = s.channelTitle;
            let thumbnail = s.thumbnails.default.url;

            return (
              <div key={id} className="col d-flex flex-column align-items-center mx-4 mb-3">
                <img src={thumbnail} className="pb-2"/>
                <span className="text-center pb-2">{title}</span>
                <span className="text-center pb-2 channel-name">{channelName}</span>
                <button className="btn btn-default" onClick={() => { this.addSong({
                   id: id,
                   title: title,
                   channelName: channelName,
                   thumbnail: thumbnail }) }}>
                  Add to Queue
                </button>
              </div>
            );})}
          </div>
      </div>
    );
  }
}
