// Main-View ~ Homepage
import React from 'react';
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import  Inception  from "url:../../../img/Inception-min.jpg";
import  Shawshank  from "url:../../../img/TheShawshankRedemption-min.jpg";
import  Gladiator  from "url:../../../img/Gladiator-min.jpg";

export class MainView extends React.Component {   // here you export the MainView Component as an instance of the React.Component(=blueprint for a component)
  constructor() {
    super();
    this.state = {  //MainView's state has objects --> movies, selectedMovie
      movies: [
        { _id: 1, title: 'Inception', description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.', imageUrl: Inception},
        { _id: 2, title: 'The Shawshank Redemption', description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.', imageUrl: Shawshank},
        { _id: 3, title: 'Gladiator', description: 'A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.', imageUrl: Gladiator}
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

  //if (selectedMovie) return <MovieView movie={selectedMovie} />;

  if (movies.length === 0) return <div className="main-view">The list is empty!</div>;

  return (
    <div className="main-view">
      {selectedMovie
        ? <MovieView movie={selectedMovie} onBackClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie); }}/>
        : movies.map(movie => (
          <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie); }}/>
        ))
      }
    </div>
  );
 }
}