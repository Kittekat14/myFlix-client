import React, { Component } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export class ProfileView extends Component {
  constructor() {
    super();

    this.state = {
      username: null,
      password: null,
      email: null,
      birthdate: null,
      favorites: []
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.getUser(accessToken);
    }
  }

  // custom GET User method
  getUser(token) {
    const username = localStorage.getItem('user');
    axios.get(`https://actor-inspector.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        this.setState({
          username: response.data.username,
          password: response.data.password,
          email: response.data.email,
          birthdate: response.data.birthdate,
          favorites: response.data.favorites,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  deleteUser(token) {
    const username = localStorage.getItem('user');
    if(window.confirm('Are you sure you want to delete your user account?')) {
      axios.delete(`https://actor-inspector.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          this.setState({
            username: null,
            password: null,
            email: null,
            birthdate: null,
            favorites: []
          });
        })
        .catch(function (error) {
          console.log(error);
        });
      }
    }
  
handleUserUpdate

  render() {
    const {username, password, email, birthdate, favorites} = this.state;
    
    return (
      <>
          <div>
            <span className="label">Username: </span>
            <span className="value">{username}</span>
          </div>
          <div className="movie-description">
            <span className="label">Password: </span>
            <span className="value">{password}</span>
          </div>  
          <div>
            <span className="label">Email: </span>
            <span className="value">{email}</span>  
          </div>
          <div>
            <span className="label">Birthdate: </span>
            <span className="value">{birthdate}</span>  
          </div>
          <div>
            <span className="label">Favorite Movies: </span>
            <span className="value">{favorites}</span>  
          </div>
      <br />
      <Button onClick={() => { this.deleteUser() } }>Delete Account</Button>
      <br />
      <br />
      <div>Update your Account:</div>
      <br />
      <Form onSubmit={() => {this.handleUserUpdate}}>
      
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

      </Form>
      </>
    )
  }
}

export default ProfileView
