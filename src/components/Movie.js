import React from "react";

import classes from "./Movie.module.css";

const Movie = (props) => {
  const deleteMovies = async () => {
    await fetch(
      `https://react-moviesapp-default-rtdb.asia-southeast1.firebasedatabase.app/movies/${props.id}.json`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    props.recall();
  };

  return (
    <li className={classes.movie}>
      <h2>{props.title}</h2>
      <h3>{props.releaseDate}</h3>
      <p>{props.openingText}</p>
      <button
        style={{ backgroundColor: "white", color: "blue" }}
        onClick={deleteMovies}
      >
        Delete Movie
      </button>
    </li>
  );
};

export default Movie;
