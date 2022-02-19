import React from "react";
import "./Movies.css";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

export default function Movies({ movies }) {
  return (
    <>
      <Header isLoggedIn={true} />
      <main className="movies">
        <SearchForm />
        <MoviesCardList movies={movies} isSavedMoviesPage={false} />
      </main>
      <Footer />
    </>
  );
}
