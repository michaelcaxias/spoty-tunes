import React, { Component } from 'react';
import { Redirect } from 'react-router';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';

export default class ProfileEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      submit: false,
      name: '',
      email: '',
      image: '',
      description: '',
    };
    this.getUsername = this.getUsername.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.getUsername();
  }

  handleChange({ target: { id, value } }) {
    this.setState({ [id]: value });
  }

  async handleClick() {
    this.setState({ loading: true });
    const { name, email, image, description } = this.state;
    const newUser = { name, email, image, description };
    await updateUser(newUser);
    this.setState({
      loading: false,
      submit: true,
    });
  }

  async getUsername() {
    const userData = await getUser();
    const { name, email, image, description } = userData;
    this.setState({
      loading: false,
      name,
      email,
      image,
      description,
    });
  }

  render() {
    const {
      state: { loading, submit, name, email, image, description },
      handleChange, handleClick } = this;

    const validateInput = name !== ''
    && email !== '' && image !== '' && description !== '';

    const profilePage = (
      <form>
        <h2>Editar perfil</h2>
        <label htmlFor="image">
          Imagem:
          <img src={ image } alt="perfil" width="100px" />
          <input
            type="text"
            data-testid="edit-input-image"
            value={ image }
            id="image"
            onChange={ handleChange }
            required
          />
        </label>
        <label htmlFor="name">
          Nome:
          <input
            type="text"
            data-testid="edit-input-name"
            value={ name }
            id="name"
            onChange={ handleChange }
            required
          />
        </label>
        <label htmlFor="email">
          E-mail:
          <input
            type="text"
            data-testid="edit-input-email"
            value={ email }
            id="email"
            onChange={ handleChange }
            required
          />
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            type="text"
            data-testid="edit-input-description"
            value={ description }
            id="description"
            onChange={ handleChange }
            required
          />
        </label>
        <button
          type="button"
          data-testid="edit-button-save"
          onClick={ handleClick }
          disabled={ !validateInput }
        >
          Salvar
        </button>
      </form>
    );
    return (
      <div data-testid="page-profile-edit">
        <Header />
        { loading ? <Loading /> : profilePage }
        { submit ? <Redirect to="/profile" /> : '' }
      </div>
    );
  }
}
