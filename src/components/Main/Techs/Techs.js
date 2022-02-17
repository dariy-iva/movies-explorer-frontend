import React from "react";
import "./Techs.css";

export default function Techs() {
  const techsList = [
    "HTML",
    "CSS",
    "JS",
    "React",
    "Git",
    "Express.js",
    "mongoDB",
  ];
  return (
    <section className="techs" id="techs">
      <h2 className="main__title">Технологии</h2>
      <h3 className="techs__title">7 технологий</h3>
      <p className="main__text techs__text">
        На курсе веб-разработки мы освоили технологии, которые применили в
        дипломном проекте.
      </p>
      <ul className="techs__list">
        {techsList.map((tech) => (
          <li
            className="techs__item main__text main__text_color_black"
            key={techsList.indexOf(tech)}
          >
            {tech}
          </li>
        ))}
      </ul>
    </section>
  );
}
