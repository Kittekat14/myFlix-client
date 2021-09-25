import React, { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import './login-view.scss';
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ nameError, setNameError ] = useState({});
  const [ passwordError, setPasswordError ] = useState({});

  const history = useHistory();

  function registerButton()  {
      history.push("/register");
    } 
  
  const handleLogin = (e) => {
    e.preventDefault();
    const isValid = loginValidation();
    if(isValid) {
    axios.post('https://actor-inspector.herokuapp.com/login', {
      username: username,
      password: password
    })
    .then(response => {
      const data = response.data;
      props.onLoggedIn(data);
    })
    .catch(e => {
      console.log('no such user');
    });
  }}

  const loginValidation = () => {
    const nameError = {};
    const passwordError = {};
    let isValid = true; //initial/default flag
    if(username.trim().length < 5) {
      nameError.nameShort = 'Username must at least have 5 characters.';
      isValid = false;
    }
    if(password.trim().length === 0) {
      passwordError.passwordEmpty = 'Password cannot be empty.';
      isValid = false;
    }
    // else (if errors are blank objects)
    setNameError(nameError);
    setPasswordError(passwordError);
    return isValid;
  }


return (
  <>
  <Form onSubmit={handleLogin}>
  <h1>Login</h1>

    <Form.Group className="mb-3" controlId="formUsername">
      <Form.Label>Username:</Form.Label>
      <Form.Control type="text" placeholder="Enter Username" value={username} onChange={e => setUsername(e.target.value)} required onInput={loginValidation}/>
      {Object.keys(nameError).map((key) => {
        return <div style={{ fontSize: 12, color:'red'}} key={key}>{nameError[key]}</div>
      })}
    </Form.Group>

    <Form.Group className="mb-3" controlId="formPassword">
      <Form.Label>Password:</Form.Label>
      <Form.Control type="password" placeholder="Enter Password" value={password} onChange={e => setPassword(e.target.value)} required onInput={loginValidation} />
      {Object.keys(passwordError).map((key) => {
        return <div style={{ fontSize: 12, color:'red'}} key={key}>{passwordError[key]}</div>
      })}
    </Form.Group>
    
    <Button className="m-2" variant="primary" type="submit">
    Submit
    </Button>
    
    <Button className="m-2 register-view-button" type="button" onClick={registerButton}>
      Register
    </Button>
    
  </Form>
  </>
);
}

LoginView.propTypes = {
  onLoggedIn: PropTypes.func
};

const mapDispatchToProps = (dispatch) => ({
  handleLogin: (username, password) => dispatch(handleLogin(username, password))
});

export default connect(null, mapDispatchToProps)(LoginView);
