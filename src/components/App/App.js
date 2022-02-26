import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { LoggedInContext } from "../../context/LoggedInContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import PageNotFound from "../PageNotFound/PageNotFound";
import InfoTooltipPopup from "../InfoToolTipPopup/InfoToolTipPopup";
import { moviesApi } from "../../utils/api/MoviesApi";
import { mainApi } from "../../utils/api/MainApi";
import { authApi } from "../../utils/api/AuthApi";
import Preloader from "../Preloader/Preloader";

export default function App() {
  const history = useNavigate();
  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [movies, setMovies] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [keyWordSearch, setKeyWordSearch] = React.useState("");
  const [isShortMovieSearch, setIsShortMovieSearch] = React.useState(true);
  const [isOpenPreloader, setIsOpenPreloader] = React.useState(false);
  const [resMessage, setResMessage] = React.useState("");
  const [isOpenInfoPopup, setIsOpenInfoPopup] = React.useState(false);

  React.useEffect(() => {
    if (loggedIn === true) {
      mainApi
        .getUserInfo()
        .then((data) => {
          setCurrentUser(data);
        })
        .catch((err) => console.log(err));

      history("/movies");
    }
  }, [loggedIn]);

  React.useEffect(() => {
    if (localStorage.movies) {
      const moviesFilterJSON = JSON.parse(localStorage.movies);
      setMovies(moviesFilterJSON);
    }
    if (localStorage.keyWordSearch) {
      setKeyWordSearch(localStorage.keyWordSearch);
    }
    if (localStorage.isShortMovieSearch) {
      const isShortMovieSearchJSON = JSON.parse(
        localStorage.isShortMovieSearch
      );
      setIsShortMovieSearch(isShortMovieSearchJSON);
    }
  }, []);

  React.useEffect(() => {
    handleTokenCheck();
  }, []);

  React.useEffect(() => {
    mainApi
      .getMovies()
      .then((data) => {
        setSavedMovies(data);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleCloseInfoPopup() {
    setIsOpenInfoPopup(false);
  }

  function handleUpdateUser(dataUser) {
    mainApi
      .setUserInfo(dataUser)
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => console.log(err));
  }

  function filterMovies(moviesList, dataFilter) {
    const nameMovieFilter = dataFilter.movie.toLowerCase();
    const isShortMovieFilter = dataFilter.isShortMovie;
    return moviesList.filter((movie) => {
      if (isShortMovieFilter) {
        return (
          movie.nameRU.toLowerCase().includes(nameMovieFilter) &&
          movie.duration <= 40
        );
      } else {
        return (
          movie.nameRU.toLowerCase().includes(nameMovieFilter) &&
          movie.duration > 40
        );
      }
    });
  }

  function handleSearchMovies(dataSearch) {
    setIsOpenPreloader(true);
    moviesApi
      .getMovies()
      .then((movies) => {
        return filterMovies(movies, dataSearch);
      })
      .then((moviesFilter) => {
        setMovies(moviesFilter);
        const moviesFilterJSON = JSON.stringify(moviesFilter);
        localStorage.setItem("movies", moviesFilterJSON);
        setKeyWordSearch(dataSearch.movie);
        localStorage.setItem("keyWordSearch", dataSearch.movie);
        setIsShortMovieSearch(dataSearch.isShortMovie);
        localStorage.setItem("isShortMovieSearch", dataSearch.isShortMovie);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsOpenPreloader(false));
  }

  function handleSearchSavedMovies(dataSearch) {
    // moviesApi
    //   .getMovies()
    //   .then((movies) => {
    //     return filterMovies(movies, dataSearch);
    //   })
    //   .then((moviesFilter) => {
    //     setMovies(moviesFilter);
    //   })
    //   .catch((err) => console.log(err));
  }

  function toggleSavedMovie(dataMovie) {
    const isSavedMovie = savedMovies.some((i) => i.movieId === dataMovie.id);
    if (isSavedMovie) {
      const savedMovie = savedMovies.find((i) => i.movieId === dataMovie.id)
      handleDeleteMovie(savedMovie);
    }
    if (!isSavedMovie) {
      handleSaveMovie(dataMovie)
    }
  }

  function handleSaveMovie(dataMovie) {
    mainApi
      .addMovie(dataMovie)
      .then((newMovie) => {
        setSavedMovies([newMovie, ...savedMovies]);
      })
      .catch((err) => console.log(err));
  }

  function handleDeleteMovie(movie) {
    mainApi
      .deleteMovie(movie._id)
      .then(() => {
        setSavedMovies((state) => state.filter((c) => c._id !== movie._id));
      })
      .catch((err) => console.log(err));
  }

  function handleTokenCheck() {
    authApi
      .checkToken()
      .then((dataUser) => {
        if (dataUser) {
          setCurrentUser(dataUser);
          setLoggedIn(true);
        }
      })
      .catch((err) => console.log(err));
  }

  function handleRegister(dataUser) {
    const { name, email, password } = dataUser;

    authApi
      .register(name, email, password)
      .then((res) => {
        if (res.statusCode !== 400) {
          handleLogin({ email, password });
        }
        console.log(res);
      })
      .catch((err) => {
        err.then((err) => setResMessage(err.message));
        setIsOpenInfoPopup(true);
      });
  }

  function handleLogin(dataUser) {
    const { email, password } = dataUser;

    authApi
      .login(email, password)
      .then((data) => {
        if (data.token) {
          handleTokenCheck();
        }
      })
      .catch((err) => {
        err.then((err) => setResMessage(err.message));
        setIsOpenInfoPopup(true);
      });
  }

  function handleLogout() {
    setLoggedIn(false);
    authApi
      .logout()
      .then(() => {
        localStorage.removeItem("movies");
        localStorage.removeItem("keyWordSearch");
        localStorage.removeItem("isShortMovieSearch");
      })
      .catch((err) => {
        err.then((err) => setResMessage(err.message));
        setIsOpenInfoPopup(true);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <LoggedInContext.Provider value={loggedIn}>
        <Routes>
          <Route exact path="/" element={<Main isLoggedIn={loggedIn} />} />
          <Route
            path="/movies"
            element={
              <ProtectedRoute>
                <Movies
                  movies={movies}
                  savedMovies={savedMovies}
                  onSubmit={handleSearchMovies}
                  onLikeButtonClick={toggleSavedMovie}
                  keyWordSearch={keyWordSearch}
                  isShortMovieSearch={isShortMovieSearch}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute>
                <SavedMovies
                  movies={savedMovies}
                  onSubmit={handleSearchSavedMovies}
                  onDeleteMovie={handleDeleteMovie}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile
                  onUpdate={handleUpdateUser}
                  handleLogout={handleLogout}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/signup"
            element={<Register handleRegister={handleRegister} />}
          />
          <Route path="/signin" element={<Login handleLogin={handleLogin} />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <InfoTooltipPopup
          isOpen={isOpenInfoPopup}
          message={resMessage}
          onClose={handleCloseInfoPopup}
        />
        <Preloader isVisible={isOpenPreloader} />
      </LoggedInContext.Provider>
    </CurrentUserContext.Provider>
  );
}
