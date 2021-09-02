import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { RegisterView } from '../register-view/register-view';

export function LoginView(props) {
  const [ register, setRegister ] = useState('');
  const [ user, setUser ] = useState('');
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    props.onLoggedIn(username);
  };

  const handleRegistration = (e) => {
    if(register) return <RegisterView onRegistration={ register => this.onRegistration(register) } />;
    if(user) return <RegisterView onRegistration={ register => this.onRegistration(register)} />
  }

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
      <button className="loginBtn" type="submit" onClick={handleSubmit}>Login</button>
      <button className="registerBtn" type="button" onClick={handleRegistration}>Register</button>
    </form>
  );
}
