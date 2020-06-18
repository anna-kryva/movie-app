import React from 'react';
import MovieCompact from './MovieCompact';
// import MovieCard from './MovieCard';

export default function MovieList({movies}) {
  if(!movies.length) {
    return (
      <div className="alert alert-dark" role="alert">
        No movie added.
      </div>
    );
  }

  return movies.map(movie => <MovieCompact movie={movie} key={movie._id}/>);
};
