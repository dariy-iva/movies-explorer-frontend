import React from "react";
import "./AboutProject.css";

function AboutProject() {
  return (
    <section className="main__section about-project" id="about-project">
      <h2 className="main__section-title">О проекте</h2>
      <div className="table table_content_about-project">
        <div>
          <h3 className="table__title">Дипломный проект включал 5 этапов</h3>
          <p className="main__section-text main__section-text_color_black">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>
        <div>
          <h3 className="table__title">На выполнение диплома ушло 5 недель</h3>
          <p className="main__section-text main__section-text_color_black">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className="table table_content_time-project">
        <p className="main__section-text main__section-text_color_white table__cell table__cell_color_black">
          1 неделя
        </p>
        <p className="main__section-text main__section-text_color_black table__cell table__cell_color_grey">
          4 недели
        </p>
        <p className="main__section-text main__section-text_color_grey">
          Back-end
        </p>
        <p className="main__section-text main__section-text_color_grey">
          Front-end
        </p>
      </div>
    </section>
  );
}

export default AboutProject;
