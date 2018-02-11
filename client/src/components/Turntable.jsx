import React, { Component } from 'react';
import Queue from './Queue';

export default class Turntable extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Turntable">
        Yer tha DJ in room {this.props.room}
        <Queue songs={this.props.songlist}/>
      </div>
    );
  }
}
