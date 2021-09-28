import React from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import './movie-view.scss';
import { Link } from "react-router-dom";
import axios from 'axios';


export class MovieView extends React.Component {
  constructor(props) {
    super(props);

  }
  
  // addToFavoriteMovies(movie) {
  //   const username = localStorage.getItem('user');
  //   const token = localStorage.getItem('token');

  //   if(!(this.state.favorites.includes((fav) => fav.title === title)._id)) { 

  //   axios.post(`https://actor-inspector.herokuapp.com/users/${username}/favorites/${movie}`, { favorites: this.favorites }, {
  //     headers: { Authorization: `Bearer ${token}` }
  //   })
  //   .then((response) => {
  //     this.setState({
  //       favorites: response.data.favorites
  //     });
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   })
  //  }
  // }


  // removeFavoriteMovie(movie) {
  //   const username = localStorage.getItem('user');
  //   const token = localStorage.getItem('token');

  // //   const movieId = movies.find((movie) => movie.title === title)._id;
    
  //   axios.delete(`https://actor-inspector.herokuapp.com/users/${username}/favorites/${movie}`, {}, {
  //       headers: { Authorization: `Bearer ${token}` }
  //     })
  //     .then((response) => {
  //       this.setState({
  //         favorites: response.data.favorites
  //       });
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     })

  //     console.log(response.data.favorites);
  // }


  // removeFavorite(movieId) {
  //   const username = localStorage.getItem('user');
  //   const token = localStorage.getItem("token");
  //   const movieId = movies.find((movie) => movie.title === title)._id;
    
  //   axios
  //     .delete(
  //       `https://actor-inspector.herokuapp.com/users/${username}/favorites/${movieId}`, { 
  //         headers: { Authorization: `Bearer ${token}` }
  //       })
  //         .then(response => {
  //           alert(`Removed from Favorites List`)
  //           this.componentDidMount();
  //         })
  //         .catch(function (error) {
  //           console.log(error);
  //         })
          
  //     };


  //     addFavorite(movieId) {
  //       const username = localStorage.getItem('user');
  //       const token = localStorage.getItem('token');
  //       const movieId = movies.find((movie) => movie.title === title)._id;
   
  //       axios
  //        .post(
  //          `https://actor-inspector.herokuapp.com/users/${username}/favorites/${movieId}`, {}, {
  //         headers: { Authorization: `Bearer ${token}` }
  //        })
  //          .then(response => {
  //            alert(`Added to Favorites List`)
  //          })
  //          .catch(function (error) {
  //            console.log(error);
  //          });
  //      };

  // removeFavorite( movie ) {
  //   this.props.removeMovie(movie);
  // }

  addFavorite(_id) {
    this.props.addMovie(_id)
  }

  render() {
   
    const { movie, onBackClick, addMovie, removeMovie } = this.props;
    
    return (
    
     <Row className="movie-view">
       <Col md={8} className="movie-view">
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
          <Link to={`/genres/${movie.genre.name}`} className="genre-link">
            <span className="value" >{movie.genre.name.charAt(0).toUpperCase() + movie.genre.name.slice(1)}</span> 
          </Link> 
          </div>  
          <div className="movie-actors">
            <span className="label">Actors: </span>
            <span className="value">{movie.actors.join(', ')}</span>  
          </div>  
          <div className="movie-director">
            <span className="label">Director: </span>
          <Link to={`/directors/${movie.director.name}`} className="director-link">
            <span className="value" >{movie.director.name}</span>
          </Link> 
          </div>  
          <div className="movie-feature">
            <span className="label">Featured: </span>
            <span className="value" >{movie.featured ? 'yes' : 'no'}</span>  
          </div>
          
          <button className="back-button" onClick={() => { onBackClick(null); }}>Back</button>
            
          {/* {favorites.includes(movie._id) ?
          <Button className="favorite-button" onClick={() => { removeFavoriteMovie(movie._id) } }>Remove from favorite Movies</Button> :
          <Button className='favorite-button' onClick={() => { addToFavoriteMovies(movie._id) } }> Add to favorite Movies </Button>} */}
          

          <button className='favorite-button' value={movie._id} onClick={() => this.addFavorite(movie._id)}> Add to favorite Movies </button>


      </Col>
     </Row>
    
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
  onBackClick: PropTypes.func.isRequired,
  addMovie: PropTypes.func.isRequired,
  //removeMovie: PropTypes.func.isRequired,
  // favorites: PropTypes.array.isRequired
}