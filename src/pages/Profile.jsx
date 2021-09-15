import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      name: '',
      email: '',
      image: '',
      description: '',
    };
    this.getUsername = this.getUsername.bind(this);
  }

  componentDidMount() {
    this.getUsername();
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
    const { loading, name, email, image, description } = this.state;
    const profilePage = (
      <div data-testid="page-profile">
        <img src={ image } alt="perfil" width="100px" data-testid="profile-image" />
        <p>{ name }</p>
        <p>{ name }</p>
        <p>{ email }</p>
        <p>{ description }</p>
        <Link to="/profile/edit">Editar perfil</Link>
      </div>
    );
    return (
      <>
        <Header />
        { loading ? <Loading /> : profilePage }
      </>
    );
  }
}
