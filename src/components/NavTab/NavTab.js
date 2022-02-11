import React from "react";
import "./NavTab.css";

function NavTab() {
  const navLinks = [
    {
      text: "О проекте",
      link: "#about-project"
    },
    {
      text: "Технологии",
      link: "#techs"
    },
    {
      text: "Студент",
      link: "#about-me"
    }
  ]
  return (
    <section className="nav-tab">
      <ul className="nav-tab__links">
        {navLinks.map(item => (
          <li key={navLinks.indexOf(item)}>
          <a href={item.link} className="nav-tab__link">
            {item.text}
          </a>
        </li>
        ))}
      </ul>
    </section>
  );
}

export default NavTab;
