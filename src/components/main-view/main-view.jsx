// Main-View ~ Homepage
import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";

import { LoginView } from "../login-view/login-view";
import { RegisterView } from "../register-view/register-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import NavigationBar from "../navbar/Navbar";
import { GenreView } from "../genre-view/genre-view";
import { DirectorView } from "../director-view/director-view";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import '../../index.scss';

export class MainView extends React.Component {  

  constructor() {
    super();

    this.state = {
      movies: [],
      user: null,
      register: false,
      directors: '',
      genres: []
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if(accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
      this.getDirectors(accessToken);
      
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
   
  // GET User data from DB
  getUsers(token) {
    axios.post('https://actor-inspector.herokuapp.com/users', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      this.setState({
        users: response.data
      });
     console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  // GET Genre data from DB
  getGenres(token) {
    axios.get('https://actor-inspector.herokuapp.com/genres', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      this.setState({
        genres: response.data
      });
     console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  // GET Director data from DB
  getDirectors(token) {
    axios.get('https://actor-inspector.herokuapp.com/directors', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      this.setState({
        directors: response.data
      });
     console.log(response);
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
    this.getDirectors(authData.token);
  }

  // custom component method "onRegistration"
  onRegistration(register) {
    this.setState({register: !register});
  }

  onLoggedOut(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    }); 
  }

  // visual representation of component:
  render() {
   
    const { movies, user, register, genres, directors } = this.state;
    
    return (
      <Router>
        <Row className="main-view justify-content-md-center">
        <button onClick={() => { this.onLoggedOut() }}>Logout</button>
        <NavigationBar users={this.state.user}/>
        
        <Route exact path="/" render={() => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} onRegisterClick={(register) => {this.onRegistration(register)}}/>
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return movies.map(m => (
              <Col md={3} key={m._id}>
                <MovieCard movie={m} />
              </Col>
            ))
          }} />
          <Route path="/register" render={() => {
            if (user) return <Redirect to="/" />
            return <Col>
              <RegistrationView />
            </Col>
          }} />

          <Route path="/movies/:title" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />
            return <Col md={8}>
              <MovieView movie={movies.find(m => m.title === match.params.title)} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route path="/directors/:name" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <DirectorView director={movies.find(m => m.director.name === match.params.name).director} onBackClick={() => history.goBack()} />
            </Col>
          }
          } />

          <Route path="/genres/:name" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <GenreView genre={movies.find(m => m.genre.name === match.params.name).genre} onBackClick={() => history.goBack()} />
            </Col>
          }
          } />

        </Row>
    </Router>
    )

  }
}