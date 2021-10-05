import React from 'react';
import { connect } from 'react-redux';

import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { setFilter } from '../../actions/actions';

function VisibilityFilterInput(props) {
  return (
    <Container fluid>
     <Row className="justify-content-md-center">
      <Col xs={12}>
        <Form.Control 
          onChange={e => props.setFilter(e.target.value)}
          value={props.visibilityFilter}
          placeholder="filter"
        />
      </Col>
     </Row>
    </Container>
  )
}

export default connect(null, { setFilter })(VisibilityFilterInput);