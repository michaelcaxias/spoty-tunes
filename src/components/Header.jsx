import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      loading: true,
    };
  }

  componentDidMount() {
    this.getUsername();
  }

  async getUsername() {
    const { name } = await getUser();
    this.setState({
      name,
      loading: false,
    });
  }

  render() {
    const { loading, name } = this.state;
    return (
      <header data-testid="header-component">
        <span data-testid="header-user-name">
          { loading
            ? <Loading /> : name }
        </span>
        <Link data-testid="link-to-search" to="/search">Search</Link>
        <Link data-testid="link-to-favorites" to="/favorites">Favorites</Link>
        <Link data-testid="link-to-profile" to="/profile">Profile</Link>
      </header>
    );
  }
}

// Leticia Cardoso me ajudou na linha 33 a 34 para fazer o req11 passar!
