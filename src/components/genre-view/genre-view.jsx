import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Button, Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export class GenreView extends React.Component {

  
  render() {
    const { genre, onBackClick, movies } = this.props;
    const genreMovies = movies.filter(m => m.genre.name === genre.name);

    return (
      <Container>
        
        <Row className="genre-name">
          <Col className="label">Name: </Col>
          <Col className="value">{genre.name.toUpperCase()}</Col>    
        </Row>
        <Row className="genre-description">
          <Col className="label">Description: </Col>
          <Col className="value">{genre.description}</Col>     
        </Row>
        <Row className="genre-movies">
          <Col className="label">All {genre.name.charAt(0).toUpperCase() + genre.name.slice(1)} Movies:</Col>
          <Col className="value">
            {genreMovies.map( (m) => (
                
                  <div className="relMovies">
                     <Link to={`/movies/${m.title}`} key={m._id}>
                      {m.title}
                     </Link>
                  </div>
                
                ))}
          </Col>
        </Row>

        
        <Button className="back-button" onClick={() => { onBackClick(null); }}>Back</Button>
        
      </Container>
    );
  }
}


GenreView.propTypes = {
  genre: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string
  }).isRequired,
  onBackClick: PropTypes.func
};
