import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./FormSign.css";

function FormSign({ name, title, buttonSubmit, children, onSubmit }) {
  const location = useLocation();
  const path = location.pathname;
  const pathRedirection = path === "/signup" ? "/signin" : "/signup";
  const formSignText =
    path === "/signup" ? "Уже зарегистрированы?" : "Ещё не зарегистрированы?";
  const formSignTextLink = path === "/signup" ? "Войти" : "Регистрация";

  return (
    <>
      <h2 className="formSign__title">{title}</h2>
      <form name={name} className="formSign__form" onSubmit={onSubmit}>
        {children}
        <button type="submit" className="formSign__submit-button">
          {buttonSubmit}
        </button>
      </form>
      <p className="formSign__text">
        {formSignText}
        <Link className="formSign__link" to={pathRedirection}>
          {formSignTextLink}
        </Link>
      </p>
    </>
  );
}

export default FormSign;
