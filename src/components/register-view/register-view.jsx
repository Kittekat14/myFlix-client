import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Container, Form, Button } from 'react-bootstrap';
import './register-view.scss';
import { useHistory } from "react-router-dom";

export function RegisterView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthdate, setBirthdate] = useState("");
  
  const [nameError, setNameError] = useState({});
  const [passwordError, setPasswordError] = useState({});
  const [emailError, setEmailError] = useState({});

  const history = useHistory();

  const loginButton = () => {
    history.push("/");
  }

  const handleRegister = (e) => {
    e.preventDefault();
    const isValid = formValidation();
    if(isValid) {
    axios.post('https://actor-inspector.herokuapp.com/users', { 
      username: username,
      password: password,
      email: email,
      birthdate: birthdate
    })
    .then(response => {
      const data = response.data;
      console.log(data);
      window.open('/', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab
    })
    .catch(e => {
      console.log('error registering the user')
    });
  }}


  const formValidation = (e) => {
    const nameError = {};
    const passwordError = {};
    const emailError = {};
    let isValid = true;
    if(username.trim().length < 5) {
      nameError.nameShort = 'Username must at least have 5 characters and must only contain numbers and letters.';
      isValid = false;
    }
    if(password.trim().length === 0) {
      passwordError.passwordEmpty = 'Password cannot be empty.';
      isValid = false;
    }
    if(!(email && email.trim().includes('@') && email.trim().includes('.'))) {
      emailError.emailNot = 'This seems to be no valid email address.';
      isValid = false;
    } 
    
    setNameError(nameError);
    setPasswordError(passwordError);
    setEmailError(emailError);
    return isValid;
  }

 

  return (
  <Container>
    <h1>Create Account</h1>
    <Form method="post">
      <Form.Group className="mb-3" controlId="formUsername">
      <Form.Label>Username*:</Form.Label>
      <Form.Control required minLength="5" pattern="" type="text" placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onInput={formValidation}
      />
      {Object.keys(nameError).map((key) => {
        return <div style={{ fontSize: 12, color:'red'}} key={key}>{nameError[key]}</div>
      })}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPassword">
      <Form.Label>Password*:</Form.Label>
      <Form.Control required minLength="1" pattern="" type="password" placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onInput={formValidation}
        />
      {Object.keys(passwordError).map((key) => {
        return <div style={{ fontSize: 12, color:'red'}} key={key}>{passwordError[key]}</div>
      })}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label> Email*: 
          <Form.Control required type="email" placeholder="name@example.com" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onInput={formValidation}
          />
        </Form.Label>
      {Object.keys(emailError).map((key) => {
        return <div style={{ fontSize: 12, color:'red'}} key={key}>{emailError[key]}</div>
      })}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBirthdate">
        <Form.Label label="Birthdate" className="mb-3"
        > Birthdate:
          <Form.Control type="date" 
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
          onInput={formValidation}
          />
        </Form.Label>
      </Form.Group>

      
      
      <Button type="submit" variant="primary" onClick={handleRegister}>Register</Button>
     
      <Button className="m-2 login-view-button" type="button" variant="secondary" onClick={loginButton}>Go To Login</Button>
     
      
    </Form>
</Container>
)
}
