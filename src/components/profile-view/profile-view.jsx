import React, { Component } from 'react';
import axios from 'axios';

export class ProfileView extends Component {
  constructor() {
    super();

    this.state = {
      username: null,
      password: null,
      email: null,
      birthdate: null,
      favorites: []
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.getUser(accessToken);
    }
  }


  // custom GET User method
  getUser(token) {
    const username = localStorage.getItem('user');
    axios.get(`https://actor-inspector.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        this.setState({
          username: response.data.username,
          password: response.data.password,
          email: response.data.email,
          birthdate: response.data.birthdate,
          favorites: response.data.favorites,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div>

          <div>
            <span className="label">Username: </span>
            <span className="value">{username}</span>
          </div>
          <div className="movie-description">
            <span className="label">Password: </span>
            <span className="value">{password}</span>
          </div>  
          <div>
            <span className="label">Email: </span>
            <span className="value">{email}</span>  
          </div>
          <div>
            <span className="label">Birthdate: </span>
            <span className="value">{birthdate}</span>  
          </div>
          <div>
            <span className="label">Favorite Movies: </span>
            <span className="value">{favorites}</span>  
          </div>
          
      </div>
    )
  }
}

export default ProfileView
