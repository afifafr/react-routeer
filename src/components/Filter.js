import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
const Filter = ({ onFilter }) => {
  // État local pour le filtre par titre
  const [titleFilter, setTitleFilter] = useState('');
  // État local pour le filtre par note
  const [ratingFilter, setRatingFilter] = useState('');

  // Fonction appelée lorsqu'il y a un changement dans le champ de filtre par titre
  const handleTitleFilterChange = (event) => {
    setTitleFilter(event.target.value); // Met à jour l'état du filtre par titre avec la valeur du champ
  };

  // Fonction appelée lorsqu'il y a un changement dans le champ de filtre par note
  const handleRatingFilterChange = (event) => {
    setRatingFilter(event.target.value); // Met à jour l'état du filtre par note avec la valeur du champ
  };

  // Fonction appelée lorsque le bouton "Apply Filters" est cliqué
  const handleApplyFilters = () => {
    // Appelle la fonction onFilter avec un objet contenant les valeurs des filtres
    onFilter({ title: titleFilter, rating: ratingFilter });
  };

  return (
    <div className="filter">
      {/* Champ de texte pour filtrer par titre */}
      <input
        type="text"
        placeholder="Filter by title"
        value={titleFilter}
        onChange={handleTitleFilterChange}
      />
      {/* Champ de texte pour filtrer par note */}
      <input
        type="text"
        placeholder="Filter by rating"
        value={ratingFilter}
        onChange={handleRatingFilterChange}
      />
      {/* Bouton pour appliquer les filtres */}
      <button onClick={handleApplyFilters}>Apply Filters</button>
    </div>
  );
};

export default Filter;