// Main-View ~ Homepage
import React from 'react';
import axios from 'axios';
import '../../index.scss';
import { LoginView } from "../login-view/login-view";
import { RegisterView } from "../register-view/register-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Container } from 'react-bootstrap';
import NavigationBar from '../navbar/Navbar';

export class MainView extends React.Component {  
  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: '',
      register: true
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if(accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }
   

  // custom component method "setSelectedMovie":
  setSelectedMovie(movie) {
    this.setState({selectedMovie: movie});
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


  //  Get user data from DB
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

  getMovies(token) {
    axios.get('https://actor-inspector.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      this.setState({
        movies: response.data
      });
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
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
   
    const { movies, selectedMovie, user, register } = this.state;
    console.log(this.state);
    /* If there is no user logged in, the LoginView is rendered. If a user is logged in, his details are passed as a prop to the LoginView*/

    if ( !register ) 
    return (
    <>
      <NavigationBar users={this.state.user}/>
    <RegisterView onLoginClick={ (register) => this.onRegistration(register) } onRegistration={ (register) => this.onRegistration(register) } />
    </>
    );

    if ( user === '' ) 
    return (
    <>
      <NavigationBar users={this.state.user}/>
    <LoginView onRegisterClick={ (register) => this.onRegistration(register) } onLoggedIn={ (user) => this.onLoggedIn(user) } /> 
    </>
    );

    if (movies.length === 0) return <div className="main-view" />;

    return (
    <Container className="my-flix" className="main-view">
      
      
        {selectedMovie
          ? ( <Row className="justify-content-md-center">
                <Col md={8}>
                  <NavigationBar users={this.state.user}/>
                  <MovieView movie={selectedMovie} onBackClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie); }}/>
                </Col>
              </Row> 
          ) 
          : (
          <Row className="justify-content-md-center">
            <NavigationBar users={this.state.user}/>
            {movies.map(movie => (
              <Col md={3}> 
                <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie); }}/>
              </Col>
            ))}
          </Row>
          )
        }
      
      </Container>
    );

  }
}