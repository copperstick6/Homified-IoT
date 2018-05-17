import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Navbar, NavItem, Nav} from 'react-bootstrap'

class Navigation extends Component {
  render() {
    return (
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#brand">HIoT</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
      </Navbar>
    );
  }
}

export default Navigation;
