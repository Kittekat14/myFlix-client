import React, { Component } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { connect } from 'react-redux';


export default class UpdateView extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      newUsername: '',
      newPassword: '',
      newEmail: '',
      newBirthdate: ''
    }
  }
  
  handleUserUpdate() { 
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    const data = {
      username: this.state.newUsername,
      password: this.state.newPassword,
      email: this.state.newEmail,
      birthdate: this.state.newBirthdate
    };
    axios.put(`https://actor-inspector.herokuapp.com/users/${username}`, data, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((response) => {
      this.setState({
      username: response.data.username,
      password: response.data.password,
      email: response.data.email,
      birthdate: response.data.birthdate
      });
      console.log(this.state);
      localStorage.setItem('user', this.state.username);
      window.open(`/profile/${username}`, '_self');
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  
  render() {
    return (
      <>

    <Form>
        <h3>Update Your User Data</h3>
      <Form.Group className="mb-3" controlId="formUsername">
        <Form.Label>Username*:</Form.Label>
        <Form.Control required type="text" placeholder="Enter New Username"
            onChange={(e) => this.setState(
              {newUsername: e.target.value}
              )}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label>Password*:</Form.Label>
        <Form.Control required type="password" placeholder="Enter New Password"
            onChange={(e) => this.setState(
              {newPassword: e.target.value}
              )}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label label="Email" className="mb-3"
          > Email*: 
            <Form.Control required type="email" placeholder="Enter New Email"
            onChange={(e) => this.setState(
              {newEmail: e.target.value}
              )}/>
          </Form.Label>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBirthdate">
        <Form.Label label="Birthdate" className="mb-3"
        > Birthdate:
          <Form.Control type="date" placeholder="Enter New Birthdate"
          onChange={(e) => this.setState(
            {newBirthdate: e.target.value}
            )}/>
        </Form.Label>
      </Form.Group>


      <Button type="button" onClick={ () => { this.handleUserUpdate() } }>Update your Account</Button>

    </Form>

      </>
    )
  }
}

