import React from "react";
import { Link } from "react-router-dom";
import "./FormSign.css";

export default function FormSign(props) {
  const { name, title, buttonSubmit, children, onSubmit, isNewUser, isValid } =
    props;

  const pathRedirection = isNewUser ? "/signin" : "/signup";
  const textRedirection = isNewUser
    ? "Уже зарегистрированы?"
    : "Ещё не зарегистрированы?";
  const linkTextRedirection = isNewUser ? "Войти" : "Регистрация";

  return (
    <>
      <h2 className="formSign__title">{title}</h2>
      <form name={name} className="formSign__form" onSubmit={onSubmit}>
        <fieldset className="formSign__fieldset">{children}</fieldset>
        <button
          type="submit"
          className="formSign__submit-button link-hover"
          disabled={!isValid}
        >
          {buttonSubmit}
        </button>
      </form>
      <p className="formSign__text">
        {textRedirection}
        <Link className="formSign__link link-hover" to={pathRedirection}>
          {linkTextRedirection}
        </Link>
      </p>
    </>
  );
}
