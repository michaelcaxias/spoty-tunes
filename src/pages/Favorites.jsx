import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

export default class Favorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      arrayOfMusics: [],
    };
  }

  componentDidMount() {
    this.getSongs();
  }

  async getSongs() {
    const getSavedSongs = await getFavoriteSongs();
    this.setState({
      loading: false,
      arrayOfMusics: getSavedSongs,
    });
  }

  render() {
    const { state: { loading, arrayOfMusics } } = this;
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
}
