import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__title footer__text">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className="footer__container">
        <p className="footer__copyright footer__text">&copy;2022</p>
        <ul className="footer__links">
          <li>
            <a
              href="https://practicum.yandex.ru"
              target="blank"
              className="footer__link footer__text"
            >
              Яндекс.Практикум
            </a>
          </li>
          <li>
            <a
              href="https://github.com/dariy-iva"
              target="blank"
              className="footer__link footer__text"
            >
              Github
            </a>
          </li>
          <li>
            <a
              href="https://t.me/DariyIva"
              target="blank"
              className="footer__link footer__text"
            >
              Telegram
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
