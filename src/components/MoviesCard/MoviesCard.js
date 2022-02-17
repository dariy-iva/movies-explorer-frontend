import React from "react";
import "./MoviesCard.css";
import imageURL from "../../images/card__img.webp";

export default function MoviesCard({ card, isSavedMoviesPage }) {
  const { nameRU, trailerLink, duration, owner } = card;
  const [isHover, setIsHover] = React.useState(false);

  const buttonClassName = isSavedMoviesPage
    ? isHover && "card__button_type_delete"
    : owner
    ? "card__button_type_like-active"
    : "card__button_type_like-disactive";

  function handleLikeClick() {}

  function handleMouseOverCard() {
    setIsHover(true);
  }

  function handleMouseOutCard() {
    setIsHover(false);
  }

  return (
    <article
      className="card"
      onMouseOver={handleMouseOverCard}
      onMouseOut={handleMouseOutCard}
    >
      <a href={trailerLink} className="card__trailer-link" target="blanck">
        <img src={imageURL} alt={nameRU} className="card__img" />
      </a>
      <div className="card__info">
        <p className="card__name">{nameRU}</p>
        <p className="card__duration">{duration}</p>
        <button
          type="button"
          className={`card__button ${buttonClassName}`}
          onClick={handleLikeClick}
        />
      </div>
    </article>
  );
}
