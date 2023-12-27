import React from 'react';
import { Link, useParams } from 'react-router-dom';
import './App.css';
const MovieDescription = ({ movies }) => {
  const { id } = useParams();

  // Recherche du film correspondant à l'ID dans la liste des films
  const movie = movies.find(movie => movie.id === id);

  if (!movie) {
    return <p>Movie not found.</p>;
  }

  // Fonction pour générer le lien de recherche YouTube basé sur le titre du film
  const generateYouTubeLink = (title) => {
    const searchQuery = encodeURIComponent(`${title}`);
    return `https://www.youtube.com/results?search_query=${searchQuery}`;
  };

  return (
    <div className="movie-description">
      <Link to="/" className="back-link">
        Back to Home
      </Link>
      <h2>{movie.title}</h2>
      <p>{movie.description}</p>
      <div className="trailer">
        <a href={generateYouTubeLink(movie.title)} target="_blank" rel="noopener noreferrer">
          Watch on YouTube
        </a>
      </div>
    </div>
  );
};

export default MovieDescription;