import React, { useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

const THREE = 3;

export default function Login() {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const loginSubmit = async () => {
    setLoading(true);
    await createUser({ name });
    history.push('/search');
  };

  const formLogin = (
    <div data-testid="page-login">
      <h1>Login</h1>
      <form>
        <input
          type="text"
          value={ name }
          onChange={ ({ target: { value } }) => setName(value) }
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
