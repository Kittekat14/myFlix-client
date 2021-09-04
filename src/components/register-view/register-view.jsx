import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Form, Button, FloatingLabel } from 'react-bootstrap';

export function RegisterView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthdate, setBirthdate] = useState("");
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthdate);
    props.onRegistration(username);
  };

  
  const handleLogin = (e) => {
    props.onLoginClick(false);
  };


  return (
  <Container>
    <Form>
      <Form.Group className="mb-3" controlId="formUsername">
      <Form.Label>Username*:</Form.Label>
      <Form.Control type="text" placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
      />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPassword">
      <Form.Label>Password*:</Form.Label>
      <Form.Control type="password" placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label label="Email" className="mb-3"
        > Email*: 
          <Form.Control type="email" placeholder="name@example.com" value={email}
          onChange={(e) => setEmail(e.target.value)}/>
        </Form.Label>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBirthdate">
        <Form.Label label="Birthdate" className="mb-3"
        > Birthdate:
          <Form.Control type="date" value={birthdate}
          onChange={(e) => setPassword(e.target.value)}/>
        </Form.Label>
      </Form.Group>

      
      <Button type="submit" variant="primary" onClick={handleSubmit}>Register</Button>
      <Button type="button" variant="secondary" onClick={handleLogin}>Go To Login</Button>
      
    </Form>
</Container>
)
}

RegisterView.propTypes = {
  register: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    birthdate: PropTypes.string
  }),
  onRegistration: PropTypes.func,
  toLogin: PropTypes.func,
  handleSubmit: PropTypes.func,
  handleLogin: PropTypes.func    
};


