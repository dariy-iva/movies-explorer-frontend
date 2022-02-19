import React from "react";
import { Link } from "react-router-dom";
import "./Logo.css";
import logo from "../../images/logo.svg";

export default function Logo() {

  return (
    <Link to="/" className="logo link-hover">
      <img src={logo} alt="логотип" className="logo__img" />
    </Link>
  );
}
