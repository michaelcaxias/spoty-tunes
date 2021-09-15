import React, { Component } from 'react';
import getMusics from '../services/musicsAPI';
import Header from '../components/Header';

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
    const { params: { id } } = this.props.match;
    const musics = await getMusics(id);
    this.setState({
      arrayOfMusics: [...musics],
      artistName: musics[0].artistName,
      albumName: musics[0].collectionName,
      albumImage: musics[0].artworkUrl100,
    });
  }

  render() {
    const { artistName, albumImage, albumName } = this.state;
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
        </div>
      </>
    );
  }
}
