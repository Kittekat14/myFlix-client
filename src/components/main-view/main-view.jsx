// Main-View ~ Homepage
import React from 'react';
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export class MainView extends React.Component {   // here you export the MainView Component as an instance of the React.Component(=blueprint for a component)

  constructor() {
    super();
    this.state = {  //MainView's state has objects --> movies, selectedMovie
      movies: [
        { _id: 1, title: 'Inception', description: 'desc1...', imageUrl: '...'},
        { _id: 2, title: 'The Shawshank Redemption', description: 'desc2...', imageUrl: '...'},
        { _id: 3, title: 'Gladiator', description: 'desc3...', imageUrl: '...'}
      ],
      selectedMovie: null
    };
  }

// Custom component method "setSelectedMovie":
  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

// visual representation of component:
render() {
  const { movies, selectedMovie } = this.state;

  if (movies.length === 0) return <div className="main-view">The list is empty!</div>;

  return (
    <div className="main-view">
      {selectedMovie
        ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
        : movies.map(movie => (
          <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }}/>
        ))
      }
    </div>
  );
 }
 
}