import React, { useState, useEffect } from "react";

import MovieCard from "./MovieCard";
import SearchIcon from "./search.svg";
import "./App.css";

const API_URL = "https://www.omdbapi.com/?apikey=e1879397";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);

  const searchMovies = async () => {
    let title;
    if (searchTerm === "") {
      title = "Avengers";
    } else {
      title = searchTerm;
    }
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    console.log(data.Search);
    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovies();
  }, []);

  let search = (e) => {
    e.preventDefault();
    searchMovies();
  };

  return (
    <div className="app">
      <h1>MovieMania</h1>
      <div className="search">
        <form onSubmit={search}>
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for movies"
            type="text"
          />
        </form>
        <img src={SearchIcon} alt="search" onClick={search} type="search" />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
