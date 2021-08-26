// Main-View ~ Homepage
import React from 'react';
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import axios from 'axios';

export class MainView extends React.Component {   // here you export the MainView Component as an instance of the React.Component(=blueprint for a component)
  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null
    };
  }

  componentDidMount() {
    axios.get('https://actor-inspector.herokuapp.com/movies')
    .then(response => {
      this.setState({
        movies: response.data
      });
    })
    .catch(error => {
      console.log(error);
    });
  }


// Custom component method "setSelectedMovie":
  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

// visual representation of component:
render() {
  const { movies, selectedMovie } = this.state;

  if (movies.length === 0) return <div className="main-view" />;

  return (
    <div className="main-view">
      {selectedMovie
        ? <MovieView movie={selectedMovie} onBackClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie); }}/>
        : movies.map(movie => (
          <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie); }}/>
        ))
      }
    </div>
  );
 }

}