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

  const history = useHistory();

  function RegisterButton()  {
      history.push("/register");
    } 
  

  const handleLogin = (e) => {
    e.preventDefault();
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
  }

  
return (
  <>
  <Form onSubmit={handleLogin}>
    <Form.Group className="mb-3" controlId="formUsername">
      <Form.Label>Username:</Form.Label>
      <Form.Control type="text" placeholder="Enter Username" value={username} onChange={e => setUsername(e.target.value)} required/>
    </Form.Group>

    <Form.Group className="mb-3" controlId="formPassword">
      <Form.Label>Password:</Form.Label>
      <Form.Control type="password" placeholder="Enter Password" value={password} onChange={e => setPassword(e.target.value)} required/>
    </Form.Group>
    
    <Button className="m-2" variant="primary" type="submit" onClick={handleLogin}>
    Submit
    </Button>
    
    <Button className="m-2" variant="secondary" type="button" onClick={RegisterButton}>Register</Button>
   
  </Form>
  </>
);
}

LoginView.propTypes = {
  onRegisterClick: PropTypes.func,
  onLoggedIn: PropTypes.func,
};
