import React from 'react';
import './Main.css';
import Header from '../Header/Header';
import Promo from '../Promo/Promo';
import NavTab from '../NavTab/NavTab';
import Footer from '../Footer/Footer';

function Main() {
  return (
    <div className="main">
      <Header />
      <Promo />
      <NavTab />
      <Footer />
    </div>
  );
}

export default Main;