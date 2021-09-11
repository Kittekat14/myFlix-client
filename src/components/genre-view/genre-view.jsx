import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

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
    const { genre, onBackClick } = this.props;
    return (
      <div>
        <div className="genre-name">
          <span className="label">Name: </span>
          <span className="value">{genre.name}</span>    
        </div>
        <div className="genre-description">
          <span className="label">Description: </span>
          <span className="value">{genre.description}</span>     
        </div>  
        
        <button className="back-button" onClick={() => { onBackClick(null); }}>Back</button>
      </div>
    );
  }
}


GenreView.propTypes = {
  genre: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string
  }).isRequired,
  onBackClick: PropTypes.func
};
