import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      loading: false,
      redirect: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.loginSubmit = this.loginSubmit.bind(this);
  }

  handleChange({ target: { value } }) {
    this.setState({
      name: value,
    });
  }

  async loginSubmit() {
    const { name } = this.state;
    this.setState({ loading: true });
    await createUser({ name });
    this.setState({ redirect: true });
  }

  render() {
    const THREE = 3;
    const { state: { name, loading, redirect }, handleChange, loginSubmit } = this;
    if (loading) {
      return (
        <>
          <Loading />
          { redirect ? <Redirect to="/search" /> : '' }
        </>
      );
    }
    return (
      <div data-testid="page-login">
        <h1>Login</h1>
        <form>
          <input
            type="text"
            value={ name }
            onChange={ handleChange }
            data-testid="login-name-input"
          />
          <button
            type="button"
            data-testid="login-submit-button"
            onClick={ loginSubmit }
            disabled={ name.length < THREE }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}
