import React, { useState } from 'react';
import PropTypes from 'prop-types';


export function RegisterView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthdate, setBirthdate] = useState("");
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthdate);
    props.onRegistration(username);
    props.onLoginClick(false)
  };

  const handleLogin = (e) => {
    props.onLoginClick(false);
  };


  return (
    <form>
      <label className="username">
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label className="password">
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <label className="email">
        E-mail:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label className="birthdate">
        Birth date:
        <input
          type="date"
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
        />
      </label>
      <button className="registerBtn" type="submit" onClick={handleSubmit}>Register</button>
      <button className="loginBtn" type="button" onClick={handleLogin}>Login</button>
      
    </form>
  )
}

RegisterView.propTypes = {
  register: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    birthdate: PropTypes.string
  }),
  
  handleSubmit: PropTypes.func,
  handleLogin: PropTypes.func    
};


