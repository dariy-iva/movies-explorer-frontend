import React from "react";
import "./Footer.css";
import { myContacts } from "../../utils/constants/myContactsAndLinks";

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
          {myContacts.map(contact => (
            <li key={myContacts.indexOf(contact)}>
            <a
              href={contact.link}
              target="blank"
              className="footer__link footer__text"
            >
              {contact.name}
            </a>
          </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
