// Main-View ~ Homepage
import React from 'react';
import axios from 'axios';

import { LoginView } from "../login-view/login-view";
import { RegisterView } from "../register-view/register-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";


export class MainView extends React.Component {  
  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
      register: null
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

  // custom component method "setSelectedMovie":
  setSelectedMovie(movie) {
    this.setState({selectedMovie: movie});
  }
  /* custom component method "onLoggedIn" => when a user successfully logs in, this function updates the `user` property inside the state to that particular user */
  onLoggedIn(user) {
    this.setState({user});
  }
  // custom component method "onRegistration"
  onRegistration(register) {
    this.setState({register});
  }


  // visual representation of component:
  render() {

    const { movies, selectedMovie, user, register } = this.state;
    
    /* If there is no user, the LoginView is rendered. If a user is logged in, his details are passed as a prop to the LoginView*/

    if ( !user ) return <LoginView onLoggedIn={ user => this.onLoggedIn(user) } />

    if( register ) return <RegisterView onRegistration={ register => this.onRegistration(register) } />

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