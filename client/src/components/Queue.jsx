import React, { Component } from 'react';
import QueuedSong from './QueuedSong'

export default class Queue extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={(this.props.hidden ? "d-none " : "") + "Queue h-85"}>
        {this.props.songs.length === 0 ?
            <div className="w-100 h-100 text-center p-3">
              <p className="w-100 h-100 empty-state d-flex align-items-center justify-content-center"><span>No songs in queue</span></p>
            </div>
            :
            <div>
              {this.props.songs.map((song) => {
                return (
                    <QueuedSong song={song} socket={this.props.socket} room={this.props.room} mode={this.props.mode}/>
                );
              })}
            </div>
        }
      </div>
    );
  }
}
