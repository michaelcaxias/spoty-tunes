import React, { Component } from 'react';
import Header from '../components/Header';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target: { value } }) {
    this.setState({ value });
  }

  render() {
    const { state: { value }, handleChange } = this;
    return (
      <>
        <Header />
        <div data-testid="page-search">
          <form>
            <input
              type="text"
              data-testid="search-artist-input"
              onChange={ handleChange }
            />
            <button
              type="button"
              data-testid="search-artist-button"
              disabled={ value.length < 2 }
            >
              Pesquisar
            </button>
          </form>
        </div>
      </>
    );
  }
}
