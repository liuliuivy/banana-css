import React, { Component } from 'react';
import './Header.css'
import logo from './BananatagLogo.svg';

class Header extends Component {
  render() {
    return (
      <div className="Header">
      <img src={logo} className="logo"/>
        <h2>Sign Up</h2>
        <p> Welcome to Bananatag!</p>  
      </div>
    );
  }
}

export default Header;
