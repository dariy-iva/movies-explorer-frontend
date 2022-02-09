import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import "./Navigation.css";

function Navigation({ isOpenMenu, onMenuClose }) {
  const location = useLocation();
  const path = location.pathname;

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
      {path === "/" && (
        <nav className="menu">
          {linksForSignConfig.map((link) => (
            <Link to={link.path} className="menu__link menu__link_page_main" key={linksForSignConfig.indexOf(link)}>
              {link.text}
            </Link>
          ))}
        </nav>
      )}
      {(path === "/movies" ||
        path === "/saved-movies" ||
        path === "/profile") && (
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
                ? "menu__link menu__link_page_movies menu__link_page_movies_active"
                : "menu__link menu__link_page_movies"
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

export default Navigation;
