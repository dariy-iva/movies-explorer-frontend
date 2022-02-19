import React from "react";
import "./Portfolio.css";
import { dataStudent } from "../../../utils/constants/dataStudent";

export default function Portfolio() {
  const { projects } = dataStudent;
  return (
    <section className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <ul className="portfolio__list">
        {projects.map((project) => (
          <li key={projects.indexOf(project)} className="portfolio__item">
            <a href={project.link} className="portfolio__link link-hover" target="blank">
              {project.name}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
