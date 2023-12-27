import React from 'react';
import MovieCard from './MovieCard';

const MovieList = ({ movies, onDeleteMovie }) => {
  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} onDeleteMovie={onDeleteMovie} />
      ))}
    </div>
  );
};

export default MovieList;