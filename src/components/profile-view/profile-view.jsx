import React, { Component } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export class ProfileView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      email: '',
      birthdate: '',
      favorites: [],
      addFavorite: '',
      removeFavorite: '',
      newUsername: '',
      newPassword: '',
      newEmail: '',
      newBirthdate: ''
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.getUser(accessToken);
    }
  }

  // GET User for his own profile
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
          favorites: response.data.favorites
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
        .then(() => {
          localStorage.removeItem('user');
          localStorage.removeItem('token');
          alert('Your account has been deleted.');
          window.open(`/`, '_self');
        })
        .catch((e) => {
          console.log(e);
        });
      }
    }
  
  
  addToFavorites(title, movies) {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    const movieId = movies.find((movie) => movie.title === title)._id; 

    axios.post(`https://actor-inspector.herokuapp.com/users/${username}/favorites/${movieId}`, null, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((response) => {
        this.setState({
          favorites: response.data.favorites
        })
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  removeFavoriteMovie(title, movies) {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    const movieId = movies.find((movie) => movie.title === title)._id;
    
    axios.delete(`https://actor-inspector.herokuapp.com/users/${username}/favorites/${movieId}`, null, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((response) => {
        this.setState({
          favorites: response.data.favorites
        });
        this.componentDidMount();
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  handleUserUpdate() { 
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    const data = {
      username: this.state.newUsername,
      password: this.state.newPassword,
      email: this.state.newEmail,
      birthdate: this.state.newBirthdate
    };
    axios.put(`https://actor-inspector.herokuapp.com/users/${username}`, data, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((response) => {
      this.setState({
      username: response.data.username,
      password: response.data.password,
      email: response.data.email,
      birthdate: response.data.birthdate
      });
      console.log(this.state);
      localStorage.setItem('user', this.state.username);
      window.open(`/profile/${username}`, '_self');
    })
    .catch(function (error) {
      console.log(error);
    });
  }


  render() {
    const {username, password, email, birthdate, favorites} = this.state;
    const { movies } = this.props;

    return (
     <> 
     <Row>
        <Col className="label">Username: </Col>
        <Col className="value">{username}</Col>
     </Row>
     <Row>
        <Col className="label">Password: </Col>
        <Col className="value">{password}</Col>
     </Row>
     <Row>
        <Col className="label">Email: </Col>
        <Col className="value">{email}</Col>
     </Row>
     <Row>
        <Col className="label">Birthdate: </Col>
        <Col className="value">{birthdate}</Col>
     </Row>
     

      <Row className="profile-view">
        <Card className="profile-card">
          <h2>Your Favorites Movies</h2>
          <Card.Body>
            {favorites.length === 0 && <div className="text-center">Empty.</div>}
            <div className="favorites-movies ">
              {favorites.length > 0 &&
                movies.map((movie) => {
                  if (movie._id === favorites.find((fav) => fav === movie._id)) {
                    return (
                        <Card className="favorites-item card-content" style={{ width: '16rem' }} key={movie._id}>
                          <Card.Img style={{ width: '200px' }} className="movieCard" variant="top" src={movie.imageUrl} crossOrigin="true" />
                          <Card.Body>
                            <Card.Title className="movie-card-title">{movie.title}</Card.Title>
                            <Button size='sm' className='profile-button remove-favorite' variant='danger' onClick={() => this.removeFavoriteMovie(movie.title, movies)}>
                              Remove
                            </Button>
                          </Card.Body>
                        </Card>
                    )}
                })
              }
            </div>
          </Card.Body>
        </Card>
      </Row >

        <div>
          <Form>
            <Form.Group className="mb-3" >
            <Form.Label>Add new Favorite Movie to your List:</Form.Label>
            <Form.Control type="text" placeholder="Enter Movie Title" onChange={(e) => this.setState(
              {addFavorite: e.target.value}
              )}/>
            </Form.Group>
            <Button onClick={() => { this.addToFavorites(this.state.addFavorite, movies)  } }>Add</Button> 
          </Form>
          <Form>
            <Form.Group className="mb-3" >
            <Form.Label>Delete a Favorite Movie from your List:</Form.Label>
            <Form.Control type="text" placeholder="Enter Movie Title" onChange={(e) => this.setState(
              {removeFavorite: e.target.value}
              )}/>
            </Form.Group>
            <Button onClick={() => { this.removeFavoriteMovie(this.state.removeFavorite, movies) }  }>Remove</Button>
          </Form>
        </div>
        <br />
          <Button onClick={() => { this.deleteUser() } }>Delete Account</Button>  
        <br />
     
      <br />
      <br />
      <Form>
        <h3>Update Your User Data</h3>
      <Form.Group className="mb-3" controlId="formUsername">
        <Form.Label>Username*:</Form.Label>
        <Form.Control required type="text" placeholder="Enter New Username"
            onChange={(e) => this.setState(
              {newUsername: e.target.value}
              )}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label>Password*:</Form.Label>
        <Form.Control required type="password" placeholder="Enter New Password"
            onChange={(e) => this.setState(
              {newPassword: e.target.value}
              )}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label label="Email" className="mb-3"
          > Email*: 
            <Form.Control required type="email" placeholder="Enter New Email"
            onChange={(e) => this.setState(
              {newEmail: e.target.value}
              )}/>
          </Form.Label>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBirthdate">
        <Form.Label label="Birthdate" className="mb-3"
        > Birthdate:
          <Form.Control type="date" placeholder="Enter New Birthdate"
          onChange={(e) => this.setState(
            {newBirthdate: e.target.value}
            )}/>
        </Form.Label>
      </Form.Group>


      <Button type="button" onClick={ () => { this.handleUserUpdate() } }>Update your Account</Button>

    </Form>
     
  
     </>
    )
  }
}
