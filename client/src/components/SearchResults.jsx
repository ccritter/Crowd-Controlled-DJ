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
    // TODO: Text clamping? Youtube titles are only up to 100 chars anyway. May be better to just make better fixed sizes for the title area
    return (
      <div className={(this.props.visible ? "" : "d-none ") + "SearchResults"}>
        <div className="row">
          {this.props.mode === 2 ?
            <button type="button" className="btn btn-circle" onClick={this.props.hideResults} aria-label="Close">
              <i className="fa fa-times"/>
            </button>
          :
            ""}
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
              <div key={id} className="col-3">
                <div className="row justify-content-center flex-column p-2 pb-3">
                  <img src={thumbnail} className="align-self-center pb-2"/>
                  <span className="align-self-center text-center pb-2">{title}</span>
                  <span className="align-self-center text-center pb-2 channel-name">{channelName}</span>
                  <button className="align-self-center btn btn-default" onClick={() => { this.addSong({
                    id: id,
                    title: title,
                    channelName: channelName,
                    thumbnail: thumbnail }) }}>
                      Add to Queue
                  </button>
                </div>
              </div>
            );})}
          </div>
      </div>
    );
  }
}
