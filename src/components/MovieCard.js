import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie, onDeleteMovie }) => {
  const handleDelete = () => {
    onDeleteMovie(movie.id);
  };

  return (
    <Link to={`/movies/${movie.id}`} className="movie-card-link">
      <div className="movie-card">
        <img src={movie.image} alt="Movie" className="movie-image" />
        <h3>{movie.title}</h3>
        <p>{movie.description}</p>
        <p>Rating: {movie.rating}</p>
        <button onClick={handleDelete} className="btn btn-danger">
          Delete
        </button>
      </div>
    </Link>
  );
};

export default MovieCard;