const shortMovieDuration = 40;

export default function filterMovies(moviesList, dataFilter) {
  const nameMovieFilter = dataFilter.movie.toLowerCase();
  const isShortMovieFilter = dataFilter.isShortMovie;
  return moviesList.filter((movie) => {
    if (isShortMovieFilter) {
      return (
        movie.nameRU.toLowerCase().includes(nameMovieFilter) &&
        movie.duration <= shortMovieDuration
      );
    } else {
      return (
        movie.nameRU.toLowerCase().includes(nameMovieFilter) &&
        movie.duration > shortMovieDuration
      );
    }
  });
}
