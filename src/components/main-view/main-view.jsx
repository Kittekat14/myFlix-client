// Main-View ~ Homepage
import React from 'react';
import axios from 'axios';

import { connect } from "react-redux";
import { setMovies } from '../../actions/actions';
import MoviesList from "../movie-list/movie-list";


import { BrowserRouter as Router, Route, Redirect, Link } from "react-router-dom";
import moment from 'moment';
import { LoginView } from "../login-view/login-view";
import { RegisterView } from "../register-view/register-view";
import { ProfileView } from '../profile-view/profile-view';
//import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { NavBar } from "../navbar-view/navbar-view";
import { GenreView } from "../genre-view/genre-view";
import { DirectorView } from "../director-view/director-view";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import '../../index.scss';

export default class MainView extends React.Component {  

  constructor() {
    super();
    this.state = {
      user: null,
      // movies: [],
      favorites: [],
      username: '',
      password: '',
      email: '',
      birthdate: ''
    }
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
      this.getUser(accessToken);
    }
  }
 
  /* GET movie data from DB; getMovies method is called with this.getMovies() in 'onLoggedIn', when right token for username is sent*/
  getMovies(token) {
    axios.get('https://actor-inspector.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      this.props.setMovies(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
    }
  
  /* When a user successfully logs in, this function updates the `user` property inside the state to that particular user */
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

  // GET User for his own profile
  getUser(token) {
    const username = localStorage.getItem('user');

    axios.get(`https://actor-inspector.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        this.setState({
          username: response.data.username,
          password: response.data.password,
          email: response.data.email,
          birthdate: moment(response.data.birthdate).format("YYYY-MM-DD"),
          favorites: response.data.favorites
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  deleteUser(token) {
    const username = localStorage.getItem('user');

    if(window.confirm('Are you sure you want to delete your user account?')) {
      axios.delete(`https://actor-inspector.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(() => {
          localStorage.removeItem('user');
          localStorage.removeItem('token');
          alert('Your account has been deleted.');
          window.open(`/`, '_self');
        })
        .catch((e) => {
          console.log(e);
        });
      }
    }


  removeFromFavorites(_id) {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

      
    axios.delete(`https://actor-inspector.herokuapp.com/users/${username}/favorites/${_id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((response) => {
        this.setState({
          favorites: response.data.favorites
        });
      })
      .catch(function (error) {
        console.log(error);
      })
  }


  addFavorite(_id) {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    axios
      .post(
        `https://actor-inspector.herokuapp.com/users/${username}/favorites/${_id}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((response) => {
        this.setState({
          favorites: response.data.favorites
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };    



  // visual representation of main component:
  render() {
   
    let { movies } = this.props;
    let { user, username, password, email, birthdate, favorites } = this.state;
    
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
                <MoviesList movies={movies}/>
              );
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
              <ProfileView key={username} username={username} password={password} email={email} birthdate={birthdate} favorites={favorites} movies={movies} onBackClick={() => history.goBack()} removeMovie={(_id) => this.removeFromFavorites(_id)} />
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
    );
  

  }
}

let mapStateToProps = state => {
  return { movies: state.movies }
}

export default connect(mapStateToProps, { setMovies } )(MainView);