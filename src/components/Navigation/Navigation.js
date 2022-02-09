import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import "./Navigation.css";

function Navigation({ isOpenMenu, onMenuClose }) {
  const location = useLocation();

  return (
    <>
      {location.pathname === "/" ? (
        <nav className="menu">
          <Link
            to="/signup"
            className="menu__link menu__link_page_main"
          >
            Регистрация
          </Link>
          <Link
            to="/signin"
            className="menu__link menu__link_page_main"
          >
            Войти
          </Link>
        </nav>
      ) : (
        <nav className={`menu ${isOpenMenu ? "menu_sidebar_open" : "menu_sidebar_close"}`}>
          {isOpenMenu && (
            <NavLink
            to="/"
            className="menu__link menu__link_page_movies"
            end
            onClick={onMenuClose}
          >
            Главная
          </NavLink>
          )}
          <NavLink
            to="/movies"
            className={(props) =>
              props.isActive
                ? "menu__link menu__link_page_movies menu__link_page_movies_active"
                : "menu__link menu__link_page_movies"
            }
            end
            onClick={onMenuClose}
          >
            Фильмы
          </NavLink>
          <NavLink
            to="/saved-movies"
            className={(props) =>
              props.isActive
                ? "menu__link menu__link_page_movies menu__link_page_movies_active"
                : "menu__link menu__link_page_movies"
            }
            end
            onClick={onMenuClose}
          >
            Сохранённые фильмы
          </NavLink>
          <NavLink
            to="/profile"
            className={(props) =>
              props.isActive
                ? "menu__link menu__link_page_movies menu__link_page_movies_active"
                : "menu__link menu__link_page_movies"
            }
            end
            onClick={onMenuClose}
          >
            Аккаунт
          </NavLink>
        </nav>
      )}
    </>
  );
}

export default Navigation;
