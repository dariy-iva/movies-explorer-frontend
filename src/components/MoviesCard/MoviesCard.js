import React from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCard.css";
import image from "../../images/card__img.webp";

function MoviesCard({ card }) {
  const { name, duration, owner } = card;
  const [isHover, setIsHover] = React.useState(false);

  const location = useLocation();
  const path = location.pathname;

  const buttonClassName =
    path === "/saved-movies"
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
      <img src={image} alt={name} className="card__img" />
      <div className="card__info">
        <p className="card__name">{name}</p>
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

export default MoviesCard;
