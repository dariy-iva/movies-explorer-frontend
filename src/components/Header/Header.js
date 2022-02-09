import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./Header.css";
import logo from "../../images/logo.svg";
import Navigation from "../Navigation/Navigation";

function Header() {

  const pathsForLoggedUser = ["/movies", "/saved-movies", "/profile"];
  const pathsForSign = ["/signin", "/signup"];
  const [isOpenMenu, setIsOpenMenu] = React.useState(false);

  function onMenuOpen() {
    setIsOpenMenu(true);
  }

  function onMenuClose() {
    setIsOpenMenu(false);
  }

  return (
    <header className="header">
      <Routes>
        <Route
          exact
          path="/"
          element={
            <>
              <Link to="/">
                <img src={logo} alt="логотип" className="header__logo" />
              </Link>
              <Navigation isOpenMenu={isOpenMenu} />
            </>
          }
        ></Route>
        {pathsForLoggedUser.map((path) => (
          <Route
            path={path}
            key={pathsForLoggedUser.indexOf(path)}
            element={
              <>
                <Link to="/">
                  <img src={logo} alt="логотип" className="header__logo" />
                </Link>
                <div className={`header__overlay ${isOpenMenu && "header__overlay_visible"}`}></div>
                  <Navigation isOpenMenu={isOpenMenu} onMenuClose={onMenuClose} />
                  {isOpenMenu ? (
                    <button
                      className="header__button header__button_menu_close"
                      type="button"
                      onClick={onMenuClose}
                    ></button>
                  ) : (
                    <button
                      className="header__button header__button_menu_open"
                      type="button"
                      onClick={onMenuOpen}
                    ></button>
                  )}
                
              </>
            }
          ></Route>
        ))}
        {pathsForSign.map((path) => (
          <Route
          path={path}
          key={pathsForSign.indexOf(path)}
          element={
            <>
              <Link to="/">
                <img src={logo} alt="логотип" className="header__logo" />
              </Link>
            </>
          }
        ></Route>
        ))}
      </Routes>
    </header>
  );
}

export default Header;
