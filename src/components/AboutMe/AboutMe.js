import React from "react";
import "./AboutMe.css";
import { myContacts } from "../../utils/constants/myContactsAndLinks";

function AboutMe() {
  return (
    <section className="about-me" id="about-me">
      <h2 className="main__title">Студент</h2>
      <div className="about-me__columns">
        <div className="about-me__column about-me__column_content_info">
          <h3 className="about-me__name">Дарья</h3>
          <p className="about-me__job">Веб-разработчик, 29 лет</p>
          <p className="main__text main__text_color_black about-me__caption">
            Я из Санкт-Петербурга. В марте 2021 года я попробовала сверстать
            страницу по макету из интернета и меня это увлекло. Уже в мае я
            записалась на 10-месячный курс по веб-разработке. Моя цель на 2022
            год перейти работать в сферу IT, поэтому все свободное время я учусь
            писать чистый и красивый код. А в перерывах между работой и учебой
            отдыхаю за игрой на пианино, чтением фентези и готовкой.
          </p>
          <ul className="about-me__contacts">
            {myContacts.map((contact) => (
              <li key={myContacts.indexOf(contact)}>
                <a
                  href={contact.link}
                  target="blank"
                  className="about-me__contact"
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

export default AboutMe;
