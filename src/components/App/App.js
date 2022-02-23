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
import * as Auth from "../../utils/api/Auth";

export default function App() {
  const history = useNavigate();
  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [movies, setMovies] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);

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

  function handleUpdateUser(data) {
    setCurrentUser(data);
  }

  function filterMovies(moviesList, dataFilter) {
    const nameMovieFilter = dataFilter.name.toLowerCase();
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

  function handleSearchAllMovies(dataSearch) {
    moviesApi
      .getMovies()
      .then((movies) => {
        return filterMovies(movies, dataSearch);
      })
      .then((moviesFilter) => {
        setMovies(moviesFilter);
      })
      .catch((err) => console.log(err));
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

  function handleSaveMovie(dataMovie) {
    mainApi
      .addMovie(dataMovie)
      .then((newMovie) => {
        setSavedMovies([newMovie, ...savedMovies]);
      })
      .catch((err) => console.log(err));
  }

  function handleTokenCheck() {
    Auth.checkToken()
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

    Auth.register(name, email, password)
      .then((res) => {
        if (res.statusCode !== 400) {
          handleLogin({email, password});
        }
        console.log(res)
      })
      .catch((err) => {
        return console.log(err);
      });
  }

  function handleLogin(dataUser) {
    const { email, password } = dataUser;

    Auth.login(email, password)
      .then((data) => {
        if (data.token) {
          handleTokenCheck();
        }
      })
      .catch((err) => console.log(err));
  }

  function handleLogout() {
    setLoggedIn(false);
    Auth.logout().catch((err) => console.log(err));
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
                  onSubmit={handleSearchAllMovies}
                  onSaveMovieClick={handleSaveMovie}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute>
                <SavedMovies
                  movies={movies}
                  onSubmit={handleSearchSavedMovies}
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
        <InfoTooltipPopup isOpen={false} />
      </LoggedInContext.Provider>
    </CurrentUserContext.Provider>
  );
}
