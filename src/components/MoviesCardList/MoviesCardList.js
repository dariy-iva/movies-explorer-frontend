import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

export default function MoviesCardList({ movies, isSavedMoviesPage }) {
  const widthUserDevice = window.innerWidth;
  const maxCards = widthUserDevice > 1023 ? 12 : widthUserDevice > 767 ? 8 : 5;
  const [maxCardsAfterLoad, setMaxCardsAfterLoad] = React.useState(maxCards);

  function handleCardsLoaderClick() {
    setMaxCardsAfterLoad(maxCardsAfterLoad + maxCards);
  }

  return (
    <section className="cards">
      <ul className="cards__list">
        {movies.map((movie) => {
          if (isSavedMoviesPage && movie.owner) {
            return (
              <li key={movies.indexOf(movie)}>
                <MoviesCard
                  card={movie}
                  key={movies.indexOf(movie)}
                  isSavedMoviesPage={isSavedMoviesPage}
                />
              </li>
            );
          } else if (
            !isSavedMoviesPage &&
            movies.indexOf(movie) < maxCardsAfterLoad
          ) {
            return (
              <li key={movies.indexOf(movie)}>
                <MoviesCard
                  card={movie}
                  key={movies.indexOf(movie)}
                  isSavedMoviesPage={isSavedMoviesPage}
                />
              </li>
            );
          }
        })}
      </ul>
      {!isSavedMoviesPage && (
        <button className="cards__loader" onClick={handleCardsLoaderClick}>
          Ещё
        </button>
      )}
    </section>
  );
}
