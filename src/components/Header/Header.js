//IMPORTS
import React, { Component } from 'react';
//CSS
import "./Header.scss";

class Header extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    console.log(`${this.props.page}`);
  }
  render() {
    return (
      <header>
        <a href="#" id="logo"></a>
        <span id="pageName">{this.props.page}</span>
        <span id="operatorname">{localStorage.getItem('name')}</span>
      </header>
    );
  }
}

export default Header;
