import React, { useCallback, useEffect } from "react";

import MoviesList from "./components/MoviesList";
import { useState } from "react";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const movieFetchHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const respone = await fetch("https://swapi.dev/api/films/");
      if (!respone.ok) {
        setError(true);
        throw new Error("Something went wrong");
      }

      const data = await respone.json();
      const transFormedMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      });
      setMovies(transFormedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  },[]);

  useEffect(() => {
    movieFetchHandler();
  }, [movieFetchHandler]);

  let content = <p>Found No Movies</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }
  if (error) {
    content = <p>error</p>;
  }
  if (isLoading) {
    content = <p>Loading</p>;
  }
  return (
    <React.Fragment>
      <section>
        <button onClick={movieFetchHandler}>Fetch Movies</button>
      </section>
      <section>
        {/* {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && !error && <p>Found no movies.</p>}
        {isLoading && <p>Loading...</p>}
        {!isLoading && error && <p>{error}</p>} */}
        {content}
      </section>
    </React.Fragment>
  );
}

export default App;
