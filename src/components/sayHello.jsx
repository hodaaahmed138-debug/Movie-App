import React from "react";

const SayHello = ({ query, setQuery, handleSearch }) => {
  return (
    <div className="mt-5 ms-auto me-auto mb-5 p-5 landing container">
      <div className="">
        <h2 className="fw-bold m-0">Welcome To Our Movie app</h2>
        <p className="fw-normal mt-4 mb-3">
          Milions of movies, TV shows and people to discover, Exlpore Now
        </p>
        <form onSubmit={handleSearch} className="d-flex w-full gap-3">
          <input
            type="text"
            placeholder="Search and expolre..."
            className="form-control"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className="btn px-5 btn-primary">
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default SayHello;