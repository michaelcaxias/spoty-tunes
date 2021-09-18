import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      checked: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.fetchFavoriteSongs = this.fetchFavoriteSongs.bind(this);
  }

  componentDidMount() {
    this.fetchFavoriteSongs();
  }

  async handleChange({ target: { checked } }) {
    const { musics } = this.props;
    this.setState({ loading: true });
    if (checked) {
      await addSong(musics);
      this.setState({
        loading: false,
        checked: true,
      });
    } else {
      await removeSong(musics);
      this.setState({
        loading: false,
        checked: false,
      });
    }
  }

  async fetchFavoriteSongs() {
    // Ajuda do Rodolfo Braga
    const { musics: { trackId } } = this.props;
    const getSongs = await getFavoriteSongs();
    const songId = getSongs.some((song) => song.trackId === trackId);
    if (songId) {
      this.setState({ checked: true });
    }
  }

  render() {
    const { props:
    { musics:
    { previewUrl, trackName, trackId } },
    state: { loading, checked },
    handleChange } = this;
    const musicDiv = (
      <>
        <p>{ trackName }</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        <label htmlFor={ trackId } data-testid={ `checkbox-music-${trackId}` }>
          Favorita
          <input
            type="checkbox"
            id={ trackId }
            checked={ checked }
            onChange={ handleChange }
          />
        </label>
      </>
    );
    return (
      loading ? <Loading /> : musicDiv
    );
  }
}

MusicCard.propTypes = {
  musics: PropTypes.shape({
    previewUrl: PropTypes.string.isRequired,
    trackName: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
  }).isRequired,
};
