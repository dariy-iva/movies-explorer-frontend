import React from "react";
import "./Techs.css";

function Techs() {
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
    <section className="main__section techs">
      <h2 className="main__section-title">Технологии</h2>
      <h3 className="techs__title">7 технологий</h3>
      <p className="main__section-text techs__text">
        На курсе веб-разработки мы освоили технологии, которые применили в
        дипломном проекте.
      </p>
      <ul className="techs__list">
        {techsList.map((tech) => (
          <li className="techs__item main__section-text" key={techsList.indexOf(tech)}>
            {tech}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Techs;
