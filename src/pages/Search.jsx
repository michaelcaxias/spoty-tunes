import React, { useState } from 'react';
import AlbumsCard from '../components/AlbumsCard';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';

export default function Search() {
  const [artistName, setArtistName] = useState('');
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [enableArtist, setEnableArtist] = useState(false);
  const [arrayOfAlbums, setArrayOfAlbums] = useState([]);

  const clearAndFetch = async () => {
    setLoading(true);
    const albums = await searchAlbumsAPI(value);
    setArtistName(value);
    setValue('');
    setLoading(false);
    setEnableArtist(true);
    setArrayOfAlbums(albums);
  };

  const resultArtist = (
    <p>
      {`Resultado de álbuns de: ${artistName}`}
    </p>
  );

  const searchLabel = (
    <div data-testid="page-search">
      <form>
        <input
          type="text"
          value={ value }
          data-testid="search-artist-input"
          onChange={ ({ target }) => setValue(target.value) }
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
