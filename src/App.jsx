import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import MovieList from "./components/movieList";
import Favorites from "./components/Favorites";
import SayHello from "./components/sayHello";
import NotFound from "./components/NotFound";
import MovieDetails from "./components/MovieDetails";
import TvShows from "./components/TvShow";
import "./App.css";

const API_KEY = "0b6245d2cc8e3e10940976bd71dff39c";
const API_URL = "https://api.themoviedb.org/3";

function App() {
  const [lightMode, setLightMode] = useState(false);
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (lightMode) {
      document.body.classList.add("light");
    } else {
      document.body.classList.remove("light");
    }
  }, [lightMode]);

  const fetchMovies = async (searchQuery, currentPage) => {
    try {
      let url;
      if (searchQuery) {
        url = `${API_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
          searchQuery
        )}&page=${currentPage}`;
      } else {
        url = `${API_URL}/movie/now_playing?api_key=${API_KEY}&page=${currentPage}`;
      }
      const res = await fetch(url);
      const data = await res.json();
      setMovies(data.results || []);
      setTotalPages(data.total_pages || 1);
    } catch (e) {
      console.error("Error fetching movies:", e);
    }
  };

  useEffect(() => {
    fetchMovies(query, page);
  }, [page, query]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchMovies(query, 1);
  };

  return (
    <Router>
      <Header lightMode={lightMode} setLightMode={setLightMode} />
      <div className="container pt-5">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <SayHello
                  query={query}
                  setQuery={setQuery}
                  handleSearch={handleSearch}
                />
                <MovieList
                  movies={movies}
                  page={page}
                  setPage={setPage}
                  totalPages={totalPages}
                  favorites={favorites}
                  setFavorites={setFavorites}
                />
              </>
            }
          />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/tv" element={<TvShows />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
