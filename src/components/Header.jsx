import React, { Component } from 'react';
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
        <h1>Header</h1>
        <h2 data-testid="header-user-name">
          { loading
            ? <Loading /> : `Olá, ${username}!` }
        </h2>
      </header>
    );
  }
}
