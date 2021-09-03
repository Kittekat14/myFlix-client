import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export class MovieCard extends React.Component {

  render() {
    const { movie, onMovieClick } = this.props;
    
    return (
      <Card>

        <Card.Img variant="top" src={movie.imageUrl} crossOrigin="true" width="300"/>
        <Card.Body>

          <Card.Title>{movie.title}</Card.Title>
          <Card.Text>{movie.description}</Card.Text>

          <Button onClick={() => onMovieClick(movie)} variant="link">Open</Button>

        </Card.Body>

      </Card>
    )
    
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({ 
    _id: PropTypes.string,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    year: PropTypes.number,
    featured: PropTypes.bool,
    actors: PropTypes.array,
    genre: PropTypes.shape({
      name: PropTypes.string,
      description: PropTypes.string
    }),
    director: PropTypes.shape({
      name: PropTypes.string,
      bio: PropTypes.string,
      birthyear: PropTypes.string,
      movies: PropTypes.array
    })
  }),  
  onMovieClick: PropTypes.func
};