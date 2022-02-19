import React from "react";
import "./Footer.css";
import { dataStudent } from "../../utils/constants/dataStudent";

export default function Footer() {
  const { contacts } = dataStudent;
  return (
    <footer className="footer">
      <p className="footer__description footer__text">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className="footer__container">
        <p className="footer__copyright footer__text">&copy;2022</p>
        <ul className="footer__links">
          <li>
            <a
              href="https://practicum.yandex.ru"
              target="blank"
              className="footer__link footer__text link-hover"
            >
              Яндекс.Практикум
            </a>
          </li>
          {contacts.map((contact) => (
            <li key={contacts.indexOf(contact)}>
              <a
                href={contact.link}
                target="blank"
                className="footer__link footer__text link-hover"
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
