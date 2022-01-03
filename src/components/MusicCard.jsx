import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default function MusicCard({ music }) {
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);

  const { trackId, trackName, previewUrl } = music;

  const handleChange = async ({ target }) => {
    setLoading(true);
    if (target.checked) {
      await addSong(music);
      setLoading(false);
      setChecked(true);
    } else {
      await removeSong(music);
      setLoading(false);
      setChecked(false);
    }
  };

  useEffect(() => {
    const fetchFavoriteSongs = async () => {
      // Ajuda do Rodolfo Braga
      const getSongs = await getFavoriteSongs();
      const songId = getSongs.some((song) => song.trackId === trackId);
      return songId && setChecked(true);
    };
    fetchFavoriteSongs();
  }, [trackId]);

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

MusicCard.propTypes = {
  music: PropTypes.shape({
    previewUrl: PropTypes.string.isRequired,
    trackName: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
  }).isRequired,
};
