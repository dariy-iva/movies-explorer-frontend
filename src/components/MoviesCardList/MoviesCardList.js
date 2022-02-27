import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

export default function MoviesCardList({
  movies,
  isSavedMoviesPage,
  savedMovies,
  onDeleteMovie,
  onLikeButtonClick,
}) {

  const [windowSize, setWindowSize] = React.useState(window.innerWidth);
  const [maxCards, setMaxCards] = React.useState();
  const [loadCards, setLoadCards] = React.useState();
  const [maxCardsAfterLoad, setMaxCardsAfterLoad] = React.useState();

  function resize() {
    setTimeout(() => {
      setWindowSize(window.innerWidth);
    }, 1000);
  }

  React.useEffect(() => {
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  React.useEffect(() => {
    setMaxCards(windowSize > 1023 ? 12 : windowSize > 767 ? 8 : 5);
    setLoadCards(windowSize > 1023 ? 3 : windowSize > 767 ? 2 : 1);
    setMaxCardsAfterLoad(maxCards);
  }, [windowSize, maxCards]);

  function handleCardsLoaderClick() {
    setMaxCardsAfterLoad(maxCardsAfterLoad + loadCards);
  }

  return (
    <section className="cards">
      <ul className="cards__list">
        {movies.map((movie) => {
          if (isSavedMoviesPage) {
            return (
              <li key={movies.indexOf(movie)}>
                <MoviesCard
                  movie={movie}
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
                  movie={movie}
                  key={movies.indexOf(movie)}
                  isSavedMoviesPage={isSavedMoviesPage}
                  savedMovies={savedMovies}
                  onLikeButtonClick={onLikeButtonClick}
                />
              </li>
            );
          }
        })}
      </ul>
      {!isSavedMoviesPage && movies.length > maxCards && (
        <button
          className="cards__loader link-hover"
          onClick={handleCardsLoaderClick}
        >
          Ещё
        </button>
      )}
    </section>
  );
}
