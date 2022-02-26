import React from "react";
import "./Movies.css";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

export default function Movies({
  movies,
  onSubmit,
  onLikeButtonClick,
  keyWordSearch,
  isShortMovieSearch,
  savedMovies
}) {
  return (
    <>
      <Header isLoggedIn={true} />
      <main className="movies">
        <SearchForm
          onSubmit={onSubmit}
          keyWordSearch={keyWordSearch}
          isShortMovieSearch={isShortMovieSearch}
        />
        <MoviesCardList
          movies={movies}
          savedMovies={savedMovies}
          isSavedMoviesPage={false}
          onLikeButtonClick={onLikeButtonClick}
        />
      </main>
      <Footer />
    </>
  );
}
