import React from 'react';
import PropTypes from 'prop-types';

export class MovieView extends React.Component {

  keypressCallback(event) {
    console.log(event.key);
  }
  
  componentDidMount() {
    document.addEventListener('keypress', this.keypressCallback);
  }

  componentWillUnmount() {
  document.removeEventListener('keypress', this.keypressCallback);
  }


  render() {
    const { movie, onBackClick } = this.props;

    return (
    <div className="movie-view">

      <div className="movie-poster">
        <img src={movie.imageUrl} />
      </div>
      <div className="movie-title">
        <span className="label">Title: </span>
        <span className="value">{movie.title}</span>  
      </div>
      <div className="movie-description">
        <span className="label">Description: </span>
        <span className="value">{movie.description}</span>  
      </div>  
      <button onClick={() => { onBackClick(null); }}>Back</button>

    </div>
    );
    
  }

}

MovieView.propTypes = {
  movie: PropTypes.shape({ 
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    featured: PropTypes.bool,
    actors: PropTypes.array.isRequired
     
  }),
  onBackClick: PropTypes.func.isRequired
}