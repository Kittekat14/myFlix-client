import React from 'react';
import axios from 'axios';

export default class GenreView extends React.Component {
  constructor() {
    super();
    this.state = {
       genres: [] 
    }
  }
 

  componentDidMount() {
    axios.get('https://actor-inspector.herokuapp.com/genres')
    .then(res => {
      console.log(res);
      this.setState({
        genres: res.data
      })
    })
    .catch(err => {
    console.log(err);
    })
  }

  render() {
    return (
      <div>
        <div className="genre-name">
          <span className="label">Name: </span>
          <span className="value">{genres.name}</span>    
        </div>
        <div className="genre-description">
          <span className="label">Description: </span>
          <span className="value">{genres.description}</span>     
        </div>  
        
        <button className="back-button" onClick={() => { onBackClick(null); }}>Back</button>
      </div>
    );
  }
}
