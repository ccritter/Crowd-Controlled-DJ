import React, { Component } from 'react';
import VoteScreen from './VoteScreen'
import Topbar from './Topbar'
import Turntable from './Turntable'
import SearchResults from './SearchResults'

export default class MainContainer extends Component {
  constructor(props) {
    super(props);

    this.state = { results: [],
                   resultsAreVisible: false,
                   width: window.innerWidth};
    this.showResults = this.showResults.bind(this);
    this.hideResults = this.hideResults.bind(this);
  }

  componentWillMount() {
    window.addEventListener('resize', this.handleWindowSizeChange);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange);
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  }

  showResults(res) {
    this.setState({ results: res.items });
    this.setState({ resultsAreVisible: true });
  }

  hideResults() {
    this.setState({ resultsAreVisible: false });
  }

  render() {
    let isMobile = this.state.width <= 768;
    // TODO: when in mobile and a host, allow the play button to appear.
    return (
      <div>
        <div className="MainContainer container-fluid">
        {isMobile ?
          <div className="col-12">
            <VoteScreen socket={this.props.socket}
                        songlist={this.props.songlist}
                        room={this.props.room}
                        mode={this.props.mode}
                        sendResults={this.showResults}
                        hideQueue={this.state.resultsAreVisible}/>
            <SearchResults visible={this.state.resultsAreVisible}
                           socket={this.props.socket}
                           results={this.state.results}
                           room={this.props.room}
                           mode={this.props.mode}
                           isMobile={true}
                           hideResults={this.hideResults}/>
          </div>
        :
          <div className="row">
            <VoteScreen socket={this.props.socket}
                        songlist={this.props.songlist}
                        room={this.props.room}
                        mode={this.props.mode}
                        sendResults={this.showResults}
                        hidden={this.state.resultsAreVisible}/>
            <div className="col-sm-12 main">
              <Topbar room={this.props.room} mode={this.props.mode} leaveRoom={this.props.leaveRoom}/>
              <SearchResults visible={this.state.resultsAreVisible}
                             socket={this.props.socket}
                             results={this.state.results}
                             room={this.props.room}
                             mode={this.props.mode}
                             isMobile={false}
                             hideResults={this.hideResults}/>
            </div>
          </div>
        }
        {this.props.mode === 2 ? <Turntable hidden={this.state.resultsAreVisible} room={this.props.room}/> : null}
      </div>


      {/*<div className="MainContainer container-fluid">*/}
        {/*<div className="row">*/}
          {/*<VoteScreen socket={this.props.socket}*/}
                      {/*songlist={this.props.songlist}*/}
                      {/*room={this.props.room}*/}
                      {/*mode={this.props.mode}*/}
                      {/*sendResults={this.showResults}*/}
                      {/*hidden={this.state.resultsAreVisible}/>*/}
          {/*<div className="col-sm-12 main">*/}
            {/*<Topbar room={this.props.room} mode={this.props.mode} leaveRoom={this.props.leaveRoom}/>*/}
            {/*{this.props.mode === 2 ? <Turntable hidden={this.state.resultsAreVisible} room={this.props.room}/> : ""}*/}
            {/*<SearchResults visible={this.state.resultsAreVisible}*/}
                           {/*socket={this.props.socket}*/}
                           {/*results={this.state.results}*/}
                           {/*room={this.props.room}*/}
                           {/*mode={this.props.mode}*/}
                           {/*hideResults={this.hideResults}/>*/}
          {/*</div>*/}
        {/*</div>*/}
      </div>
    );
  }
}
