import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { MainView } from '../main-view/main-view';
import { RegisterView } from '../register-view/register-view';

export function LoginView(props) {
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
    e.preventDefault();
    console.log(username);
    props.onRegisterClick(true);
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
      <button className="registerBtn" type="submit" onClick={handleRegistration}>Register</button>
    </form>
  );
}

LoginView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }),
  onLoggedIn: PropTypes.func,  
  handleSubmit: PropTypes.func,  
  handleRegistration: PropTypes.func,  
  toRegister: PropTypes.func
};
