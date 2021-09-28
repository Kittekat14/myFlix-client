// Main-View ~ Homepage
import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Redirect, Link } from "react-router-dom";

import { LoginView } from "../login-view/login-view";
import { RegisterView } from "../register-view/register-view";
import { ProfileView } from '../profile-view/profile-view';
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { NavBar } from "../navbar-view/navbar-view";
import { GenreView } from "../genre-view/genre-view";
import { DirectorView } from "../director-view/director-view";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import '../../index.scss';

export default class MainView extends React.Component {  

  constructor() {
    super();
    this.state = {
      user: '',
      movies: [],
      favorites: []
    }
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }
 
  /* GET movie data from DB; getMovies method is called with this.getMovies() in 'onLoggedIn', when right token for username is sent*/
  getMovies(token) {
    axios.get('https://actor-inspector.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      this.setState({
        movies: response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    });
    }
  
  /* custom component method "onLoggedIn" => when a user successfully logs in, this function updates the `user` property inside the state to that particular user */
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.username);
    this.getMovies(authData.token);
  }
  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.setState({
      user: null
    });
  }


      addFavorite(_id) {
        const username = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        //const movieId = favorites.find((fav) => fav.title === title)._id;
        //const movieId = movies.find(m => m.title === match.params.title)._id;
        axios
         .post(
           `https://actor-inspector.herokuapp.com/users/${username}/favorites/${_id}`, null, {
          headers: { Authorization: `Bearer ${token}` }
         })
           .then(response => {
             window.open(`/profile/${username}`, '_self');
           })
           .catch(function (error) {
             console.log(error);
           });
       };



  // visual representation of main component:
  render() {
   
    const { movies, user, favorites } = this.state;

    
    return (
      <Router>
        
          <Route path="/" render={() => {
          if(user){
          return (
          <Row className="navigation-main">
              <NavBar users={user} onLoggedOut={() => { this.onLoggedOut() }} />
          </Row>
          )} 
        }} />
        
        <Row className="main-view justify-content-md-center">
            <Route exact path="/" render={() => {
              if ( !user ) 
              return <Row>
                <Col>
                  <LoginView onLoggedIn={ (user) => this.onLoggedIn(user) } />
                </Col>
              </Row>
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <>
                 {movies.map(m => (
                <Col md={3} key={m._id}>
                  <MovieCard movie={m} />
                </Col>
              ))
             }</>
             )
            }} />
            
            <Route path="/register" render={() => {
            if (user) return <Redirect to="/" />
            return (
            <>
            <Col>
              <RegisterView />
            </Col>
            </>
            )
          }} />

            <Route exact path="/profile/:username" render={() => {
              if ( !user ) 
              return (
                <Col>
                  <LoginView onLoggedIn={ (user) => this.onLoggedIn(user) } />
                </Col>
              );
              if (movies.length === 0) return <div className="main-view" />;
              return (
              <>
              <Col>
              <ProfileView user={user} movies={movies} favorites={favorites}/>
              </Col>
              </>)
            }} />       

            <Route exact path="/movies/:title" render={({ match, history }) => {
              if ( !user ) 
              return (
                <Col>
                  <LoginView onLoggedIn={ (user) => this.onLoggedIn(user) } />
                </Col>
              );
              if (movies.length === 0) return <div className="main-view" />;
              return (
              <>
              <Col md={8}>
                <MovieView user={user} favorites={favorites} addMovie={(_id) => this.addFavorite(_id)} movie={movies.find(m => m.title === match.params.title)} onBackClick={() => history.goBack()} />
              </Col>
              </>)
            }}  />
            
            <Route exact path="/genres/:name" render={({ match, history }) => { 
              if ( !user ) 
              return (
                <Col>
                  <LoginView onLoggedIn={ (user) => this.onLoggedIn(user) } />
                </Col>
              );
              if (movies.length === 0) return <div className="main-view" />;
              return (
              <>
              <Col md={8}>
                <GenreView genre={movies.find(m => m.genre.name === match.params.name).genre} onBackClick={() => history.goBack()} movies={movies}/>
              </Col>
              </>)
            }}  />

            <Route exact path="/directors/:name" render={({ match, history }) => { 
              if ( !user ) 
              return (
                <Col>
                  <LoginView onLoggedIn={ (user) => this.onLoggedIn(user) } />
                </Col>
              );
              if (movies.length === 0) return <div className="main-view" />;
              return (
              <>
              <Col md={8}>
                <DirectorView director={movies.find(m => m.director.name === match.params.name).director} onBackClick={() => history.goBack()}/>
              </Col>
              </>)
            }}  />

          </Row>
      </Router>
      )
  

  }
}