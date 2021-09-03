import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
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
  <Form>
    <Form.Group className="mb-3" controlId="formUsername">
      <Form.Label>Username:</Form.Label>
      <Form.Control type="text" placeholder="Enter Username" onChange={e => setUsername(e.target.value)} />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formPassword">
      <Form.Label>Password:</Form.Label>
      <Form.Control type="password" placeholder="Enter Password" onChange={e => setPassword(e.target.value)} />
    </Form.Group>
    
    <Button variant="primary" type="submit" onClick={handleSubmit}>
    Submit
    </Button>
    <Button variant="primary" type="submit" onClick={handleRegistration}>
    Submit
    </Button>
  </Form>
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
