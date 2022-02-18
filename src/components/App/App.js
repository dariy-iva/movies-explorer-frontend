import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import PageNotFound from "../PageNotFound/PageNotFound";
import InfoTooltipPopup from "../InfoToolTipPopup/InfoToolTipPopup";
import { moviesList } from "../../utils/constants/moviesList";

export default function App() {
  const [currentUser, setCurrentUser] = React.useState({});

  React.useEffect(() => {
    setCurrentUser({
      name: "Daria",
      email: "dashann@mail.ru",
    });
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
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
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <InfoTooltipPopup isOpen={false} />
    </CurrentUserContext.Provider>
  );
}
