import React from "react";
import "./MoviesCard.css";
import setDurationInString from "../../utils/setDurationInString"

export default function MoviesCard(props) {
  const {
    movie,
    isSavedMoviesPage,
    isSavedMovie,
    onLikeButtonClick,
    onDeleteMovie,
  } = props;
  const { nameRU, trailerLink, trailer, duration, image } = movie;
  const [isHover, setIsHover] = React.useState(false);
  const imageURL = `https://api.nomoreparties.co/${image.url}`;
  const durationString = setDurationInString(duration);

  const isSavedMovieStatus = isSavedMoviesPage ? true : isSavedMovie(movie);

  const buttonClassName = !isSavedMoviesPage
    ? isSavedMovieStatus
      ? "card__button_type_like-active"
      : "card__button_type_like-disactive"
    : isHover && "card__button_type_delete";

  function handleMouseOverCard() {
    setIsHover(true);
  }

  function handleMouseOutCard() {
    setIsHover(false);
  }

  function handleToggleLikeMovie() {
    onLikeButtonClick(movie);
  }

  function handleDeleteMovie() {
    onDeleteMovie(movie);
  }

  return (
    <article
      className="card"
      onMouseOver={handleMouseOverCard}
      onMouseOut={handleMouseOutCard}
    >
      <a
        href={isSavedMoviesPage ? trailer : trailerLink}
        className="card__trailer-link"
        target="blanck"
      >
        <img
          src={isSavedMoviesPage ? image : imageURL}
          alt={nameRU}
          className="card__img"
        />
      </a>
      <div className="card__info">
        <p className="card__name">{nameRU}</p>
        <p className="card__duration">{durationString}</p>
        <button
          type="button"
          className={`card__button ${buttonClassName}`}
          onClick={
            isSavedMoviesPage ? handleDeleteMovie : handleToggleLikeMovie
          }
        ></button>
      </div>
    </article>
  );
}
