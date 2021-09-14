import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      loading: true,
    };
  }

  componentDidMount() {
    this.getUsername();
  }

  async getUsername() {
    const userObject = await getUser();
    const { name } = userObject;
    this.setState({
      username: name,
      loading: false,
    });
  }

  render() {
    const { loading, username } = this.state;
    return (
      <header data-testid="header-component">
        <h1 data-testid="header-user-name">
          { loading
            ? <Loading /> : `Olá, ${username}!` }
        </h1>
        <Link data-testid="link-to-search" to="/search" />
        <Link data-testid="link-to-favorites" to="/favorites" />
        <Link data-testid="link-to-profile" to="/profile" />
      </header>
    );
  }
}
