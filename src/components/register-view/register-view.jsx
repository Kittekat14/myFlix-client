import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Container, Form, Button } from 'react-bootstrap';
import './register-view.scss';

export function RegisterView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [favorites, setFavorites] = useState("");
  
  const handleRegister = (e) => {
    e.preventDefault();
    axios.post('https://actor-inspector.herokuapp.com/users', {
      username: username,
      password: password,
      email: email,
      birthdate: birthdate,
      favorites: favorites
    })
    .then(response => {
      const data = response.data;
      console.log(data);
      window.open('/', '_self');
    })
    .catch(e => {
      console.log('error registering new user')
    });
    
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
          <Form.Control type="email" placeholder="name@example.com" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}/>
        </Form.Label>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBirthdate">
        <Form.Label label="Birthdate" className="mb-3"
        > Birthdate:
          <Form.Control type="date" 
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}/>
        </Form.Label>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formFavorites">
        <Form.Label label="Favorites" className="mb-3"
        > Favorite Movies:
          <Form.Control type="array" 
          value={favorites}
          onChange={(e) => setFavorites(e.target.value)}/>
        </Form.Label>
      </Form.Group>

      
      <Button type="submit" variant="primary" onClick={handleRegister}>Register</Button>
      <Button className="m-2" type="button" variant="secondary" onClick={() => { onBackClick(null); }}>Go To Login</Button>
      
    </Form>
</Container>
)
}

RegisterView.propTypes = {
  onBackClick: PropTypes.func

};


