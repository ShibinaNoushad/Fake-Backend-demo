import React, { useEffect } from "react";

import MoviesList from "./components/MoviesList";
import { useState } from "react";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [reload, setreload] = useState(true);
  const [getResponse, setGetresponse] = useState("");

  const stopRetrying = () => {
    setreload(false);
  };

  const fetchHandler = () => {
    return new Promise(async (res, rej) => {
      try {
        let response = await fetch("https://swapi.dev/api/film/");
        setGetresponse(response);

        res(response);
      } catch (error) {
        rej(error);
      }
    });
  };
  useEffect(() => {
    if (getResponse) {
      if (!getResponse.ok) {
        if (reload) {
          const id = setTimeout(async () => {
            await fetchHandler();
          }, 5000);
        }
      }
    }
  }, [getResponse, reload]);

  const movieFetchHandler = async () => {
    setIsLoading(true);
    setError(null);
    setreload(true);


    try {
      // let respone = await fetch("https://swapi.dev/api/film/");
      const response = await fetchHandler();
      // if (!respone.ok) {
      //   if (reload) {
      //     const id = setTimeout(() => {
      //       respone = fetch("https://swapi.dev/api/film/");
      //     }, 5000);
      //   }

      //   throw new Error("Something went wrong");
      // }

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      // }
      //}

      const data = await response.json();
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
