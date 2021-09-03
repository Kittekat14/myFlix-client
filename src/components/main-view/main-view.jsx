// Main-View ~ Homepage
import React from 'react';
import axios from 'axios';

import { LoginView } from "../login-view/login-view";
import { toRegister } from "../login-view/login-view";
import { RegisterView } from "../register-view/register-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";


export class MainView extends React.Component {  
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      selectedMovie: null,
      user: '',
      register: '',
      login: false,
      signup: false
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

  toRegister = () => {
    this.setState({signup: !this.state.signup})
  }

  toLogin = () => {
    this.setState({login: !this.state.login}) //sets it to opposite of previous value
  }

  // visual representation of component:
  render() {

    const { movies, selectedMovie, user, register, signup, login } = this.state;
    
    /* If there is no user, the LoginView is rendered. If a user is logged in, his details are passed as a prop to the LoginView*/

    if ( !user ) { return <LoginView onLoggedIn={ (user) => this.onLoggedIn(user) } /> }

    if ( !register ) return <RegisterView onRegistration={ (register) => this.onRegistration(register) } registerHandler={toRegister}/>

    if (movies.length === 0) return <div className="main-view" />;

    return (
      <div className="main-view">
        {selectedMovie
          ? <MovieView movie={selectedMovie} onBackClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie); }}/>
          : movies.map(movie => (
            <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie); }}/>
          ))
        };
        
        {this.state.login  //if login is true (that is initially set to 'false')
          ? <LoginView
             toLogin={this.toLogin.bind(this)}
          />
          : //else
          <RegisterView
             toRegister={this.toRegister.bind(this)}
          />
        };

      </div>
    );

  }
}