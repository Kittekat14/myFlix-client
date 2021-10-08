import React from 'react';
import PropTypes from 'prop-types';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const NavBar = ({ users, onLoggedOut }) => {
 
  const message = 'Welcome ';
  

  return (
    <Navbar bg="light" expand="md" sticky="top" variant="light" className="navbar">
      <Container className="navbar-container">
        <Link className="brand" to="/"><h1>ActorInspector</h1></Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          <Nav className="navbar">
            
            <Nav.Item className="nav-items">{message}{`${users}`}</Nav.Item>

            <Link className="nav-items" to={`/profile/${users}`} >Profile</Link>

            <NavDropdown className="nav-items" title="Genres" id="basic-nav-dropdown">
            
              <NavDropdown.Item className="nav-items"><Link to="/genres/action">Action</Link></NavDropdown.Item>
            
              <NavDropdown.Item className="nav-items"><Link to="/genres/adventure">Adventure</Link></NavDropdown.Item>
            
              <NavDropdown.Item className="nav-items"><Link to="/genres/biography">Biography</Link></NavDropdown.Item>
            
              <NavDropdown.Item className="nav-items"><Link to="/genres/comedy">Comedy</Link></NavDropdown.Item>
           
              <NavDropdown.Item className="nav-items"><Link to="/genres/crime">Crime</Link></NavDropdown.Item>
            
              <NavDropdown.Item className="nav-items"><Link to="/genres/drama">Drama</Link></NavDropdown.Item>
            
              <NavDropdown.Item className="nav-items"><Link to="/genres/romance">Romance</Link></NavDropdown.Item>
           
              <NavDropdown.Item className="nav-items"><Link to="/genres/thriller">Thriller</Link></NavDropdown.Item> 
           
            </NavDropdown>

            <Link className="nav-items btn btn-lg btn-outline-danger logout-button" to="/" onClick={onLoggedOut}>Logout</Link>

          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
    );
}

const mapStateToProps = (state) => {
  return { 
    movies: state.movies,
    user: state.user.username
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setMovies: (value) => dispatch({ 
      type: "SET_MOVIES",
      value }),
    setUser: (value) => dispatch({
      type: "SET_USER",
      value
    }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);

NavBar.propTypes = {
  users: PropTypes.object,
  onLoggedOut: PropTypes.func.isRequired,
};
