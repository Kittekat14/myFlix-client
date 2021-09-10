import React, { Component } from 'react';

export class ProfileView extends Component {
  constructor() {
    super();
    this.state = {
        username: null,
        password: null,
        email: null,
        birthdate: null,
        favorites: []
    }
  }
  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.getUser(accessToken);
    }
  }
  
  render() {
    return (
      <div>
        
      </div>
    )
  }
}




