import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { RegistrationView } from '../registration-view/registration-view';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSignin = (e) => {
    e.preventDefault();
    console.log(username, password);
    props.onLoggedIn(username);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    <RegistrationView />
  };

  return (
    <form>
      <label>
        Username:
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      <button type="submit" onClick={handleSignin}>Sign in</button>
      <button type="submit" onClick={handleSignup}>Sign up</button>
    </form>
  );
}

LoginView.propTypes = {
  username: PropTypes.string,
  password: PropTypes.string
}
