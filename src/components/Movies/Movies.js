import React from "react";
import "./Movies.css";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

export default function Movies({ movies, onSubmit, onSaveMovieClick }) {
  return (
    <>
      <Header isLoggedIn={true} />
      <main className="movies">
        <SearchForm onSubmit={onSubmit} />
        <MoviesCardList movies={movies} isSavedMoviesPage={false} onSaveMovieClick={onSaveMovieClick} />
      </main>
      <Footer />
    </>
  );
}
