import React, { useEffect } from "react";

import MoviesList from "./components/MoviesList";
import { useState } from "react";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [reload, setreload] = useState(false);
  // console.log(reload)

  const stopRetrying = () => {
    setreload(false);
  };

  const newFun = () => {
    // if (reload) {
    const id = setTimeout(async () => {
      console.log(reload);
      let respone = await fetch("https://swapi.dev/api/film/");
      if (reload) {
        newFun();
      }
    }, 3000);
    //}
  };

  // useEffect(() => {
  //   if (reload) {
  //     const id = setTimeout(async () => {
  //       console.log(reload);
  //       let respone = await fetch("https://swapi.dev/api/film/");
  //     }, 5000);
  //   }
  // });

  const movieFetchHandler = async () => {
    setIsLoading(true);
    setError(null);

    try {
      let respone = await fetch("https://swapi.dev/api/film/");
      console.log(respone);
      if (!respone.ok) {
        setreload(true);

        newFun();

        throw new Error("Something went wrong");
      } else {
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
        setIsLoading(false);
      }
    } catch (error) {
      setError(error.message);
    }
  };
  let content = <p>Found No Movies</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }
  if (error) {
    content = error;
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
        {reload && error && <button onClick={stopRetrying}>Cancel</button>}
      </section>
    </React.Fragment>
  );
}
export default App;
