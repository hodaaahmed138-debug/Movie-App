import React from "react";
import { Link } from "react-router-dom";
const MovieCard = ({ movie, onToggleFavorite, isFavorite }) => {
  const imageBase = "https://image.tmdb.org/t/p/w500";
  return (
    <div className="col-sm-6 col-md-3 mb-5">
      <div className="card shadow-sm d-flex flex-column h-100">
        <img
          src={
            movie.poster_path
              ? imageBase + movie.poster_path
              : "https://via.placeholder.com/500x750?text=No+Image"
          }
          alt={movie.title}
          className="card-img-top"
        />
        <div className="card-body d-flex flex-column">
          <h3>{movie.title}</h3>
          <div className="d-flex data justify-content-between align-items-center"> 
            <p className="date">{movie.release_date || "Unknown"}</p>

            <i
              className={`fa-solid fa-heart ${isFavorite ? 'text-danger' : 'text-secondary'}`} 
              style={{ cursor: "pointer", fontSize: "20px" }}
              onClick={onToggleFavorite}
            ></i>
          </div>
          <div className="mt-auto">
            <Link to={`/movie/${movie.id}`} className="btn btn-primary btn-sm w-100 mb-5 ">
            Details
          </Link>
           </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;