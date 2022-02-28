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
import { showServerErrorText } from "../../utils/showServerErrorText";
import filterMovies from "../../utils/filterMovies";
import Preloader from "../Preloader/Preloader";

export default function App() {
  const history = useNavigate();
  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);

  const [movies, setMovies] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);

  const [keyWordMovieSearch, setKeyWordMovieSearch] = React.useState("");
  const [isShortMovieSearch, setIsShortMovieSearch] = React.useState(true);
  const [isSuccessSearchMovie, setIsSuccessSearchMovie] = React.useState(true);
  const [isSuccessSearchSavedMovie, setIsSuccessSearchSavedMovie] =
    React.useState(true);

  const [isOpenPreloader, setIsOpenPreloader] = React.useState(false);
  const [isOpenInfoPopup, setIsOpenInfoPopup] = React.useState(false);
  const [resMessage, setResMessage] = React.useState("");

  function openInfoPopupWithError(errStatus) {
    setResMessage(showServerErrorText(errStatus));
    setIsOpenInfoPopup(true);
  }

  function setStatusSearchMovies(arrMovies, setItem) {
    arrMovies.length === 0 ? setItem(false) : setItem(true);
  }

  function setStatusMovie(dataMovie) {
    const isSavedMovie = savedMovies.some((i) => i.movieId === dataMovie.id);
    return isSavedMovie;
  }

  function toggleLikeMovie(dataMovie) {
    const isSavedMovie = savedMovies.some((i) => i.movieId === dataMovie.id);
    if (isSavedMovie) {
      const savedMovie = savedMovies.find((i) => i.movieId === dataMovie.id);
      handleDeleteMovie(savedMovie);
    }
    if (!isSavedMovie) {
      handleSaveMovie(dataMovie);
    }
  }

  function handleCloseInfoPopup() {
    setIsOpenInfoPopup(false);
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
      .catch((err) => openInfoPopupWithError(err));
  }

  function handleRegister(dataUser) {
    setIsOpenPreloader(true);

    const { name, email, password } = dataUser;
    authApi
      .register(name, email, password)
      .then((res) => {
        if (res.statusCode !== 400) {
          handleLogin({ email, password });
        }
        console.log(res);
      })
      .catch((err) => openInfoPopupWithError(err))
      .finally(() => setIsOpenPreloader(false));
  }

  function handleLogin(dataUser) {
    const { email, password } = dataUser;
    authApi
      .login(email, password)
      .then((data) => {
        data.token && handleTokenCheck();
      })
      .catch((err) => openInfoPopupWithError(err));
  }

  function handleLogout() {
    authApi
      .logout()
      .then((res) => {
        setLoggedIn(false);
        localStorage.clear();
        setResMessage(res.message);
        setIsOpenInfoPopup(true);
      })
      .catch((err) => openInfoPopupWithError(err));
  }

  function handleUpdateUser(dataUser) {
    mainApi
      .setUserInfo(dataUser)
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => openInfoPopupWithError(err));
  }

  function handleSearchMovies(dataSearch) {
    setIsOpenPreloader(true);
    moviesApi
      .getMovies()
      .then((movies) => {
        return filterMovies(movies, dataSearch);
      })
      .then((moviesFilter) => {
        setKeyWordMovieSearch(dataSearch.movie);
        setIsShortMovieSearch(dataSearch.isShortMovie);
        setMovies(moviesFilter);
        setStatusSearchMovies(moviesFilter, setIsSuccessSearchMovie);

        const moviesFilterJSON = JSON.stringify(moviesFilter);
        localStorage.setItem("movies", moviesFilterJSON);
        localStorage.setItem("keyWordMovieSearch", dataSearch.movie);
        localStorage.setItem("isShortMovieSearch", dataSearch.isShortMovie);
      })
      .catch((err) => openInfoPopupWithError(err))
      .finally(() => setIsOpenPreloader(false));
  }

  function handleSearchSavedMovies(dataSearch) {
    setIsOpenPreloader(true);

    const savedMoviesInLocalStorage = JSON.parse(localStorage.savedMovies);
    const savedMoviesFilter = filterMovies(
      savedMoviesInLocalStorage,
      dataSearch
    );
    setSavedMovies(savedMoviesFilter);
    setStatusSearchMovies(savedMoviesFilter, setIsSuccessSearchSavedMovie);

    setIsOpenPreloader(false);
  }

  function handleSaveMovie(dataMovie) {
    mainApi
      .addMovie(dataMovie)
      .then((newMovie) => {
        setSavedMovies([newMovie, ...savedMovies]);
      })
      .catch((err) => openInfoPopupWithError(err));
  }

  function handleDeleteMovie(movie) {
    mainApi
      .deleteMovie(movie._id)
      .then(() => {
        setSavedMovies((state) => state.filter((c) => c._id !== movie._id));
      })
      .catch((err) => openInfoPopupWithError(err));
  }

  React.useEffect(() => {
    handleTokenCheck();
  }, []);

  React.useEffect(() => {
    if (loggedIn === true) {
      mainApi
        .getUserInfo()
        .then((data) => {
          setCurrentUser(data);
        })
        .catch((err) => openInfoPopupWithError(err));
        
      history("/movies");
    }
  }, [loggedIn]);

  React.useEffect(() => {
    if (localStorage.movies) {
      const moviesFilterJSON = JSON.parse(localStorage.movies);
      setMovies(moviesFilterJSON);
    }
    if (localStorage.keyWordMovieSearch) {
      setKeyWordMovieSearch(localStorage.keyWordMovieSearch);
    }
    if (localStorage.isShortMovieSearch) {
      const isShortMovieSearchJSON = JSON.parse(
        localStorage.isShortMovieSearch
      );
      setIsShortMovieSearch(isShortMovieSearchJSON);
    }
  }, []);

  React.useEffect(() => {
    mainApi
      .getMovies()
      .then((data) => {
        setSavedMovies(data);
        const savedMoviesJSON = JSON.stringify(data);
        localStorage.setItem("savedMovies", savedMoviesJSON);
      })
      .catch((err) => openInfoPopupWithError(err));
  }, []);

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
                  isSavedMovie={setStatusMovie}
                  onSubmit={handleSearchMovies}
                  onLikeButtonClick={toggleLikeMovie}
                  keyWordSearch={keyWordMovieSearch}
                  isShortMovieSearch={isShortMovieSearch}
                  isSuccessSearch={isSuccessSearchMovie}
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
                  isSuccessSearch={isSuccessSearchSavedMovie}
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
