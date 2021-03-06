import React from "react";
import "./Header.css";
import Logo from "../Logo/Logo";
import Navigation from "../Navigation/Navigation";

export default function Header({ isLoggedIn, isMainPage }) {
  const [isOpenMenu, setIsOpenMenu] = React.useState(false);

  function handleMenuOpen() {
    setIsOpenMenu(true);
  }

  function handleMenuClose() {
    setIsOpenMenu(false);
  }

  return (
    <header className={`header ${isMainPage && "header_color"}`}>
      <Logo />
      <div
        className={`header__overlay ${isOpenMenu && "header__overlay_visible"}`}
      />
      <Navigation
        isOpenMenu={isOpenMenu}
        onMenuClose={handleMenuClose}
        isLoggedIn={isLoggedIn}
      />
      {isOpenMenu && (
        <button
          className="header__button header__button_menu_close link-hover"
          type="button"
          onClick={handleMenuClose}
        />
      )}
      {isLoggedIn && (
        <button
          className="header__button header__button_menu_open link-hover"
          type="button"
          onClick={handleMenuOpen}
        />
      )}
    </header>
  );
}
