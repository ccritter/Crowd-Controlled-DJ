import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  state = {name: ''}

  componentDidMount() {
    this.testInit();
  }

  testInit = () => {
    fetch('/api/test')
      .then(res => res.json())
      .then(resj => this.setState({ name: resj.name }));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React, {this.state.name} </h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
