import React from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';

const NavigationBar = (props) => {
  const { users } = props;
  const message = 'Welcome ';

 
return (
<Navbar bg="light" expand="md" sticky="top" variant="info" className="navbar">
  <Container className="navbar-container">
    <Navbar.Brand href="#top"><h1>ActorInspector</h1></Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse className="nav-items">
      <Nav className="me-auto navbar">
        <Nav.Link className="nav-items" href="#">{message}{`${props.users}`}</Nav.Link>
        <NavDropdown className="nav-items" title="Genres" id="basic-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">Adventure</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Biography</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.4">Comedy</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.5">Crime</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.6">Drama</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.7">Romance</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.8">Sci-fi</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.9">Thriller</NavDropdown.Item> 
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
);
}

export default NavigationBar;
