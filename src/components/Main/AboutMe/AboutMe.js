import React from "react";
import "./AboutMe.css";
import { dataStudent } from "../../../utils/constants/dataStudent";

export default function AboutMe() {
  const { name, job, age, about, contacts } = dataStudent;
  return (
    <section className="about-me" id="about-me">
      <h2 className="main__title">Студент</h2>
      <div className="about-me__columns">
        <div className="about-me__column about-me__column_content_info">
          <h3 className="about-me__name">{name}</h3>
          <p className="about-me__job">{`${job}, ${age}`}</p>
          <p className="main__text main__text_color_black about-me__caption">
            {about}
          </p>
          <ul className="about-me__contacts">
            {contacts.map((contact) => (
              <li key={contacts.indexOf(contact)}>
                <a
                  href={contact.link}
                  target="blank"
                  className="about-me__contact link-hover"
                >
                  {contact.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="about-me__column about-me__column_content_photo"></div>
      </div>
    </section>
  );
}
