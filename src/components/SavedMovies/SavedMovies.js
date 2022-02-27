import React from "react";
import "./SavedMovies.css";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

export default function SavedMovies({ movies, onSubmit, onDeleteMovie, isSuccessSearch }) {
  return (
    <>
      <Header isLoggedIn={true} />
      <main className="saved-movies">
        <SearchForm onSubmit={onSubmit} />
        <MoviesCardList
          movies={movies}
          isSavedMoviesPage={true}
          onDeleteMovie={onDeleteMovie}
          isSuccessSearch={isSuccessSearch}
        />
      </main>
      <Footer />
    </>
  );
}
