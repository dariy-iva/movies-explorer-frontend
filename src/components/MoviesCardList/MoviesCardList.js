import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

export default function MoviesCardList({ movies, isSavedMoviesPage, onSaveMovie, onDeleteMovie }) {
  const widthUserDevice = window.innerWidth;
  const maxCards = widthUserDevice > 1023 ? 12 : widthUserDevice > 767 ? 8 : 5;
  const loadCards = widthUserDevice > 1023 ? 3 : widthUserDevice > 767 ? 2 : 1;
  const [maxCardsAfterLoad, setMaxCardsAfterLoad] = React.useState(maxCards);

  function handleCardsLoaderClick() {
    setMaxCardsAfterLoad(maxCardsAfterLoad + loadCards);
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
                  onDeleteMovie={onDeleteMovie}
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
                  onSaveMovie={onSaveMovie}
                  onDeleteMovie={onDeleteMovie}
                />
              </li>
            );
          }
        })}
      </ul>
      {(!isSavedMoviesPage && movies.length > maxCards) && (
        <button className="cards__loader link-hover" onClick={handleCardsLoaderClick}>
          Ещё
        </button>
      )}
    </section>
  );
}
