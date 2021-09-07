import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import './movie-card.scss';

export class MovieCard extends React.Component {

  render() {

    const { movie, onMovieClick } = this.props;
    
    return (
    
    <CardGroup className="h-100">
      <Card className="card">
       
        <Card.Img variant="top" src={movie.imageUrl} crossOrigin="true" width="300"/>
        <Card.Body>

          <Card.Title className="card-title" >{movie.title}</Card.Title>
          <Card.Text className="card-info">{movie.description}</Card.Text>

          <Button className="open-button" onClick={() => onMovieClick(movie)} >Open</Button>

        </Card.Body>

      </Card>
    </CardGroup>
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