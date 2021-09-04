import React, { useState } from 'react';
import PropTypes from 'prop-types';


export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    props.onLoggedIn(username);
  };

    const handleRegistration = (e) => {
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
      <button className="registerBtn" type="button" onClick={handleRegistration}>Register</button>
    </form>
  );
}

LoginView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }),
    
  handleSubmit: PropTypes.func,  
  handleRegistration: PropTypes.func
};
