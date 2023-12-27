import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import MovieList from './MovieList';
import Filter from './Filter';
import AddMovieForm from './AddMovieForm';
import MovieDescription from './MovieDescription';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  // Déclaration des états avec le hook useState
  const [movies, setMovies] = useState([]); // État pour stocker tous les films
  const [filteredMovies, setFilteredMovies] = useState([]); // État pour stocker les films filtrés

  // Utilisation du hook useEffect pour effectuer une action asynchrone après le rendu initial
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('/api/movies'); // Requête vers l'API pour récupérer les données des films
        const moviesData = await response.json(); // Conversion de la réponse en format JSON
        setMovies(moviesData); // Mise à jour de l'état movies avec les données des films
        setFilteredMovies(moviesData); // Mise à jour de l'état filteredMovies avec les données des films
      } catch (error) {
        console.error('Error fetching movies:', error); // Affichage d'une erreur en cas d'échec de la requête
      }
    };

    fetchMovies(); // Appel de la fonction fetchMovies
  }, []);

  // Fonction de gestion du filtrage des films
  const handleFilter = ({ title, rating }) => {
    const filtered = movies.filter((movie) => {
      const titleMatch = movie.title.toLowerCase().includes(title.toLowerCase()); // Vérification si le titre correspond à la recherche (ignorant la casse)
      const ratingMatch = rating === '' || movie.rating.toString().includes(rating); // Vérification si la note correspond à la recherche

      return titleMatch && ratingMatch; // Retourne true si les deux critères sont satisfaits, sinon false
    });

    setFilteredMovies(filtered); // Mise à jour de l'état filteredMovies avec les films filtrés
  };

  // Fonction de gestion de l'ajout d'un nouveau film
  const handleAddMovie = (newMovie) => {
    setMovies([...movies, newMovie]); // Ajout du nouveau film à la liste des films existante en utilisant l'opérateur spread
    setFilteredMovies([...filteredMovies, newMovie]); // Ajout du nouveau film à la liste des films filtrés existante en utilisant l'opérateur spread
  };

  // Fonction de gestion de la suppression d'un film
  const handleDeleteMovie = (movieId) => {
    const updatedMovies = movies.filter((movie) => movie.id !== movieId); // Filtrage des films pour supprimer celui ayant l'ID correspondant
    setMovies(updatedMovies); // Mise à jour de l'état movies avec les films mis à jour

    const updatedFilteredMovies = filteredMovies.filter((movie) => movie.id !== movieId); // Filtrage des films filtrés pour supprimer celui ayant l'ID correspondant
    setFilteredMovies(updatedFilteredMovies); // Mise à jour de l'état filteredMovies avec les films filtrés mis à jour
  };

  // Rendu du composant App
  return (
    <Router>{/* Utilisation du Router pour gérer les routes de l'application */}
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <Link className="navbar-brand" to="/">Movie Library</Link>{/* Lien vers la page d'accueil */}
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>{/* Lien vers la page d'accueil */}
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/add-movie">Add Movie</Link>{/* Lien vers la page d'ajout de film */}
              </li>
            </ul>
          </div>
        </nav>
        <div className="container">
          <Routes>{/* Utilisation de Routes pour définir les différentes routes de l'application */}
          <Route path="/" element={<>
  <Filter onFilter={handleFilter} />
  <MovieList movies={filteredMovies} onDeleteMovie={handleDeleteMovie} />{/* Rendu du composant MovieList avec les films filtrés et la fonction handleDeleteMovie en tant que props */}
</>} />{/* Les autres routes  */}
            <Route path="/movies/:id" element={<MovieDescription movies={movies} />} />
            <Route path="/add-movie" element={<AddMovieForm onAddMovie={handleAddMovie} />} />
            
          </Routes>
          
        </div>
      </div>
    </Router>
  );
}

export default App;// Export du composant App par défaut