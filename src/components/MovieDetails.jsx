import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const API_KEY = "0b6245d2cc8e3e10940976bd71dff39c";
const imageBase = "https://image.tmdb.org/t/p/w500";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [recs, setRecs] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;
    async function load() {
      try {
        setLoading(true);
        setError(null);

        const [m, r, rev] = await Promise.all([
          fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`).then(res => res.json()),
          fetch(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${API_KEY}&language=en-US`).then(res => res.json()),
          fetch(`https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${API_KEY}&language=en-US`).then(res => res.json()),
        ]);

        if (!ignore) {
          setMovie(m);
          setRecs(r.results || []);
          setReviews(rev.results || []);
        }
      } catch (err) {
        if (!ignore) setError(err.message || "Error loading movie");
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    load();
    return () => { ignore = true; };
  }, [id]);

  if (loading) return <div className="text-center py-5">Loading…</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!movie) return <div className="text-center py-5">No data found.</div>;

  const img = movie.poster_path
    ? `${imageBase}${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  return (
    <div className="container py-4">
      <Link to="/" className="btn btn-outline-primary mb-3">← Back</Link>

      {/* Movie info */}
      <div className="row mb-4">
        <div className="col-md-4">
          <img src={img} className="img-fluid rounded" alt={movie.title} />
        </div>
        <div className="col-md-8">
          <h2>{movie.title}</h2>
          <p className="opacity-75">{movie.tagline}</p>
          <p>{movie.overview}</p>
          <ul className="list-unstyled">
            <li><strong>Release Date:</strong> {movie.release_date}</li>
            <li><strong>Rating:</strong> ⭐ {movie.vote_average?.toFixed(1)} ({movie.vote_count} votes)</li>
            <li><strong>Genres:</strong> {movie.genres?.map((g) => g.name).join(", ")}</li>
            <li><strong>Runtime:</strong> {movie.runtime} min</li>
          </ul>
        </div>
      </div>

      {/* Recommendations */}
      <div className="mb-5">
        <h4>Recommended Movies</h4>
        <div className="row">
          {recs.length > 0 ? (
            recs.slice(0, 6).map((m) => (
              <div key={m.id} className="col-6 col-md-4 col-lg-2 mb-3">
                <Link to={`/movie/${m.id}`} className="text-white text-decoration-none">
                  <div className="card bg-dark h-100">
                    <img
                      src={m.poster_path ? `${imageBase}${m.poster_path}` : "https://via.placeholder.com/300x450?text=No+Image"}
                      className="card-img-top"
                      alt={m.title}
                    />
                    <div className="card-body p-2">
                      <h6 className="card-title text-truncate mb-0">{m.title}</h6>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <p className="opacity-75">No recommendations found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
