import React from "react";
import "./Movies.css";
import Header from "../Header/Header";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import Preloader from "./Preloader/Preloader";
import { moviesList } from "../../utils/constants/moviesList";

function Movies() {
  return (
    <>
      <Header />
      <main className="movies">
        <SearchForm />
        <MoviesCardList movies={moviesList} />
      </main>
      <Footer />
    </>
  );
}

export default Movies;
