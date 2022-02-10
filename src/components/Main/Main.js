import React from "react";
import "./Main.css";
import Header from "../Header/Header";
import Promo from "../Promo/Promo";
import NavTab from "../NavTab/NavTab";
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs";
import Footer from "../Footer/Footer";

function Main() {
  return (
    <>
      <Header />
      <main className="main">
        <Promo />
        <NavTab />
        <AboutProject />
        <Techs />
      </main>
      <Footer />
    </>
  );
}

export default Main;
