import React from 'react';
import PropTypes from 'prop-types';

export class MovieView extends React.Component {

  render() {
    const { movie, onBackClick } = this.props;

    return (
    <div className="movie-view">

      <div className="movie-poster">
        <img src={movie.imageUrl} crossOrigin={true} />
      </div>
      <div className="movie-title">
        <span className="label">Title: </span>
        <span className="value">{movie.title}</span>  
      </div>
      <div className="movie-description">
        <span className="label">Description: </span>
        <span className="value">{movie.description}</span>  
      </div>  
      <div className="movie-year">
        <span className="label">Year: </span>
        <span className="value">{movie.year}</span>  
      </div>  
      <div className="movie-genre">
        <span className="label">Genre: </span>
        <span className="value">{movie.genre}</span>  
      </div>  
      <div className="movie-actors">
        <span className="label">Actors: </span>
        <span className="value">{movie.actors}</span>  
      </div>  
      <div className="movie-director">
        <span className="label">Director: </span>
        <span className="value">{movie.director}</span>  
      </div>  
      <div className="movie-_id">
        <span className="label">ID: </span>
        <span className="value">{movie._id}</span>
      </div>
      <button onClick={() => { onBackClick(null); }}>Back</button>

    </div>
    );
    
  }

}

MovieView.propTypes = {
  movie: PropTypes.shape({ 
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    year: PropTypes.number,
    featured: PropTypes.bool,
    actors: PropTypes.array,
    genre: PropTypes.string,
    director: PropTypes.string
  }),
  onBackClick: PropTypes.func.isRequired
}