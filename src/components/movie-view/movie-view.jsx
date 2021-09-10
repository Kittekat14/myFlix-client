import React from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Container } from 'react-bootstrap';
import './movie-view.scss';
import { Link } from "react-router-dom";


export class MovieView extends React.Component {

  render() {
   
    const { movie, onBackClick, imageUrl, title, description, year, genre, actors, director, featured } = this.props;
    console.log(movie);
    return (
    <Container className="movie-view">
     <Row>
       <Col md={8}>
          <div className="movie-poster">
            <img src={movie.imageUrl} crossOrigin="true" />
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
          <Link to={`/genres/${movie.genre.name}`}>
            <span className="value" >{movie.genre.name}</span> 
          </Link> 
          </div>  
          <div className="movie-actors">
            <span className="label">Actors: </span>
            <span className="value">{movie.actors.join(', ')}</span>  
          </div>  
          <div className="movie-director">
            <span className="label">Director: </span>
          <Link to={`/directors/${movie.director.name}`}>
            <span className="value" >{movie.director.name}</span>
          </Link> 
          </div>  
          <div className="movie-feature">
            <span className="label">Featured: </span>
            <span className="value" >{movie.featured.value}</span>  
          </div>
          
          <button className="back-button" onClick={() => { onBackClick(null); }}>Back</button>

      </Col>
     </Row>
    </Container>
    );
    
  }

}

MovieView.propTypes = {
  movie: PropTypes.shape({ 
    _id: PropTypes.string,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    featured: PropTypes.bool,
    actors: PropTypes.array,
    genre: PropTypes.object,
    director: PropTypes.shape({
      name: PropTypes.string,
      bio: PropTypes.string,
      birthyear: PropTypes.string,
      movies: PropTypes.array
    })
  }),
  onBackClick: PropTypes.func.isRequired
}