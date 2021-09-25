import React, { Component } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default class UpdateView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newUsername: '',
      newPassword: '',
      newEmail: '',
      newBirthdate: '',

      nameError: '',
      passwordError: '',
      emailError: ''
    };
    // this.handleUserUpdate = this.handleUserUpdate.bind(this);
    // this.formValidation = this.formValidation.bind(this);
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
    const isValid = this.formValidation();
    if(isValid) {
    axios.put(`https://actor-inspector.herokuapp.com/users/${username}`, data, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((response) => {
      this.setState({
      username: response.data.newUsername,
      password: response.data.newPassword,
      email: response.data.newEmail,
      birthdate: response.data.newBirthdate
      });
      localStorage.setItem('user', this.state.newUsername);
      window.open(`/profile/${username}`, '_self');
    })
    .catch(function (error) {
      console.log(error);
    });
   }
  }

  formValidation() {
    const { newUsername, newPassword, newEmail } = this.state;
    const nameError = {};
    const passwordError = {};
    const emailError = {};
    let isValid = true;
    
    if(newUsername.trim().length < 5) {
      nameError.nameShort = 'Username must at least have 5 characters and must only contain numbers and letters.';
      isValid = false;
    }
    if(newPassword.trim().length === 0) {
      passwordError.passwordEmpty = 'Password cannot be empty.';
      isValid = false;
    }
    if(!(newEmail && newEmail.trim().includes('@') && newEmail.trim().includes('.'))) {
      emailError.emailNot = 'This seems to be no valid email address.';
      isValid = false;
    }
    this.setState({
      nameError: nameError,
      passwordError: passwordError,
      emailError: emailError
    })
    return isValid;
  }
  

  render() {
    const { newUsername, newPassword, newEmail, newBirthdate, nameError, passwordError, emailError } = this.state;

    return (
      <>

    <Form>
        <h3>Update Your User Data</h3>
      <Form.Group className="mb-3" controlId="formUsername">
        <Form.Label>Username*:</Form.Label>
        <Form.Control required type="text" placeholder="Enter New Username"
        onChange={(e) => this.setState( {newUsername: e.target.value} ) }/>
        {Object.keys(nameError).map((key) => {
        return <div style={{ fontSize: 12, color:'red'}} key={key}>{nameError[key]}</div>
        })}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label>Password*:</Form.Label>
        <Form.Control required type="password" placeholder="Enter New Password"
            onChange={(e) => this.setState(
              {newPassword: e.target.value}
              )}/>
        {Object.keys(passwordError).map((key) => {
        return <div style={{ fontSize: 12, color:'red'}} key={key}>{passwordError[key]}</div>
      })}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label label="Email" className="mb-3"
          > Email*: 
            <Form.Control required type="email" placeholder="Enter New Email"
            onChange={(e) => this.setState(
              {newEmail: e.target.value}
              )}/>
          </Form.Label>
          {Object.keys(emailError).map((key) => {
          return <div style={{ fontSize: 12, color:'red'}} key={key}>{emailError[key]}</div>
      })}
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

