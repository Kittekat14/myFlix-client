import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

export default class DirectorView extends React.Component {
  constructor() {
    super();
    this.state = {
      directors: []
    }
  }

  // componentDidMount() {
  //   axios.get('https://actor-inspector.herokuapp.com/directors')
  //   .then(res => {
  //     console.log(res);
  //     this.setState({
  //       directors: res.data
  //     })
  //   })
  //   .catch(err => {
  //   console.log(err);
  //   });    
  // }

 render() {
   const { director, onBackClick } = this.props;
    return (
      <div>

        <div className="director-name">
          <span className="label">Name: </span>
          <span className="value">{director.name}</span>    
        </div>
        <div className="director-bio">
          <span className="label">Biography: </span>
          <span className="value">{director.bio}</span>     
        </div>  
        <div className="director-birthyear">
          <span className="label">Year of Birth: </span>
          <span className="value">{director.birthyear}</span>      
        </div>
        <div className="director-movies">
          <span className="label">Movies: </span>
          <span className="value">{director.movies}</span>      
        </div>
        
        <button className="back-button" onClick={() => { onBackClick(null); }}>Back</button>

      </div>
  );
 }
}

DirectorView.propTypes = {
  director: PropTypes.shape({
    name: PropTypes.string,
    bio: PropTypes.string,
    birthyear: PropTypes.instanceOf(Date),
    movies: PropTypes.array
  }).isRequired,
  onBackClick: PropTypes.func
};
