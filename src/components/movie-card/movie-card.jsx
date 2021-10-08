import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './movie-card.scss';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';



class MovieCard extends React.Component {

  render() {

    const { movie } = this.props;
    
    return (
    
      <Card className="card h-100" key={movie.title}>
       
        <Card.Img variant="top" src={movie.imageUrl} crossOrigin="true" width="300"/>

        <Card.Body>

          <Card.Title className="card-title" >{movie.title}</Card.Title>
          <Card.Text className="card-info">{movie.description}</Card.Text>
          
          <Link to={`/movies/${movie.title}`}>
            <Button className="open-button">Open</Button>
          </Link>

        </Card.Body>

      </Card>
    )
  
  }
}

export default MovieCard;

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
  })
}
