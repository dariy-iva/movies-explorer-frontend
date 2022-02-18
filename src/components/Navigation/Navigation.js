import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navigation.css";

export default function Navigation({ isOpenMenu, onMenuClose, isLoggedIn }) {
  const linksForSignConfig = [
    { path: "/signup", text: "Регистрация" },
    { path: "/signin", text: "Войти" },
  ];
  const linksLoggedUserConfig = [
    { path: "/", text: "Главная" },
    { path: "/movies", text: "Фильмы" },
    { path: "/saved-movies", text: "Сохранённые фильмы" },
    { path: "/profile", text: "Аккаунт" },
  ];

  return (
    <>
      {!isLoggedIn ? (
        <nav className="menu">
          {linksForSignConfig.map((link) => (
            <Link
              to={link.path}
              className="menu__link menu__link_page_main link-hover"
              key={linksForSignConfig.indexOf(link)}
            >
              {link.text}
            </Link>
          ))}
        </nav>
      ) : (
        <nav
          className={`menu ${
            isOpenMenu ? "menu_sidebar_open" : "menu_sidebar_close"
          }`}
        >
          {linksLoggedUserConfig.map((link) => (
            <NavLink
              to={link.path}
              className={(props) =>
                props.isActive
                  ? "menu__link menu__link_page_movies link-hover menu__link_page_movies_active"
                  : "menu__link menu__link_page_movies link-hover"
              }
              end
              onClick={onMenuClose}
              key={linksLoggedUserConfig.indexOf(link)}
            >
              {link.text}
            </NavLink>
          ))}
        </nav>
      )}
    </>
  );
}
