import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";
import logo from "../../images/logo.svg";
import Navigation from "../Navigation/Navigation";


function Header() {
  const location = useLocation();
  const path = location.pathname;
  const [isOpenMenu, setIsOpenMenu] = React.useState(false);
  

  function handleMenuOpen() {
    setIsOpenMenu(true);
  }

  function handleMenuClose() {
    setIsOpenMenu(false);
  }
  

  return (
    <header className={`header ${path === "/" && "header_color"}`}>
      <Link to="/">
        <img src={logo} alt="логотип" className="header__logo" />
      </Link>
      <div
        className={`header__overlay ${isOpenMenu && "header__overlay_visible"}`}
      />
      <Navigation isOpenMenu={isOpenMenu} onMenuClose={handleMenuClose} />
      {isOpenMenu ? (
        <button
          className="header__button header__button_menu_close"
          type="button"
          onClick={handleMenuClose}
        />
      ) : (path !== "/" && (
        <button
          className="header__button header__button_menu_open"
          type="button"
          onClick={handleMenuOpen}
        />
      ))}
    </header>
  );
}

export default Header;
