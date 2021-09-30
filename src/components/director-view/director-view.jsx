import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Button, Row, Col, Container } from 'react-bootstrap';

export class DirectorView extends React.Component {

  render() {
    const { director, onBackClick } = this.props;

    return (
      <Container>

        <Row className="director-name">
          <Col className="label">Name: </Col>
          <Col className="value">{director.name}</Col>    
        </Row>
        <Row className="director-bio">
          <Col className="label">Biography: </Col>
          <Col className="value">{director.bio}</Col>     
        </Row>  
        <Row className="director-birthyear">
          <Col className="label">Year of Birth: </Col>
          <Col className="value">{director.birthyear}</Col>      
        </Row>
        <Row className="director-movies">
          <Col className="label">Movies: </Col>
          <Col className="value">{director.movies.join(', ')}</Col>    
        </Row>
        
        <Button className="back-button" onClick={() => { onBackClick(null); }}>Back</Button>

      </Container>
    );
  };

}

DirectorView.propTypes = {
  director: PropTypes.shape({
    name: PropTypes.string,
    bio: PropTypes.string,
    birthyear: PropTypes.string,
    movies: PropTypes.array
  }).isRequired,
  onBackClick: PropTypes.func
};