import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ movies }) {
  const widthUserDevice = window.innerWidth;
  const maxCards = widthUserDevice > 1023 ? 12 : widthUserDevice > 767 ? 8 : 5;
  const [maxCardsAfterLoad, setMaxCardsAfterLoad] = React.useState(maxCards);

  function handleCardsLoaderClick() {
    setMaxCardsAfterLoad(maxCardsAfterLoad + maxCards);
  }

  return (
    <section className="cards">
      <ul className="cards__list">
        {movies.map(
          (movie) =>
            movies.indexOf(movie) < maxCardsAfterLoad && (
              <li key={movies.indexOf(movie)}>
                <MoviesCard card={movie} key={movies.indexOf(movie)} />
              </li>
            )
        )}
      </ul>
      <button className="cards__loader" onClick={handleCardsLoaderClick}>
        Ещё
      </button>
    </section>
  );
}

export default MoviesCardList;
