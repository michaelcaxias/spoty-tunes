import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';

export default class Album extends Component {
  constructor() {
    super();
    this.state = {
      arrayOfMusics: [],
    };
    this.fetchUrl = this.fetchUrl.bind(this);
  }

  componentDidMount() {
    this.fetchUrl();
  }

  async fetchUrl() {
    const { match: { params: { id } } } = this.props;
    const musics = await getMusics(id);
    this.setState({
      arrayOfMusics: musics,
      artistName: musics[0].artistName,
      albumName: musics[0].collectionName,
      albumImage: musics[0].artworkUrl100,
    });
  }

  render() {
    const { arrayOfMusics, artistName, albumImage, albumName } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-album">
          <h1>Album</h1>
          <div>
            <img src={ albumImage } alt="Imagem Album" />
            <h2 data-testid="artist-name">{ artistName }</h2>
            <h3 data-testid="album-name">{ albumName }</h3>
          </div>
          { arrayOfMusics.slice(1)
            .map((music, index) => <MusicCard key={ index } music={ music } />) }
        </div>
      </>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
