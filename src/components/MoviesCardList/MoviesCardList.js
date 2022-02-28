import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import useWindowSize from "../../hooks/useWindowSize";

export default function MoviesCardList(props) {
  const {
    movies,
    isSavedMoviesPage,
    isSavedMovie,
    onDeleteMovie,
    onLikeButtonClick,
    isSuccessSearch,
  } = props;

  const windowSize = useWindowSize();
  const [maxCards, setMaxCards] = React.useState(0);
  const [loadCards, setLoadCards] = React.useState(0);
  const [maxCardsAfterLoad, setMaxCardsAfterLoad] = React.useState(0);

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
              <li key={movie.movieId}>
                <MoviesCard
                  movie={movie}
                  key={movie.movieId}
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
              <li key={movie.id}>
                <MoviesCard
                  movie={movie}
                  key={movie.id}
                  isSavedMoviesPage={isSavedMoviesPage}
                  isSavedMovie={isSavedMovie}
                  onLikeButtonClick={onLikeButtonClick}
                />
              </li>
            );
          } else {return null}
        })}
      </ul>
      {!isSuccessSearch && (
        <p className="cards__text cards__info">Ничего не найдено</p>
      )}
      {!isSavedMoviesPage && movies.length > maxCards && (
        <button
          className="cards__text cards__loader link-hover"
          onClick={handleCardsLoaderClick}
        >
          Ещё
        </button>
      )}
    </section>
  );
}
