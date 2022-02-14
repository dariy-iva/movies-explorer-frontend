import React from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ movies }) {
  const widthUserDevice = window.innerWidth;
  const maxCards = widthUserDevice > 1023 ? 12 : widthUserDevice > 767 ? 8 : 5;
  const [maxCardsAfterLoad, setMaxCardsAfterLoad] = React.useState(maxCards);
  const location = useLocation();
  const path = location.pathname;

  function handleCardsLoaderClick() {
    setMaxCardsAfterLoad(maxCardsAfterLoad + maxCards);
  }

  return (
    <section className="cards">
      <ul className="cards__list">
        {movies.map((movie) => {
          if (path === "/saved-movies" && movie.owner) {
            return (
              <li key={movies.indexOf(movie)}>
                <MoviesCard card={movie} key={movies.indexOf(movie)} />
              </li>
            );
          } else if (
            path === "/movies" &&
            movies.indexOf(movie) < maxCardsAfterLoad
          ) {
            return (
              <li key={movies.indexOf(movie)}>
                <MoviesCard card={movie} key={movies.indexOf(movie)} />
              </li>
            );
          }
        })}
      </ul>
      {path === "/movies" && (
        <button className="cards__loader" onClick={handleCardsLoaderClick}>
          Ещё
        </button>
      )}
    </section>
  );
}

export default MoviesCardList;
