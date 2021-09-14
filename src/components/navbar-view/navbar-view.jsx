import React from 'react';
import { Navbar, Container, Nav, NavDropdown, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const NavBar = ({ users, onLoggedOut }) => {
 
  const message = 'Welcome ';
  

  return (
    <Navbar bg="light" expand="md" sticky="top" variant="light" className="navbar">
      <Container className="navbar-container">
        <Navbar.Brand href="/"><h1>ActorInspector</h1></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          <Nav className="navbar">
            
            <Nav.Item className="nav-items" href="#">{message}{`${users}`}</Nav.Item>

            <Link className="nav-items" to={`/profile/${users}`} >Profile</Link>

            <NavDropdown className="nav-items" title="Genres" id="basic-nav-dropdown">
            <Link to="/genres/action">
              <NavDropdown.Item className="nav-items">Action</NavDropdown.Item>
            </Link>
            <Link to="/genres/adventure">
              <NavDropdown.Item className="nav-items">Adventure</NavDropdown.Item>
            </Link>
            <Link to="/genres/biography">
              <NavDropdown.Item className="nav-items">Biography</NavDropdown.Item>
            </Link>
            <Link to="/genres/comedy">
              <NavDropdown.Item className="nav-items">Comedy</NavDropdown.Item>
            </Link>
            <Link to="/genres/crime">
              <NavDropdown.Item className="nav-items">Crime</NavDropdown.Item>
            </Link>
            <Link to="/genres/drama">
              <NavDropdown.Item className="nav-items">Drama</NavDropdown.Item>
            </Link>
            <Link to="/genres/romance">
              <NavDropdown.Item className="nav-items">Romance</NavDropdown.Item>
            </Link>
            <Link to="/genres/thriller">
              <NavDropdown.Item className="nav-items">Thriller</NavDropdown.Item> 
            </Link>
            </NavDropdown>

            <Link className="nav-items btn btn-lg btn-outline-danger logout-button" to="/" onClick={onLoggedOut}>Logout</Link>

          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
    );
}
