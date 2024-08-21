import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';

export default function ProfileEdit() {
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');

  const history = useHistory();

  const handleClick = async () => {
    setLoading(true);
    const newUser = { name, email, image, description };
    await updateUser(newUser);
    setLoading(false);
    history.push('/profile');
  };

  const getUsername = async () => {
    const userData = await getUser();
    const {
      name: newName,
      email: newEmail,
      image: newImage,
      description: newDescription,
    } = userData;
    setLoading(false);
    setName(newName);
    setEmail(newEmail);
    setImage(newImage);
    setDescription(newDescription);
  };

  useEffect(() => {
    getUsername();
  }, []);

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
          onChange={ ({ target: { value } }) => setImage(value) }
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
          onChange={ ({ target: { value } }) => setName(value) }
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
          onChange={ ({ target: { value } }) => setEmail(value) }
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
          onChange={ ({ target: { value } }) => setDescription(value) }
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
    </div>
  );
}
