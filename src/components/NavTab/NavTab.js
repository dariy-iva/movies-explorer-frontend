import React from "react";
import "./NavTab.css";

function NavTab() {
  return (
    <section className="nav-tab">
      <ul className="nav-tab__links">
        <li>
          <a href="#about-project" className="nav-tab__link">
            О проекте
          </a>
        </li>
        <li>
          <a href="" className="nav-tab__link">
            Технологии
          </a>
        </li>
        <li>
          <a href="" className="nav-tab__link">
            Студент
          </a>
        </li>
      </ul>
    </section>
  );
}

export default NavTab;
