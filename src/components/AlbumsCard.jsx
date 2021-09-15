import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AlbumCard from './AlbumCard';

export default class AlbumsCard extends Component {
  render() {
    const { albumsInfo } = this.props;
    if (albumsInfo.length === 0) {
      return <p>Nenhum álbum foi encontrado</p>;
    }
    return (
      <div>
        { albumsInfo.map((album, index) => <AlbumCard key={ index } info={ album } />) }
      </div>
    );
  }
}

AlbumsCard.propTypes = {
  albumsInfo: PropTypes.arrayOf(
    PropTypes.shape({
      artistName: PropTypes.string.isRequired,
      collectionId: PropTypes.number.isRequired,
      collectionName: PropTypes.string.isRequired,
      artworkUrl100: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};
