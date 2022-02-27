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
  const [keyWordSearch, setKeyWordSearch] = React.useState("");
  const [isShortMovieSearch, setIsShortMovieSearch] = React.useState(true);
  const [isOpenPreloader, setIsOpenPreloader] = React.useState(false);
  const [resMessage, setResMessage] = React.useState("");
  const [isSuccessSearch, setIsSuccessSearch] = React.useState(true);
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
        const savedMoviesJSON = JSON.stringify(data);
        localStorage.setItem("savedMovies", savedMoviesJSON);
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
      .catch((err) => {
        setResMessage(showServerErrorText(err));
        setIsOpenInfoPopup(true);
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
        setKeyWordSearch(dataSearch.movie);
        setIsShortMovieSearch(dataSearch.isShortMovie);
        setMovies(moviesFilter);

        const moviesFilterJSON = JSON.stringify(moviesFilter);
        localStorage.setItem("movies", moviesFilterJSON);
        localStorage.setItem("keyWordSearch", dataSearch.movie);
        localStorage.setItem("isShortMovieSearch", dataSearch.isShortMovie);

        if (moviesFilter.length === 0) {
          setIsSuccessSearch(false);
        } else {
          setIsSuccessSearch(true);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setIsOpenPreloader(false));
  }

  function handleSearchSavedMovies(dataSearch) {
    const savedMoviesInLocalStorage = JSON.parse(localStorage.savedMovies);
    const savedMoviesFilter = filterMovies(
      savedMoviesInLocalStorage,
      dataSearch
    );
    setSavedMovies(savedMoviesFilter);

    if (savedMoviesFilter.length === 0) {
      setIsSuccessSearch(false);
    } else {
      setIsSuccessSearch(true);
    }
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
      .catch((err) => {
        setResMessage(showServerErrorText(err));
        setIsOpenInfoPopup(true);
      });
  }

  function handleRegister(dataUser) {
    const { name, email, password } = dataUser;

    setIsOpenPreloader(true);
    authApi
      .register(name, email, password)
      .then((res) => {
        if (res.statusCode !== 400) {
          handleLogin({ email, password });
        }
        console.log(res);
      })
      .catch((err) => {
        setResMessage(showServerErrorText(err));
        setIsOpenInfoPopup(true);
      })
      .finally(() => setIsOpenPreloader(false));
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
        console.log(err);
        setResMessage(showServerErrorText(err));
        setIsOpenInfoPopup(true);
      });
  }

  function handleLogout() {
    authApi
      .logout()
      .then((res) => {
        setLoggedIn(false);
        localStorage.removeItem("movies");
        localStorage.removeItem("savedMovies");
        localStorage.removeItem("keyWordSearch");
        localStorage.removeItem("isShortMovieSearch");
        setResMessage(res.message);
        setIsOpenInfoPopup(true);
      })
      .catch((err) => {
        console.log(err);
        setResMessage(showServerErrorText(err));
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
                  onLikeButtonClick={toggleLikeMovie}
                  keyWordSearch={keyWordSearch}
                  isShortMovieSearch={isShortMovieSearch}
                  isSuccessSearch={isSuccessSearch}
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
                  isSuccessSearch={isSuccessSearch}
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
