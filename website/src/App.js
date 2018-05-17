import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Navigation from './Navbar'
import Requests from './AddRequest'


class App extends Component {
  render() {
    return (
      <div>
      <Navigation />
      <Requests />
      </div>
    );
  }
}

export default App;
