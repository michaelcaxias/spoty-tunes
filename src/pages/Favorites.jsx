import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

export default function Favorites() {
  const [loading, setLoading] = useState(true);
  const [arrayOfMusics, setArrayOfMusics] = useState([]);

  useEffect(() => {
    const getSongs = async () => {
      const getSavedSongs = await getFavoriteSongs();
      setLoading(false);
      setArrayOfMusics(getSavedSongs);
    };
    getSongs();
  }, []);

  const favoritePage = (
    <>
      <Header />
      <div data-testid="page-favorites">
        <h1>Favorites</h1>
        { arrayOfMusics
          .map((music, index) => <MusicCard key={ index } musics={ music } />) }
      </div>
    </>
  );
  return (
    loading ? <Loading /> : favoritePage
  );
}
