import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { LoggedInContext } from "../../context/LoggedInContext";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import { moviesList } from "../../utils/constants/moviesList";

function App() {
  const [currentUser, setCurrentUser] = React.useState({
    name: "Daria",
    email: "dashann@mail.ru",
    password: "12345678",
  });
  const [loggedIn, setLoggedIn] = React.useState(true);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <LoggedInContext.Provider value={loggedIn}>
        <div className="page">
          <Routes>
            <Route exact path="/" element={<Main />} />
            <Route path="/movies" element={<Movies movies={moviesList} />} />
            <Route
              path="/saved-movies"
              element={<SavedMovies movies={moviesList} />}
            />
            <Route path="/profile" element={<Profile />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/signin" element={<Login />} />
          </Routes>
        </div>
      </LoggedInContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
