import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import MovieCard from "./movieCard";

const TvShows = () => {
  const [shows, setShows] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const API_KEY = "0b6245d2cc8e3e10940976bd71dff39c";

  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&page=${page}`
    )
      .then((res) => res.json())
      .then((data) => {
        setShows(data.results.slice(0, 9));
        setTotalPages(data.total_pages);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  }, [page]);

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage });
  };

  const getPageNumbers = () => {
    let pages = [];
    let start = Math.max(1, page - 2);
    let end = Math.min(totalPages, page + 2);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };
  return (
    <div className="movie pt-5 pb-5">
      <div className="container">
        <h2 className="mb-4">Popular TV Shows</h2>
        <div className="row">
          {shows.map((show) => (
            <MovieCard
              key={show.id}
              movie={{
                ...show,
                title: show.name,
                release_date: show.first_air_date,
              }}
              isFavorite={false}
              onToggleFavorite={() => {}}
            />
          ))}
        </div>

        <nav>
          <ul className="d-flex gap-2 pagination justify-content-center mt-5">
            <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
              <button
                className="page-link px-2 btn btn-primary"
                onClick={() => handlePageChange(Math.max(page - 1, 1))}
              >
                Prev
              </button>
            </li>
            {getPageNumbers().map((num) => (
              <li
                className={`page-item ${num === page ? "active" : ""}`}
                key={num}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(num)}
                >
                  {num}
                </button>
              </li>
            ))}
            <li
              className={`page-item ${page === totalPages ? "disabled" : ""}`}
            >
              <button
                className="page-link px-2 btn btn-primary"
                onClick={() => handlePageChange(Math.min(page + 1, totalPages))}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default TvShows;
