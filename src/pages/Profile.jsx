import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

export default function Profile() {
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');

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

  const profilePage = (
    <div data-testid="page-profile">
      <img src={ image } alt="perfil" width="100px" data-testid="profile-image" />
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
