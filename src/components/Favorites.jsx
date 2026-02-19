import React, { useState, useEffect } from "react";
import MovieCard from "./movieCard";
import NotFound from "./NotFound";
const Favorites = () => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavoriteMovies(storedFavorites);
  }, []);

  const removeFavorite = (movieToRemove) => {
    const updatedFavorites = favoriteMovies.filter(
      (movie) => movie.id !== movieToRemove.id
    );
    setFavoriteMovies(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="favorites-page">
      <h1 className="favorites-title">Favourite List</h1>
      {favoriteMovies.length > 0 ? (
        <div className="favorites-list">
          {favoriteMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              isFavorite={true}
              onToggleFavorite={() => removeFavorite(movie)}
            />
          ))}
        </div>
      ) : (
        <NotFound message="You haven't added any movies to your favorites yet.." />
      )}
    </div>
  );
};

export default Favorites;