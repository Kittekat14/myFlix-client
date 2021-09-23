import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export function UpdateView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthdate, setBirthdate] = useState('');

  const [nameError, setNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  
  // (e, this.username, this.password, this.email, this.birthdate)
  
  const handleUserUpdate = (e) => {
    e.preventDefault();
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    const isValid = formValidation();
    if(isValid) {
    const data = {
      username: username,
      password: password,
      email: email,
      birthdate: birthdate
    };
    axios.put(`https://actor-inspector.herokuapp.com/users/${username}`, data, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((response) => {
      const data = response.data;
      console.log(data);
      window.open(`/profile/${username}`, '_self');
    })
    .catch(function (error) {
      console.log(error);
    });
  }
}

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
      <>

    <Form>
        <h3>Update Your User Data</h3>
      <Form.Group className="mb-3" controlId="formUsername">
        <Form.Label>Username*:</Form.Label>
        <Form.Control required 
        type="text" 
        placeholder="Enter New Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label>Password*:</Form.Label>
        <Form.Control required 
        type="password" 
        placeholder="Enter New Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label label="Email" className="mb-3"
          > Email*: 
            <Form.Control required 
            type="email" 
            placeholder="Enter New Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}/>
          </Form.Label>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBirthdate">
        <Form.Label label="Birthdate" className="mb-3"
        > Birthdate:
          <Form.Control 
          type="date" 
          placeholder="Enter New Birthdate"
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}/>
        </Form.Label>
      </Form.Group>


      <Button type="submit" onClick={handleUserUpdate}>Update your Account</Button>

    </Form>

      </>
    )
}


