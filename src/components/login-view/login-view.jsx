import React, { useState } from 'react';
import Header from '../header/Header';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

import './login-view.scss';

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
  <>
  <Header />
  <Form>
    <Form.Group className="mb-3" controlId="formUsername">
      <Form.Label>Username:</Form.Label>
      <Form.Control type="text" placeholder="Enter Username" onChange={e => setUsername(e.target.value)} />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formPassword">
      <Form.Label>Password:</Form.Label>
      <Form.Control type="password" placeholder="Enter Password" onChange={e => setPassword(e.target.value)} />
    </Form.Group>
    
    <Button className="m-2" variant="primary" type="submit" onClick={handleSubmit}>
    Submit
    </Button>
    <Button variant="secondary" type="submit" onClick={handleRegistration}>
    Register
    </Button>
  </Form>
  </>
);
}

LoginView.propTypes = {
  onRegisterClick: PropTypes.func,
  onLoggedIn: PropTypes.func
};
