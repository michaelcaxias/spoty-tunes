import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      loading: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.loginSubmit = this.loginSubmit.bind(this);
  }

  handleChange({ target: { value } }) {
    this.setState({
      name: value,
    });
  }

  // Olhei este repositório para elaborar a função abaixo:
  // https://github.com/tryber/sd-014-b-project-trybetunes/pull/47/files

  async loginSubmit() {
    const { name } = this.state;
    const { history } = this.props;
    this.setState({ loading: true });
    await createUser({ name });
    history.push('/search');
  }

  render() {
    const THREE = 3;
    const { state: { name, loading }, handleChange, loginSubmit } = this;
    const formLogin = (
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
    return loading ? <Loading /> : formLogin;
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
