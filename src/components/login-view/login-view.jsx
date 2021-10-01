import React, { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import './login-view.scss';
import { useHistory } from "react-router-dom";


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
    .catch(err => {
      let errorMessage = document.querySelector('#fail');
      errorMessage.innerHTML = 'Wrong Username or Password';
    });
  }
}

  const loginValidation = () => {
    const nameError = {};
    const passwordError = {};
    let isValid = true; //initial/default flag
    
    if(username.trim().length < 5) {
      nameError.nameShort = 'The username must have at least 5 characters.';
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
      <Form.Control type="text" placeholder="Enter Username" value={username} onChange={e => setUsername(e.target.value)} required />
      {Object.keys(nameError).map((key) => {
        return <div style={{ fontSize: 14, fontWeight: 600, color:'red'}} key={key}>{nameError[key]}</div>
      })}
    </Form.Group>

    <Form.Group className="mb-3" controlId="formPassword">
      <Form.Label>Password:</Form.Label>
      <Form.Control type="password" placeholder="Enter Password" value={password} onChange={e => setPassword(e.target.value)} required />
      {Object.keys(passwordError).map((key) => {
        return <div style={{ fontSize: 14, fontWeight: 600, color:'red'}} key={key}>{passwordError[key]}</div>
      })}
    </Form.Group>
    
    <div id="fail" style={{ fontSize: 14, fontWeight: 600, color:'red'}}></div>
    
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

// Nizar added this, I don't understand it, because I have onLoggedIn as only prop I think
LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired
}