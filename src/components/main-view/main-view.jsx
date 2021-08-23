import React from 'react';
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export class MainView extends React.Component {   // here you export the MainView Component as an instance of the React.Component(=blueprint for a component)

  constructor() {
    super();
    this.state = {
      movies: [
        { _id: 1, title: 'Inception', description: 'desc1...', imageUrl: '...'},
        { _id: 2, title: 'The Shawshank Redemption', description: 'desc2...', imageUrl: '...'},
        { _id: 3, title: 'Gladiator', description: 'desc3...', imageUrl: '...'}
      ],
      selectedMovie: null
    };
  }
// visual representation of component:
render() {
  const {movies, selectedMovie} = this.state.movies;

  if (selectedMovie) return <MovieView movie={selectedMovie} />;

  if (movies.length === 0){
    return <div className="main-view">The list is empty!</div>;
  } else {
    return (
      <div className="main-view">
        <button onClick={() => {alert('Nice!')}}>Click me!</button>
        {movies.map((movie) => {
          return <MovieCard key={movie._id} movie={movie}/>;
        })}
      </div>
    );
  }
 }
 
}