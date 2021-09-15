import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class AlbumCard extends Component {
  render() {
    const {
      info: {
        artistName,
        collectionId,
        collectionName,
        artworkUrl100,
      },
    } = this.props;
    return (
      <div>
        <img src={ artworkUrl100 } alt={ `Imagem do Album ${collectionName}` } />
        <p>{ collectionName }</p>
        <p>{ artistName }</p>
        <Link
          to={ `/album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
        >
          Mais informações
        </Link>
      </div>
    );
  }
}

AlbumCard.propTypes = {
  info: PropTypes.shape({
    artistName: PropTypes.string.isRequired,
    collectionId: PropTypes.number.isRequired,
    collectionName: PropTypes.string.isRequired,
    artworkUrl100: PropTypes.string.isRequired,
  }).isRequired,
};
