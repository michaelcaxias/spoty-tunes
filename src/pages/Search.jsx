import React, { Component } from 'react';
import Header from '../components/Header';

export default class Search extends Component {
  render() {
    return (
      <>
        <Header />
        <div data-testid="page-search">
          <h1>Search</h1>
        </div>
      </>
    );
  }
}
