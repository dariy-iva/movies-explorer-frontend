import React from "react";
import "./MoviesCard.css";

export default function MoviesCard({ card, isSavedMoviesPage, onSaveMovie, onDeleteMovie }) {
  const { nameRU, trailerLink, trailer, duration, owner, image } = card;
  const [isHover, setIsHover] = React.useState(false);
  const imageURL = `https://api.nomoreparties.co/${image.url}`;
  const durationHours = Math.floor(duration / 60);
  const durationMinutes = duration - durationHours * 60;
  const durationString =
    duration < 60
      ? `${duration}м`
      : `${durationHours}ч ${durationMinutes > 0 ? durationMinutes + "м" : ""}`;

  const buttonClassName = isSavedMoviesPage
    ? isHover && "card__button_type_delete"
    : owner
    ? "card__button_type_like-active"
    : "card__button_type_like-disactive";

  function handleMouseOverCard() {
    setIsHover(true);
  }

  function handleMouseOutCard() {
    setIsHover(false);
  }

  function handleSaveMovie() {
    onSaveMovie(card);
  }

  function handleDeleteMovie() {
    console.log(card)
    onDeleteMovie(card);
  }

  return (
    <article
      className="card"
      onMouseOver={handleMouseOverCard}
      onMouseOut={handleMouseOutCard}
    >
      <a href={isSavedMoviesPage ? trailer : trailerLink} className="card__trailer-link" target="blanck">
        <img src={isSavedMoviesPage ? image : imageURL} alt={nameRU} className="card__img" />
      </a>
      <div className="card__info">
        <p className="card__name">{nameRU}</p>
        <p className="card__duration">{durationString}</p>
        <button
          type="button"
          className={`card__button ${buttonClassName}`}
          onClick={isSavedMoviesPage ? handleDeleteMovie : handleSaveMovie}
        ></button>
      </div>
    </article>
  );
}
