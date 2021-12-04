import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import UpdateView from '../update-view/update-view';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export class ProfileView extends Component {
  constructor(props) {
    super(props);
  }


  
  removeFavorite(_id) {
    this.props.removeMovie(_id);
  }

  render() {
    
    const { username, password, email, birthdate, favorites, movies } = this.props;

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
          <h2>Your Favorite Movies</h2>
          <Card.Body>
            {favorites.length === 0 && <div className="text-center">Empty.</div>}
            <Row className="favorites-movies ">
              {favorites.length > 0 &&
                movies.map((movie) => {
                  if (movie._id === favorites.find((fav) => fav === movie._id)) {
                    return (
                      <Col lg={4} key={movie._id}>
                        <Card className="favorites-item card-content" style={{ width: '16rem' }}>
                          <Card.Img style={{ width: '100%' }} className="movieCard" variant="top" src={movie.imageUrl} crossOrigin="true" />
                          <Card.Body>
                            <Card.Title className="movie-card-title">{movie.title}</Card.Title>
                            <Button size='sm' className='profile-button remove-favorite' variant='danger' value={movies.title} onClick={() => this.removeFavorite(movie._id)}>
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
  username: PropTypes.string,
  password: PropTypes.string,
  email: PropTypes.string,
  birthdate: PropTypes.string,
  favorites: PropTypes.array,
  onBackClick: PropTypes.func,
  removeMovie: PropTypes.func
};