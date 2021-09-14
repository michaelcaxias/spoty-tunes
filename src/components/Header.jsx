import React, { Component } from 'react';
// import { getUser } from '../services/userAPI';
export default class Header extends Component {
  render() {
    return (
      <header data-testid="header-component">
        <h1>Header</h1>
        <h2 data-testid="header-user-name">{() => getUser()}</h2>
      </header>
    );
  }
}
