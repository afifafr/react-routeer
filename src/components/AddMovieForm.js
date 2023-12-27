import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddMovieForm = ({ onAddMovie }) => {
  // États locaux pour les différentes valeurs du formulaire
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState('');
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  // Gestionnaire de changement pour le champ "Title"
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  // Gestionnaire de changement pour le champ "Description"
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  // Gestionnaire de changement pour le champ "Rating"
  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  // Gestionnaire de changement pour le champ "Image" (fichier sélectionné)
  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    const url = URL.createObjectURL(selectedImage);
    setImageUrl(url);
    setImage(selectedImage);
  };

  // Gestionnaire de changement pour le champ "Image URL"
  const handleImageUrlChange = (event) => {
    setImageUrl(event.target.value);
    setImage(null);
  };

  // Gestionnaire de soumission du formulaire
  const handleSubmit = (event) => {
    event.preventDefault();

    // Création d'un nouvel objet "newMovie" avec les valeurs du formulaire
    const newMovie = {
      id: String(Math.random()),
      title: title,
      description: description,
      rating: parseFloat(rating),
      image: imageUrl || (image ? URL.createObjectURL(image) : '')
    };

    // Appel de la fonction "onAddMovie" passée en prop avec le nouvel objet "newMovie"
    onAddMovie(newMovie);

    // Réinitialisation des valeurs du formulaire
    setTitle('');
    setDescription('');
    setRating('');
    setImage(null);
    setImageUrl('');
  };

  return (
    <div className="add-movie-form">
      <form>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={handleDescriptionChange}
            className="form-control"
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="rating">Rating:</label>
          <input
            type="number"
            id="rating"
            min="0"
            max="10"
            step="0.1"
            value={rating}
            onChange={handleRatingChange}
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="imageUrl">Image URL or File:</label>
          <input
            type="text"
            id="imageUrl"
            value={imageUrl}
            onChange={handleImageUrlChange}
            className="form-control"
            placeholder="Enter image URL or choose a file"
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Image:</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            className="form-control-file"
          />
        </div>

        {/* Affichage de l'aperçu de l'image si une URL d'image est présente */}
        {imageUrl && (
          <div className="image-preview-container">
            <div className="image-preview">
              <img src={imageUrl} alt="Movie" className="img-fluid" />
            </div>
          </div>
        )}

        <button className="btn btn-primary mt-3" onClick={handleSubmit}>
          Add
        </button>
      </form>
    </div>
  );
};

export default AddMovieForm;