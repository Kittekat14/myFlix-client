import React from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';

const NavigationBar = () => {
return (
<Navbar bg="light" expand="md">
  <Container className="navbar">
    <Navbar.Brand href="#home"></Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse className="nav-items" id="basic-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link href="#home">Profile</Nav.Link>
        <Nav.Link href="#link">Logout</Nav.Link>
        <NavDropdown title="Genres" id="basic-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">Adventure</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">Biography</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">Comedy</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Crime</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Drama</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Romance</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Sci-fi</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Thriller</NavDropdown.Item> 
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
);
}

export default NavigationBar;
