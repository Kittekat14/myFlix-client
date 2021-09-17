import React, { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import { RegisterView } from '../register-view/register-view';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import './login-view.scss';
import { BrowserRouter as Router,
Switch,
Route,
Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";


export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ usernameError, setUsernameError ] = useState({});
  const [ passwordError, setPasswordError ] = useState({});

  const history = useHistory();

  function RegisterButton()  {
      history.push("/register");
    } 
  
  const handleLogin = (e) => {
    e.preventDefault();
    const isValid = LoginValidation();
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

  const LoginValidation = () => {
    const usernameError = {};
    const passwordError = {};
    let isValid = true; //initial/default flag
    if(username.trim().length < 5) {
      usernameError.nameShort = 'Username is too short.';
      isValid = false; //this form has this error
    }
    if(password.trim().length === 0) {
      passwordError.passwordEmpty = 'Password cannot be empty.';
      isValid = false; //this form has this error
    }
    // update error objects
    setUsernameError(usernameError);
    setPasswordError(passwordError);
    return isValid;
  }


return (
  <>
  <Form onSubmit={handleLogin}>
    <Form.Group className="mb-3" controlId="formUsername">
      <Form.Label>Username:</Form.Label>
      <Form.Control noValidate type="text" placeholder="Enter Username" value={username} onChange={e => setUsername(e.target.value)} required/>
      {Object.keys(usernameError).map((key) => {
        return <div style={{ fontSize: 12, color:'red'}}>{usernameError[key]}</div>
      })}
    </Form.Group>

    <Form.Group className="mb-3" controlId="formPassword">
      <Form.Label>Password:</Form.Label>
      <Form.Control noValidate type="password" placeholder="Enter Password" value={password} onChange={e => setPassword(e.target.value)} required/>
      {Object.keys(passwordError).map((key) => {
        return <div style={{ fontSize: 12, color:'red'}}>{passwordError[key]}</div>
      })}
    </Form.Group>
    
    <Button className="m-2" variant="primary" type="submit">
    Submit
    </Button>
    <Link to={'/register'}>
  <Button className="login-view-button" type="link">
    Register
  </Button>
</Link>
  </Form>
  </>
);
}

LoginView.propTypes = {
  onRegisterClick: PropTypes.func,
  onLoggedIn: PropTypes.func,
};
