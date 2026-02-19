import React from "react";
import MovieCard from "./movieCard";
import NotFound from "./NotFound";
import Pagination from "./Pagination";

const MovieList = ({ movies, page, setPage, totalPages, favorites, setFavorites }) => {
  const handleToggleFavorite = (movie) => {
    const isCurrentlyFavorite = favorites.some((favMovie) => favMovie.id === movie.id);

    let updatedFavorites;
    if (isCurrentlyFavorite) {
      updatedFavorites = favorites.filter((favMovie) => favMovie.id !== movie.id);
    } else {
      updatedFavorites = [...favorites, movie];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const moviesToDisplay = movies.filter(movie => movie.poster_path);

  return (
    <div className="movie pt-5 pb-5">
      <div className="container">
        <div className="row">
          {moviesToDisplay.length > 0 ? (
            moviesToDisplay.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onToggleFavorite={() => handleToggleFavorite(movie)}
                isFavorite={favorites.some((favMovie) => favMovie.id === movie.id)}
              />
            ))
          ) : (
            <NotFound message="No movies found at the moment." />
          )}
        </div>
        {moviesToDisplay.length > 0 && (
          <Pagination page={page} totalPages={totalPages} setPage={setPage} />
        )}
      </div>
    </div>
  );
};

export default MovieList;