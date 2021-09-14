import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

const UpdateView = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [favorites, setFavorites] = useState('');


handleUserUpdate = (e) => {
  e.preventDefault();
  axios.put(`https://actor-inspector.herokuapp.com/users/${username}`, { 
    username: username,
    password: password,
    email: email,
    birthdate: birthdate,
    favorites: favorites
  })
  .then(response => {
    const data = response.data;
    console.log(data);
    window.open('/', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab
  })
  .catch(e => {
    console.log('error updating the user')
  });
}

  return (
    <>
     <Form>
      <Form.Group className="mb-3" controlId="formUsername">
        <Form.Label>Username*:</Form.Label>
        <Form.Control required type="text" placeholder="Enter New Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label>Password*:</Form.Label>
        <Form.Control required type="password" placeholder="Enter New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label label="Email" className="mb-3"
          > Email*: 
            <Form.Control required type="email" placeholder="Enter New Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}/>
          </Form.Label>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBirthdate">
        <Form.Label label="Birthdate" className="mb-3"
        > Birthdate:
          <Form.Control type="date" placeholder="Enter New Birthdate"
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}/>
        </Form.Label>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formFavorites">
        <Form.Label label="Favorites" className="mb-3"
        > Favorite Movies:
          <Form.Control type="text" placeholder="Enter New Favorite Movies"
          value={favorites}
          onChange={(e) => setFavorites(e.target.value)}/>
        </Form.Label>
      </Form.Group>

      <Button type="submit" onClick={handleUserUpdate}>Update Your Account</Button>

    </Form>
    </>
  )
}

export default UpdateView;
