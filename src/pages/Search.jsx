import React, { Component } from 'react';
import AlbumsCard from '../components/AlbumsCard';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artistName: '',
      value: '',
      loading: false,
      enableArtist: false,
      arrayOfAlbums: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.clearAndFetch = this.clearAndFetch.bind(this);
  }

  handleChange({ target: { value } }) {
    this.setState({ value });
  }

  async clearAndFetch() {
    const { value } = this.state;
    this.setState({ loading: true });
    const response = await searchAlbumsAPI(value);
    this.setState({
      artistName: value,
      value: '',
      loading: false,
      enableArtist: true,
      arrayOfAlbums: [...response],
    });
  }

  render() {
    const { state: {
      value,
      loading,
      enableArtist,
      artistName,
      arrayOfAlbums,
    }, handleChange, clearAndFetch } = this;

    const resultArtist = (
      <p>
        Resultado de álbuns de:
        {' '}
        { artistName }
      </p>
    );

    const searchLabel = (
      <div data-testid="page-search">
        <form>
          <input
            type="text"
            value={ value }
            data-testid="search-artist-input"
            onChange={ handleChange }
          />
          <button
            type="button"
            onClick={ clearAndFetch }
            data-testid="search-artist-button"
            disabled={ value.length < 2 }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );

    return (
      <>
        <Header />
        { loading ? <Loading /> : searchLabel }
        { enableArtist ? resultArtist : '' }
        { enableArtist
          ? <AlbumsCard albumsInfo={ arrayOfAlbums } /> : '' }
      </>
    );
  }
}
