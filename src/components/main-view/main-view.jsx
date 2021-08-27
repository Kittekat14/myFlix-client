// Main-View ~ Homepage
import React from 'react';
import axios from 'axios';

import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";

export class MainView extends React.Component {   // here you export the MainView Component as an instance of the React.Component(=blueprint for a component)
  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null
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
  setSelectedMovie(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  // custom component method "onLoggedIn" => updates the user when he/she has logged in
  onLoggedIn(user) {
    this.setState({
      user
    });
  }

// visual representation of component:
render() {
  const { movies, selectedMovie } = this.state;

  /* If there is no user, the LoginView is rendered. If a user is logged in, his details are passed as a prop to the LoginView*/
  if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

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