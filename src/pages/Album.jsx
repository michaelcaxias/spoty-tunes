import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getMusics from '../services/musicsAPI';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';

export default function Album() {
  const [arrayOfMusics, setArrayOfMusics] = useState([]);
  const [artistName, setArtistName] = useState('');
  const [albumName, setAlbumName] = useState('');
  const [albumImage, setAlbumImage] = useState('');
  const { id } = useParams();

  useEffect(() => {
    const fetchUrl = async () => {
      const musics = await getMusics(id);
      setArrayOfMusics(musics);
      setArtistName(musics[0].artistName);
      setAlbumName(musics[0].collectionName);
      setAlbumImage(musics[0].artworkUrl100);
    };
    fetchUrl();
  }, [id]);

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
