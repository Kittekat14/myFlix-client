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
      favorites: []
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.getUser(accessToken);
      this.deleteUser(accessToken);
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
  
  handleUserUpdate(token) {
    
    const username = localStorage.getItem('user');

    axios.put(`https://actor-inspector.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` },
      data: {
        username: newUsername ? newUsername : this.state.username,
        password: newPassword ? newPassword : this.state.password,
        email: newEmail ? newEmail : this.state.email,
        birthdate: newBirthdate ? newBirthdate : this.state.birthdate,
        favorites: newFavorites ? newFavorites : this.state.favorites
      },
    })
    .then((response) => {
      this.setState({
        username: e.target.value,
        password: e.target.value,
        email: e.target.value,
        birthdate: e.target.value,
        favorites: [e.target.value]
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  addToFavorites() {
    
    const username = localStorage.getItem('user');
    
    axios.post(`https://actor-inspector.herokuapp.com/users/${username}/favorites/${movie._id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(() => {
        alert('Movie was added');
        this.componentDidMount();
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  removeFavouriteMovie() {
    
    const username = localStorage.getItem('user');

    if(window.confirm('Are you sure you want to delete this movie from your list?')) {
    axios.delete(`https://actor-inspector.herokuapp.com/users/${username}/favorites/${movie._id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(() => {
        alert('Movie was removed');
        this.componentDidMount();
      })
      .catch(function (error) {
        console.log(error);
      })
    }
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
     <Row>
        <Col className="label">Favorite Movies: </Col>
        <Col className="value">{[favorites]}</Col>
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
                            <Button size='sm' className='profile-button remove-favorite' variant='danger' value={movie._id} onClick={(e) => this.removeFavouriteMovie(e, movie)}>
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
            <Form.Label>Add new favorite Movie to your List:</Form.Label>
            <Form.Control type="text" placeholder="Enter Movie Title" />
            </Form.Group>
            <Button onClick={() => { this.addToFavorites()  } }>Add</Button> 
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
            onChange={this.handleUserUpdate}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label>Password*:</Form.Label>
        <Form.Control required type="password" placeholder="Enter New Password"
            onChange={this.handleUserUpdate}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label label="Email" className="mb-3"
          > Email*: 
            <Form.Control required type="email" placeholder="Enter New Email"
            onChange={this.handleUserUpdate}/>
          </Form.Label>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBirthdate">
        <Form.Label label="Birthdate" className="mb-3"
        > Birthdate:
          <Form.Control type="date" placeholder="Enter New Birthdate"
          onChange={this.handleUserUpdate}/>
        </Form.Label>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formFavorites">
        <Form.Label label="Favorites" className="mb-3"
        > Favorite Movies:
          <Form.Control type="text" placeholder="Enter New Favorite Movies"
          onChange={this.handleUserUpdate}/>
        </Form.Label>
      </Form.Group>

      <Button onClick={ () => {this.handleUserUpdate()} }>Update your Account</Button>

    </Form>
  
     </>
    )
  }
}
