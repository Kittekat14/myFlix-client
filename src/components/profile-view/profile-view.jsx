import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import UpdateView from '../update-view/update-view';
import moment from 'moment';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export class ProfileView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      myUsername: '',
      myPassword: '',
      myEmail: '',
      myBirthdate: '',
      myFavorites: []
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
          myUsername: response.data.username,
          myPassword: response.data.password,
          myEmail: response.data.email,
          myBirthdate: moment(response.data.birthdate).format("YYYY-MM-DD"),
          myFavorites: response.data.favorites
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
          myFavorites: response.data.favorites
        });
      })
      .catch(function (error) {
        console.log(error);
      })
  }


  render() {
    
    const { myUsername, myPassword, myEmail, myBirthdate, myFavorites } = this.state;
    const { movies, user } = this.props;
    console.log(myUsername);
    console.log(myFavorites);
    console.log(this.state);
    console.log(myEmail);
    //const fav = this.props.favorites;
    
    return (
     <> 
     <Row>
        <Col className="label">Username: </Col>
        <Col className="value">{myUsername}</Col>
     </Row>
     <Row>
        <Col className="label">Password: </Col>
        <Col className="value">{myPassword}</Col>
     </Row>
     <Row>
        <Col className="label">Email: </Col>
        <Col className="value">{myEmail}</Col>
     </Row>
     <Row>
        <Col className="label">Birthdate: </Col>
        <Col className="value">{myBirthdate}</Col>
     </Row>
     

      <Row className="profile-view">
      <Card className="profile-card">
          <h2>Your Favorite Movies</h2>
          <Card.Body>
            {myFavorites.length === 0 && <div className="text-center">Empty.</div>}
            <Row className="favorites-movies ">
              {myFavorites.length > 0 &&
                movies.map((movie) => {
                  if (movie._id === myFavorites.find((fav) => fav === movie._id)) {
                    return (
                      <Col lg={4} key={movie._id}>
                        <Card className="favorites-item card-content" style={{ width: '16rem' }}>
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

// getting ERRORS when I define these as prop
ProfileView.propTypes = {
  movies: PropTypes.array,
  favorites: PropTypes.array,
  onBackClick: PropTypes.func
};