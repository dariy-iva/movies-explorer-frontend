import React from "react";
import "./Portfolio.css";
import { myProjects } from "../../utils/constants/myContactsAndLinks";

function Portfolio() {
  return (
    <section className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <ul className="portfolio__list">
        {myProjects.map((project) => (
          <li key={myProjects.indexOf(project)} className="portfolio__item">
            <a href={project.link} className="portfolio__link" target="blank">
              {project.name}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Portfolio;
