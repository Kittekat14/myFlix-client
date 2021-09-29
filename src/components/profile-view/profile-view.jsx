import React, { Component } from 'react';
import axios from 'axios';
import UpdateView from '../update-view/update-view';
import moment from 'moment';
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
      // addFavorite: '',
      // removeFavorite: ''
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
          birthdate: moment(response.data.birthdate).format("YYYY-MM-DD"),
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


  removeFromFavorites(_id) {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

      
    axios.delete(`https://actor-inspector.herokuapp.com/users/${username}/favorites/${_id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((response) => {
        this.setState({
          favorites: response.data.favorites
        });
      })
      .catch(function (error) {
        console.log(error);
      })
  }


  render() {
    const { username, password, email, birthdate, favorites } = this.state;
    const { movies, user } = this.props;
    console.log(this.state);
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
      <Card className="profile-card" >
          <h2>Your Favorite Movies</h2>
          <Card.Body>
            {favorites.length === 0 && <div className="text-center">Empty.</div>}
            <Row className="favorites-movies ">
              {favorites.length > 0 &&
                movies.map((movie) => {
                  if (movie._id === favorites.find((fav) => fav === movie._id)) {
                    return (
                      <Col md={3}>
                        <Card className="favorites-item card-content" style={{ width: '16rem' }} key={movie._id}>
                          <Card.Img style={{ width: '100%' }} className="movieCard" variant="top" src={movie.imageUrl} crossOrigin="true" />
                          <Card.Body>
                            <Card.Title className="movie-card-title">{movie.title}</Card.Title>
                            <Button size='sm' className='profile-button remove-favorite' variant='danger' value={movies.title} onClick={() => this.removeFromFavorites(movie._id)}>
                              Remove
                            </Button>
                          </Card.Body>
                        </Card>
                      </Col>
                    )}
                })
              }
              
            </Row>
          </Card.Body>
        </Card>
      </Row >
      <br />
          {/* <Form>
            <Form.Group className="mb-3" >
            <Form.Label>Add new Favorite Movie to your List:</Form.Label>
            <Form.Control type="text" placeholder="Enter Movie Title" onChange={(e) => this.setState(
              {addFavorite: e.target.value}
              )}/>
            </Form.Group>
            <Button value={movies.title} onClick={() => { this.addToFavorites(this.state.addFavorite, movies)  } }>Add</Button> 
          </Form>
          <Form>
            <Form.Group className="mb-3" >
            <Form.Label>Delete a Favorite Movie from your List:</Form.Label>
            <Form.Control type="text" placeholder="Enter Movie Title" onChange={(e) => this.setState(
              {removeFavorite: e.target.value}
              )}/>
            </Form.Group>
            <Button onClick={() => { this.removeFavoriteMovie(this.state.removeFavorite, movies) }  }>Remove</Button>
          </Form> */}
        
        <br />
        <br />
      <UpdateView />
        <br />
        <br />
        <br />
          <Button onClick={() => { this.deleteUser() } }>Delete Account</Button>  
        <br />
     
  
     </>
    )
  }
}

// getting ERRORS when I define these at user prop
// ProfileView.propTypes = {
//   user: PropTypes.string.isRequired,
//   movies: PropTypes.array.isRequired,
//   favorites: PropTypes.array.isRequired
// };