import React from 'react';
import axios from 'axios';

export default class DirectorView extends React.Component {
  constructor() {
    super();
    this.state = {
      directors: []
    }
  }

  componentDidMount() {
    axios.get('https://actor-inspector.herokuapp.com/directors')
    .then(res => {
      console.log(res);
      this.setState({
        directors: res.data
      })
    })
    .catch(err => {
    console.log(err);
    });    
  }

 render() {
    return (
      <div>

        <div className="director-name">
          <span className="label">Name: </span>
          <span className="value">{directors.name}</span>    
        </div>
        <div className="director-bio">
          <span className="label">Biography: </span>
          <span className="value">{directors.bio}</span>     
        </div>  
        <div className="director-birthyear">
          <span className="label">Year of Birth: </span>
          <span className="value">{directors.birthyear}</span>      
        </div>
        <div className="director-movies">
          <span className="label">Movies: </span>
          <span className="value">{directors.movies}</span>      
        </div>
        
        <button className="back-button" onClick={() => { onBackClick(null); }}>Back</button>

      </div>
  );
 }
}
