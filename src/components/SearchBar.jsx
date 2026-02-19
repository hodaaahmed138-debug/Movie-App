import React from "react";

const SearchBar = ({ query, setQuery, handleSearch }) => {
  return (
    <form onSubmit={handleSearch} className="d-flex mb-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for movies..."
        className="form-control me-2"
        style={{ background: 'var(--bg-secondary)', color: 'var(--color-text)', border: '1px solid var(--border-color)'}}
      />
      <button type="submit" className="btn btn-warning fw-bold">
        Search
      </button>
    </form>
  );
};

export default SearchBar;