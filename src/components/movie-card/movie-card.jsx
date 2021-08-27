import React from 'react';
import PropTypes from 'prop-types';

export class MovieCard extends React.Component {

  render() {
    const { movie, onMovieClick } = this.props;

    return <div className="movie-card" onClick={() => { onMovieClick(movie) }}>{movie.title}</div>;
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.ObjectId.isRequired, 
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    genre: PropTypes.ObjectId.isRequired,
    director: PropTypes.ObjectId.isRequired,
    featured: PropTypes.bool.isRequired,
    actors: PropTypes.array.isRequired
     
  }),  
  onMovieClick: PropTypes.func.isRequired
};